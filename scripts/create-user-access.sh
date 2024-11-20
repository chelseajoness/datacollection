#!/bin/bash

# Check if email argument is provided
if [ -z "$1" ]; then
    echo "Please provide user email as argument"
    echo "Usage: ./create-user-access.sh jane.doe@example.com"
    exit 1
fi

USER_EMAIL=$1
USER_NAME=$(echo $USER_EMAIL | cut -d@ -f1 | tr '.' '-')

# Create necessary directories
mkdir -p k8s/auth
mkdir -p k8s/certs
mkdir -p user-access-packages

# Create RBAC configuration
cat <<EOF > k8s/auth/user-rbac.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: ${USER_NAME}-role
  namespace: default
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log", "services"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list", "watch", "update"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: ${USER_NAME}-binding
  namespace: default
subjects:
- kind: User
  name: "${USER_EMAIL}"
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: ${USER_NAME}-role
  apiGroup: rbac.authorization.k8s.io
EOF

# Apply RBAC configuration
kubectl apply -f k8s/auth/user-rbac.yaml

# Generate certificates
cd k8s/certs
openssl genrsa -out ${USER_NAME}.key 2048
openssl req -new -key ${USER_NAME}.key \
  -out ${USER_NAME}.csr \
  -subj "/CN=${USER_EMAIL}/O=development"

# Create CSR
cat <<EOF | kubectl apply -f -
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: ${USER_NAME}
spec:
  request: $(cat ${USER_NAME}.csr | base64 | tr -d '\n')
  signerName: kubernetes.io/kube-apiserver-client
  expirationSeconds: 31536000
  usages:
  - client auth
EOF

# Approve CSR
kubectl certificate approve ${USER_NAME}

# Get the signed certificate
kubectl get csr ${USER_NAME} -o jsonpath='{.status.certificate}' | base64 -d > ${USER_NAME}.crt

# Create user access package directory
cd ../../
mkdir -p user-access-packages/${USER_NAME}

# Get cluster details
CLUSTER_NAME=$(kubectl config current-context)
CLUSTER_URL=$(kubectl config view --minify -o jsonpath='{.clusters[0].cluster.server}')
CA_DATA=$(kubectl config view --minify -o jsonpath='{.clusters[0].cluster.certificate-authority-data}')

# Create kubeconfig
cat <<EOF > user-access-packages/${USER_NAME}/config
apiVersion: v1
kind: Config
clusters:
- cluster:
    certificate-authority-data: ${CA_DATA}
    server: ${CLUSTER_URL}
  name: ${CLUSTER_NAME}
contexts:
- context:
    cluster: ${CLUSTER_NAME}
    user: ${USER_EMAIL}
    namespace: default
  name: ${CLUSTER_NAME}
current-context: ${CLUSTER_NAME}
preferences: {}
users:
- name: ${USER_EMAIL}
  user:
    client-certificate: \$HOME/.kube/certs/${USER_NAME}.crt
    client-key: \$HOME/.kube/certs/${USER_NAME}.key
EOF

# Copy certificates to user package
cp k8s/certs/${USER_NAME}.{key,crt} user-access-packages/${USER_NAME}/

# Create README
cat <<EOF > user-access-packages/${USER_NAME}/README.md
# Kubernetes Access Instructions

1. Install kubectl:
   - Mac: \`brew install kubectl\`
   - Windows: https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/
   - Linux: https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

2. Set up your certificates and config:
   \`\`\`bash
   # Create necessary directories
   mkdir -p \$HOME/.kube/certs

   # Move certificates
   mv ${USER_NAME}.key ${USER_NAME}.crt \$HOME/.kube/certs/

   # Move config file
   mv config \$HOME/.kube/config
   \`\`\`

3. Test your access:
   \`\`\`bash
   kubectl get pods
   kubectl get deployments
   kubectl get services
   \`\`\`

If you have any issues, please contact your administrator.
EOF

# Create zip package
cd user-access-packages
zip -r ${USER_NAME}.zip ${USER_NAME}

echo "Access package created: user-access-packages/${USER_NAME}.zip"
echo "Send this zip file to ${USER_EMAIL}"
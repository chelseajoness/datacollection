
# Kubernetes Certificate Update

1. Create the certificate directory if it doesn't exist:
   ```bash
   mkdir -p ~/.kube
   ```

2. Copy the CA certificate:
   ```bash
   cp ca.crt ~/.kube/
   ```

3. Update your kubeconfig to use this CA certificate:
   ```bash
   kubectl config set-cluster docker-desktop --certificate-authority=$HOME/.kube/ca.crt
   ```

4. Test your connection:
   ```bash
   kubectl get pods
   ```

If you encounter any issues, please contact your administrator.

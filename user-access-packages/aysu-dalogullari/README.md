# Kubernetes Access Instructions

1. Install kubectl:
   - Mac: `brew install kubectl`
   - Windows: https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/
   - Linux: https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

2. Set up your certificates and config:
   ```bash
   # Create necessary directories
   mkdir -p $HOME/.kube/certs

   # Move certificates
   mv aysu-dalogullari.key aysu-dalogullari.crt $HOME/.kube/certs/

   # Move config file
   mv config $HOME/.kube/config
   ```

3. Test your access:
   ```bash
   kubectl get pods
   kubectl get deployments
   kubectl get services
   ```

If you have any issues, please contact your administrator.

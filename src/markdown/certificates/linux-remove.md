1. Remove the certificate from your account:
    ```shell
    certutil -d sql:$HOME/.pki/nssdb -D -n CodeGate-CA
    ```
2. Restart VS Code.

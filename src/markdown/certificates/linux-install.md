1. Install the `certutil` tool using the appropriate command for your distribution:
   - **Ubuntu/Debian**: `sudo apt install libnss3-tools`
   - **RHEL/Fedora**: `sudo dnf install nss-tools`
2. Add the certificate to your account's NSS shared database:
    ```shell
    certutil -d sql:$HOME/.pki/nssdb \
      -A -t "C,," -n CodeGate-CA \
      -i ~/Downloads/codegate.crt
    ```
3. Restart VS Code.

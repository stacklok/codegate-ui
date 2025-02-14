1. Install the `certutil` tool: `sudo apt install libnss3-tools` (Ubuntu/Debian) or `sudo dnf install nss-tools` (RHEL/Fedora).
2. Run `certutil -d sql:$HOME/.pki/nssdb -A -t "C,," -n CodeGate-CA -i ~ Downloads/codegate.crt` to install the certificate for your account.
3. Restart VS Code.

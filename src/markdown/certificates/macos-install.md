### Option 1: CLI

After downloading the certificate, open a terminal and run:

```shell
security add-trusted-cert -d -r trustRoot -p ssl -p basic \
  -k ~/Library/Keychains/login.keychain \
  ~/Downloads/codegate.crt
```

### Option 2: GUI

1. Open the downloaded certificate file; Keychain Access will open.
2. Depending on your macOS version, you may see the **Add Certificates** dialog. If so, select the `login` keychain and click **Add**.
3. In Keychain Access, select the **login** keychain from the list on the left.
4. Search for "CodeGate" (it may not appear until you search), then double-click the "CodeGate CA" certificate in the search results.
5. Expand the **Trust** section and set the "Secure Sockets Layer" and "X.509 Basic Policy" options to **Always Trust**.

### CLI method

Open a terminal and run:

```shell
security delete-certificate -c "CodeGate CA" \
  -t ~/Library/Keychains/login.keychain
```

### GUI method

1. Launch the **Keychain Access** app. Note: on newer macOS versions, Keychain Access is hidden from Launcher but can be opened from Spotlight Search.
2. Select the **login** keychain and search for "CodeGate".
3. Right-click the "CodeGate CA" certificate and select **Delete "CodeGate CA"**.
4. Confirm the deletion when prompted.

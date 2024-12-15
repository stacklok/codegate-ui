# 🤖 CoPilot Setup Guide

Welcome to the setup guide for configuring CoPilot integration with **CodeGate**. 

---

## 📋 Prerequisites

Before you begin, make sure you have the following:
- ✅ An active GitHub account
- ✅ A GitHub CoPilot subscription
- ✅ A CodeGate account

---

## 🛠️ Setup Instructions

### Install the CodeGate CA

To enable CodeGate, you’ll need to install its Certificate Authority (CA) into your operating system’s trust store.

See [Certicates](/certificates) for a full details.

### Configure CoPilot Settings to Use CodeGate

Update your CoPilot configuration to use CodeGate as a proxy. Add the following
settings (Ctrl+Shift+P) + "Preferences: Open User Settings (JSON)":

```json
{
  "http.proxy": "https://localhost:8990",
  "http.proxyStrictSSL": true,
  "http.proxySupport": "on",
  "github.copilot.advanced": {
    "debug.useNodeFetcher": true,
    "debug.useElectronFetcher": true,
    "debug.testOverrideProxyUrl": "https://localhost:8990",
    "debug.overrideProxyUrl": "https://localhost:8990",
  }
```

> **_NOTE:_**  CoPilot may need a refresh after creating the proxy config. Restart VS-Code or open the command palate (Ctrl+Shift+P) and select "Developer: Reload Window".

### Verify it works

In the bottom right section of VScode you will see a small CoPilot avatar. It
should look like the following:

![Picture of CoPilot Success, no exclamation mark](./images/copilot-success.png)

If there is any sort of failure, you will see the following:

![Picture of CoPilot Failure, has an exclamation mark](./images/copilot-fail.png)

If you experience a failure, click on the CoPilot avatar and select "Show Diagnostics"
, copy the text and post it to the CoPilot [CodeGate Discussions](https://github.com/stacklok/codegate/discussions/categories/copilot)


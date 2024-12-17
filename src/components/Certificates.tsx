import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import { useState, ReactNode } from "react";

type OS = "macos" | "windows" | "linux";
type Action = "install" | "remove";

function renderWithCode(text: string): ReactNode {
  const parts = text.split(/(`[^`]+`)/);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 mx-0.5 bg-gray-100 rounded font-mono text-sm"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function InstructionStep({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 mt-1">
        <span className="text-teal-600 text-sm font-semibold">{number}</span>
      </div>
      <p className="text-gray-700">{renderWithCode(text)}</p>
    </div>
  );
}

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 text-teal-600">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export function Certificates() {
  const [activeOS, setActiveOS] = useState<OS>("macos");
  const [activeAction, setActiveAction] = useState<Action>("install");

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/certificates/codegate_ca.crt";
    link.download = "codegate.crt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const steps = {
    macos: {
      install: [
        "Double-click the downloaded certificate file",
        "Keychain Access will open automatically",
        'Add the certificate to the "login" keychain',
        "Double-click the imported certificate",
        'Expand the "Trust" section',
        'Set "When using this certificate" to "Custom Settings"',
        'Set "Secure Sockets Layer" to "Always Trust"',
        'Set "X.509 Basic Policy" to "Always Trust"',
        "Alternatively, you can run `security add-trusted-cert -r trustRoot -k ~/Library/Keychains/login.keychain codegate.crt`",
      ],
      remove: [
        "Open the Keychain Access app",
        "Select the login keychain",
        'Find the "CodeGate CA" certificate',
        'Right-click and select "Delete"',
        "Confirm the deletion when prompted",
        'Alternatively, you can run `security delete-certificate -c "CodeGate CA" -t ~/Library/Keychains/login.keychain`'
      ],
    },
    windows: {
      install: [
        "Double-click the downloaded certificate file",
        'Click "Install Certificate"',
        'Select "Current User" and click Next',
        'Choose "Place all certificates in the following store"',
        'Click "Browse" and select "Trusted Root Certification Authorities"',
        'Click "Next" and then "Finish"',
      ],
      remove: [
        'Open "Run" (Win + R)',
        "Type `certmgr.msc` and press Enter",
        'Navigate to "Trusted Root Certification Authorities" → "Certificates"',
        'Find the "CodeGate CA" certificate',
        'Right-click and select "Delete"',
        "Confirm the deletion when prompted",
      ],
    },
    linux: {
      install: [
        "Copy the certificate to `/usr/local/share/ca-certificates/codegate.crt` (Ubuntu/Debian) or `/etc/pki/ca-trust/source/anchors/codegate.pem` (RHEL/Fedora)",
        "Run `sudo update-ca-certificates` (Ubuntu/Debian) or `sudo update-ca-trust` (RHEL/Fedora)",
        "Restart your IDE",
      ],
      remove: [
        "Delete the certificate file from `/usr/local/share/ca-certificates/` (Ubuntu/Debian) or `/etc/pki/ca-trust/source/anchors/` (RHEL/Fedora)",
        "Run `sudo update-ca-certificates --fresh` (Ubuntu/Debian) or `sudo update-ca-trust` (RHEL/Fedora)",
        "Restart your IDE",
      ],
    },
  };

  const currentSteps = steps[activeOS][activeAction];

  return (
    <div className="max-w-4xl mx-auto px-4 pr-6">
      <h1 className="text-3xl font-bold mb-8">Certificates</h1>

      <Card className="p-6 mb-8 bg-white shadow-lg border-2 border-teal-100">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
            <ShieldIcon />
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-2">
              CodeGate CA certificate
            </h2>
            <p className="text-gray-600 mb-4">
              This certificate allows CodeGate to act as a secure proxy for
              integrations such as GitHub Copilot.
            </p>
            <Button
              onClick={handleDownload}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Download certificate
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-8 bg-white shadow-lg border-2 border-gray-100">
        <h2 className="text-xl font-semibold mb-4">
          Is this certificate safe to install on my machine?
        </h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <CheckIcon />
            <p className="text-gray-700">
              <strong>Local-only:</strong> CodeGate runs entirely on your
              machine within an isolated container, ensuring all data processing
              stays local without any external transmissions.
            </p>
          </div>

          <div className="flex gap-3">
            <CheckIcon />
            <p className="text-gray-700">
              <strong>Secure certificate handling:</strong> this custom CA is
              locally generated and managed. CodeGate developers have no
              access to it.
            </p>
          </div>

          <div className="flex gap-3">
            <CheckIcon />
            <p className="text-gray-700">
              <strong>No external communications:</strong> CodeGate is designed
              with no capability to call home or communicate with external
              servers, outside of those requested by the IDE or Agent.
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-start">
          <Link
            to="/certificates/security"
            className="inline-flex items-center px-4 py-2 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-md transition-colors border border-teal-200 shadow-sm"
          >
            <span className="mr-2">Learn more</span>
            <ArrowIcon />
          </Link>
        </div>
      </Card>

      <Card className="p-6 bg-white shadow-lg border-2 border-gray-100">
        <h2 className="text-xl font-semibold mb-6">Certificate Management</h2>

        {/* OS Selection Tabs */}
        <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setActiveOS("macos")}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeOS === "macos"
                ? "bg-white text-teal-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            macOS
          </button>
          <button
            onClick={() => setActiveOS("windows")}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeOS === "windows"
                ? "bg-white text-teal-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Windows
          </button>
          <button
            onClick={() => setActiveOS("linux")}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeOS === "linux"
                ? "bg-white text-teal-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Linux
          </button>
        </div>

        {/* Action Selection Tabs */}
        <div className="flex space-x-4 mt-6 mb-6">
          <button
            onClick={() => setActiveAction("install")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors border ${
              activeAction === "install"
                ? "border-teal-200 bg-teal-50 text-teal-700"
                : "border-gray-200 text-gray-500 hover:text-gray-700"
            }`}
          >
            Install certificate
          </button>
          <button
            onClick={() => setActiveAction("remove")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors border ${
              activeAction === "remove"
                ? "border-teal-200 bg-teal-50 text-teal-700"
                : "border-gray-200 text-gray-500 hover:text-gray-700"
            }`}
          >
            Remove certificate
          </button>
        </div>

        <div className="mt-6">
          <div className="space-y-4">
            {currentSteps.map((step, index) => (
              <InstructionStep key={index} number={index + 1} text={step} />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

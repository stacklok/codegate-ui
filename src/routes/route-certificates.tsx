// import { Card } from "./ui/card";
import { BreadcrumbHome } from "@/components/BreadcrumbHome";
import {
  Card,
  Button,
  LinkButton,
  CardBody,
  Breadcrumbs,
  Breadcrumb,
} from "@stacklok/ui-kit";
import { useState } from "react";
import { markdown as linuxInstall } from "../markdown/certificates/linux-install.md";
import { markdown as linuxRemove } from "../markdown/certificates/linux-remove.md";
import { markdown as windowsInstall } from "../markdown/certificates/windows-install.md";
import { markdown as windowsRemove } from "../markdown/certificates/windows-remove.md";
import { markdown as macosInstall } from "../markdown/certificates/macos-install.md";
import { markdown as macosRemove } from "../markdown/certificates/macos-remove.md";
import { Markdown } from "@/components/Markdown";

type OS = "macos" | "windows" | "linux";
type Action = "install" | "remove";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5 text-brand-700 shrink-0 mt-1">
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
  <svg viewBox="0 0 24 24" className="size-8 text-brand-700">
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
  <svg viewBox="0 0 24 24" className="size-4">
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

export function RouteCertificates() {
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

  type ListSchema = Record<
    "macos" | "windows" | "linux",
    Record<string, string>
  >;

  const steps = {
    macos: {
      install: macosInstall,
      remove: macosRemove,
    },
    windows: {
      install: windowsInstall,
      remove: windowsRemove,
    },
    linux: {
      install: linuxInstall,
      remove: linuxRemove,
    },
  } as const satisfies ListSchema;

  const currentSteps = steps[activeOS][activeAction];

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb>Certificates</Breadcrumb>
      </Breadcrumbs>

      <div className="max-w-4xl mx-auto px-4 pr-6">
        <h1 className="text-3xl font-bold mb-8">Certificates</h1>

        <Card className="mb-8">
          <CardBody>
            <div className="flex items-start gap-6">
              <div className="size-16 bg-brand-50 rounded-full flex items-center justify-center shrink-0">
                <ShieldIcon />
              </div>
              <div className="grow">
                <h2 className="text-xl font-semibold mb-2">
                  CodeGate CA certificate
                </h2>
                <p className="text-secondary mb-4">
                  This certificate allows CodeGate to act as a secure proxy for
                  GitHub Copilot. This certificate is unique to your system.
                </p>
                <Button onPress={handleDownload}>Download certificate</Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="mb-8">
          <CardBody>
            <h2 className="text-xl font-semibold mb-4">
              Is this certificate safe to install on my machine?
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckIcon />
                <p className="text-secondary">
                  <strong>Local-only:</strong> CodeGate runs entirely on your
                  machine within an isolated container, ensuring all data
                  processing stays local without any external transmissions.
                </p>
              </div>
              <div className="flex gap-3">
                <CheckIcon />
                <p className="text-secondary">
                  <strong>Secure certificate handling:</strong> This custom CA
                  is locally generated and managed. It is unique to your
                  installation and CodeGate developers have no access to it.
                </p>
              </div>
              <div className="flex gap-3">
                <CheckIcon />
                <p className="text-secondary">
                  <strong>No external communications:</strong> CodeGate is
                  designed with no capability to call home or communicate with
                  external servers, outside of those requested by the IDE or
                  agent.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-start">
              <LinkButton href="/certificates/security">
                <span className="mr-2">Learn more</span>
                <ArrowIcon />
              </LinkButton>
            </div>
          </CardBody>
        </Card>

        <Card className="mb-8">
          <CardBody>
            <h2 className="text-xl font-semibold mb-6">
              Certificate management
            </h2>
            {/* OS Selection Tabs */}
            <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setActiveOS("macos")}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeOS === "macos"
                    ? "bg-base text-brand-700 shadow-sm"
                    : "text-gray-500 hover:text-secondary"
                }`}
              >
                macOS
              </button>
              <button
                onClick={() => setActiveOS("windows")}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeOS === "windows"
                    ? "bg-base text-brand-700 shadow-sm"
                    : "text-gray-500 hover:text-secondary"
                }`}
              >
                Windows
              </button>
              <button
                onClick={() => setActiveOS("linux")}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeOS === "linux"
                    ? "bg-base text-brand-700 shadow-sm"
                    : "text-gray-500 hover:text-secondary"
                }`}
              >
                Linux
              </button>
            </div>
            {/* Action Selection Tabs */}
            <div className="flex space-x-4 my-6">
              <button
                onClick={() => setActiveAction("install")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors border ${
                  activeAction === "install"
                    ? "border-brand-200 bg-brand-50 text-brand-700"
                    : "border-gray-200 text-gray-500 hover:text-secondary"
                }`}
              >
                Install certificate
              </button>
              <button
                onClick={() => setActiveAction("remove")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors border ${
                  activeAction === "remove"
                    ? "border-brand-200 bg-brand-50 text-brand-700"
                    : "border-gray-200 text-gray-500 hover:text-secondary"
                }`}
              >
                Remove certificate
              </button>
            </div>
            <div className="mt-6">
              <div className="space-y-4">
                <Markdown children={currentSteps} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

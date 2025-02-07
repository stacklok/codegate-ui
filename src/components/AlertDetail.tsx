import { AlertConversation } from "@/api/generated";
import { isAlertMalicious } from "@/features/alerts/lib/is-alert-malicious";
import { isAlertSecret } from "@/features/alerts/lib/is-alert-secret";
import { Markdown } from "./Markdown";

type MaliciousPkgType = {
  name: string;
  type: string;
  status: string;
  description: string;
};

export function AlertDetail({ alert }: { alert: AlertConversation }) {
  if (alert.trigger_string === null) return "N/A";
  if (isAlertSecret(alert) && typeof alert.trigger_string === "string") {
    return (
      <div className="bg-gray-25 rounded-lg overflow-auto p-4">
        <Markdown>{alert.trigger_string}</Markdown>
      </div>
    );
  }

  if (isAlertMalicious(alert) && typeof alert.trigger_string === "object") {
    const maliciousPkg = alert.trigger_string as MaliciousPkgType;

    return (
      <div className="max-h-40 w-fit overflow-y-auto whitespace-pre-wrap p-2">
        <label className="font-medium">Package:</label>
        &nbsp;
        <a
          href={`https://www.insight.stacklok.com/report/${maliciousPkg.type}/${maliciousPkg.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-500 hover:underline"
        >
          {maliciousPkg.type}/{maliciousPkg.name}
        </a>
        {maliciousPkg.status && (
          <>
            <br />
            <label className="font-medium">Status:</label> {maliciousPkg.status}
          </>
        )}
        {maliciousPkg.description && (
          <>
            <br />
            <label className="font-medium">Description:</label>{" "}
            {maliciousPkg.description}
          </>
        )}
      </div>
    );
  }
  return null;
}

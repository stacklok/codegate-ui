import { Conversation } from "@/api/generated";
import { ReactNode } from "react";
import { getProviderString } from "../lib/get-provider-string";
import { formatTime } from "@/lib/format-time";
import { countConversationAlerts } from "../lib/count-conversation-alerts";

import { twMerge } from "tailwind-merge";
import { TokenUsageIcon } from "./token-usage-icon";
import { formatNumberCompact } from "@/lib/format-number";
import {
  Clock,
  Hash01,
  Key01,
  PackageX,
  Server05,
} from "@untitled-ui/icons-react";

function TokenUsage({
  tokens,
  type,
}: {
  type: "input" | "output";
  tokens: number;
}) {
  return (
    <div className="flex items-center gap-1">
      <TokenUsageIcon iconType={type} className="size-4 text-gray-50" />
      <div className="text-gray-50">{formatNumberCompact(tokens)}</div>
    </div>
  );
}

function TokenUsageRow({
  input_tokens,
  output_tokens,
}: {
  input_tokens: number;
  output_tokens: number;
}) {
  return (
    <div className="flex gap-4">
      <TokenUsage type={"input"} tokens={input_tokens} />
      <TokenUsage type={"output"} tokens={output_tokens} />
    </div>
  );
}

function AlertsSummaryCount({ count }: { count: number }) {
  const text = `${count} detected`;

  return (
    <span className={twMerge(count > 0 ? "text-secondary" : "text-disabled")}>
      {text}
    </span>
  );
}

function ConversationSummaryListItem({
  title,
  value,
  icon: Icon,
}: {
  title: ReactNode;
  value: ReactNode;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
}) {
  return (
    <li className="grid grid-cols-[1fr_2fr] px-2 py-1 rounded ">
      <span className="flex gap-2 items-center font-semibold">
        <Icon className="size-4" />
        {title}
      </span>
      <span className="block">{value}</span>
    </li>
  );
}

function ConversationSummaryList({ children }: { children: ReactNode }) {
  return (
    <ul className="block grow [&>*:nth-child(odd)]:bg-gray-50">{children}</ul>
  );
}

export function ConversationSummary({
  conversation,
}: {
  conversation: Conversation;
}) {
  const { malicious, secrets } = conversation.alerts
    ? countConversationAlerts(conversation.alerts)
    : { malicious: 0, secrets: 0 };

  return (
    <div className="flex gap-4">
      <ConversationSummaryList>
        <ConversationSummaryListItem
          icon={Server05}
          title="Provider"
          value={getProviderString(conversation.provider)}
        />
        <ConversationSummaryListItem
          icon={Clock}
          title="Timestamp"
          value={formatTime(new Date(conversation.conversation_timestamp), {
            format: "absolute",
          })}
        />
        <ConversationSummaryListItem
          icon={Hash01}
          title="ID"
          value={conversation.chat_id}
        />
      </ConversationSummaryList>
      <div className="border-l border-l-gray-200" />
      <ConversationSummaryList>
        {conversation.token_usage_agg ? (
          <ConversationSummaryListItem
            icon={Key01}
            title="Token usage"
            value={
              <TokenUsageRow
                input_tokens={
                  conversation.token_usage_agg.token_usage.input_tokens ?? 0
                }
                output_tokens={
                  conversation.token_usage_agg.token_usage.output_tokens ?? 0
                }
              />
            }
          />
        ) : null}
        <ConversationSummaryListItem
          icon={PackageX}
          title="Malicious packages"
          value={<AlertsSummaryCount count={malicious} />}
        />
        <ConversationSummaryListItem
          icon={Key01}
          title="Secrets"
          value={<AlertsSummaryCount count={secrets} />}
        />
      </ConversationSummaryList>
    </div>
  );
}

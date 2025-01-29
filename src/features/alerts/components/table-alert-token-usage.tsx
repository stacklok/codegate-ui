import { TokenUsage, TokenUsageAggregate } from "@/api/generated";
import { formatCurrency } from "@/lib/currency";
import { TextLinkButton, Tooltip, TooltipTrigger } from "@stacklok/ui-kit";
import { ArrowDown, ArrowUp } from "lucide-react";

function Icons({
  input_tokens = 0,
  output_tokens = 0,
}: {
  input_tokens: number | null;
  output_tokens: number | null;
}) {
  return (
    <div className="flex tabular-nums  gap-1 items-center">
      <div className="flex items-center">
        <ArrowUp className="size-4" />
        {input_tokens}
      </div>
      <div className="flex items-center">
        <ArrowDown className="size-4" />
        {output_tokens}
      </div>
    </div>
  );
}

function validateUsage(usage: TokenUsage | null): usage is {
  input_tokens: number;
  output_tokens: number;
  input_cost: number;
  output_cost: number;
} {
  return Boolean(
    typeof usage?.input_tokens !== "undefined" &&
      typeof usage.input_cost !== "undefined" &&
      typeof usage.output_tokens !== "undefined" &&
      typeof usage.output_cost !== "undefined",
  );
}

function UsageIcon({
  iconType: iconType,
  ...props
}: {
  iconType: "input" | "output";
  className?: string;
}) {
  switch (iconType) {
    case "input":
      return <ArrowUp {...props} />;
    case "output":
      return <ArrowDown {...props} />;
    default:
      iconType satisfies never;
  }
}

function UsageRow({
  cost,
  tokens,
  type,
}: {
  type: "input" | "output";
  tokens: number;
  cost: number;
}) {
  return (
    <li className="min-w-40 flex items-center border-b border-b-gray-800 py-1 my-1 list-none">
      <UsageIcon iconType={type} className="size-4 text-gray-50" />

      <div className="text-gray-50">{tokens}</div>

      <div className="ml-auto text-gray-25">
        {formatCurrency(cost, { currency: "USD" })}
      </div>
    </li>
  );
}

function UsageRows({
  input_cost,
  input_tokens,
  output_cost,
  output_tokens,
}: {
  input_tokens: number;
  output_tokens: number;
  input_cost: number;
  output_cost: number;
}) {
  return (
    <>
      <UsageRow type={"input"} tokens={input_tokens} cost={input_cost} />
      <UsageRow type={"output"} tokens={output_tokens} cost={output_cost} />
    </>
  );
}

function TokenUsageByProviders({ tokens_by_model }: TokenUsageAggregate) {
  return Object.values(tokens_by_model).map(
    ({ provider_type, token_usage: modelTokenUsage, model }) => {
      if (!validateUsage(modelTokenUsage)) return null;

      return (
        <div>
          <div>
            <b>Model:</b> {model}
          </div>
          <div>
            <b>Provider:</b> {provider_type}
          </div>
          <ul className="list-none mt-2">
            <UsageRows {...modelTokenUsage} />
          </ul>
        </div>
      );
    },
  );
}

export function TableAlertTokenUsage({
  usage,
}: {
  usage: TokenUsageAggregate | null;
}) {
  if (!usage) return "N/A";

  return (
    <TooltipTrigger delay={0}>
      <TextLinkButton className="text-secondary hover:text-primary">
        <Icons
          input_tokens={usage.token_usage.input_tokens ?? null}
          output_tokens={usage.token_usage.output_tokens ?? null}
        />
      </TextLinkButton>
      <Tooltip>
        <TokenUsageByProviders
          tokens_by_model={usage.tokens_by_model}
          token_usage={usage.token_usage}
        />
      </Tooltip>
    </TooltipTrigger>
  );
}

import { TokenUsageAggregate } from '@/api/generated'
import { TextLinkButton, Tooltip, TooltipTrigger } from '@stacklok/ui-kit'
import { Download01, Upload01 } from '@untitled-ui/icons-react'
import { TokenUsageByProviders } from './token-usage-by-providers'
import { formatNumberCompact } from '@/lib/format-number'

function Icons({
  input_tokens = 0,
  output_tokens = 0,
}: {
  input_tokens: number | null
  output_tokens: number | null
}) {
  return (
    <div className="flex items-center gap-4 tabular-nums">
      <div className="flex items-center gap-1">
        <Download01 className="size-4" />
        {formatNumberCompact(input_tokens ?? 0)}
      </div>
      <div className="flex items-center gap-1">
        <Upload01 className="size-4" />
        <span className="block">{formatNumberCompact(output_tokens ?? 0)}</span>
      </div>
    </div>
  )
}

export function TableAlertTokenUsage({
  usage,
}: {
  usage: TokenUsageAggregate | null
}) {
  if (!usage) return 'N/A'

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
  )
}

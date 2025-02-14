import { TokenUsage, TokenUsageAggregate } from '@/api/generated'
import { formatCurrency } from '@/lib/currency'
import { formatNumberCompact } from '@/lib/format-number'
import { TokenUsageIcon } from './token-usage-icon'

function validateUsage(usage: TokenUsage | null): usage is {
  input_tokens: number
  output_tokens: number
  input_cost: number
  output_cost: number
} {
  return Boolean(
    typeof usage?.input_tokens !== 'undefined' &&
      typeof usage.input_cost !== 'undefined' &&
      typeof usage.output_tokens !== 'undefined' &&
      typeof usage.output_cost !== 'undefined'
  )
}

function UsageRow({
  cost,
  tokens,
  type,
}: {
  type: 'input' | 'output'
  tokens: number
  cost: number
}) {
  return (
    <li
      className="my-1 flex min-w-40 list-none items-center border-b border-b-gray-900 py-1
        last:border-b-0"
    >
      <TokenUsageIcon iconType={type} className="size-4 text-gray-50" />

      <div className="text-gray-50">{formatNumberCompact(tokens)}</div>

      <div className="ml-auto text-gray-25">
        {formatCurrency(cost, { currency: 'USD' })}
      </div>
    </li>
  )
}

function UsageRows({
  input_cost,
  input_tokens,
  output_cost,
  output_tokens,
}: {
  input_tokens: number
  output_tokens: number
  input_cost: number
  output_cost: number
}) {
  return (
    <>
      <UsageRow type={'input'} tokens={input_tokens} cost={input_cost} />
      <UsageRow type={'output'} tokens={output_tokens} cost={output_cost} />
    </>
  )
}

export function TokenUsageByProviders({
  tokens_by_model,
}: TokenUsageAggregate) {
  return Object.values(tokens_by_model).map(
    ({ provider_type, token_usage: modelTokenUsage, model }) => {
      if (!validateUsage(modelTokenUsage)) return null

      return (
        <div>
          <div>
            <b>Model:</b> {model}
          </div>
          <div>
            <b>Provider:</b> {provider_type}
          </div>
          <ul className="mt-2 list-none">
            <UsageRows {...modelTokenUsage} />
          </ul>
        </div>
      )
    }
  )
}

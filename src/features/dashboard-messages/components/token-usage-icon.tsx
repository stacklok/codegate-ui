import { ArrowUp, ArrowDown } from '@untitled-ui/icons-react'

export function TokenUsageIcon({
  iconType: iconType,
  ...props
}: {
  iconType: 'input' | 'output'
  className?: string
}) {
  switch (iconType) {
    case 'input':
      return <ArrowUp {...props} />
    case 'output':
      return <ArrowDown {...props} />
    default:
      iconType satisfies never
  }
}

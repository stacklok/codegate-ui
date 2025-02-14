import { formatDistanceToNow } from 'date-fns'

type Format = 'relative' | 'absolute'

export const formatTime = (
  date: Date,
  options: {
    format: Format
  } = {
    format: 'relative',
  }
) => {
  switch (options.format) {
    case 'absolute':
      return date.toLocaleString()
    case 'relative':
      return formatDistanceToNow(date, {
        addSuffix: true,
      })
    default:
      return options.format satisfies never
  }
}

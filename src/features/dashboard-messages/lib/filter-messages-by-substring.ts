import { Conversation } from '@/api/generated'

export function filterMessagesBySubstring(
  conversation: Conversation,
  substring: string | null
): boolean {
  if (conversation == null) return false
  if (substring === null) return true

  // NOTE: This is a naive implementation that is expensive for large datasets.
  const messages = conversation.question_answers.reduce<string[]>(
    (acc, curr) => {
      if (curr.question) acc.push(curr.question.message)
      if (curr.answer) acc.push(curr.answer.message)
      return acc
    },
    [] as string[]
  )

  return [...messages].some((i) =>
    i?.toLowerCase().includes(substring.toLowerCase())
  )
}

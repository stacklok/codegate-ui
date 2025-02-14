import { format } from 'date-fns'

const FILEPATH_REGEX = /(?:---FILEPATH|Path:|\/\/\s*filepath:)\s*([^\s]+)/g
const COMPARE_CODE_REGEX = /Compare this snippet[^:]*:/g

function parsingByKeys(text: string | undefined, timestamp: string) {
  const fallback = `Prompt ${format(new Date(timestamp ?? ''), 'y/MM/dd - hh:mm:ss a')}`
  try {
    if (!text) return fallback
    const filePath = text.match(FILEPATH_REGEX)
    const compareCode = text.match(COMPARE_CODE_REGEX)
    // there some edge cases in copilot where the prompts are not correctly parsed. In this case is better to show the filepath
    if (compareCode || filePath) {
      if (filePath)
        return `Prompt on file${filePath[0]?.trim().toLocaleLowerCase()}`

      if (compareCode)
        return `Prompt from snippet ${compareCode[0]?.trim().toLocaleLowerCase()}`
    }

    return text.trim()
  } catch {
    return fallback
  }
}

export function parsingPromptText(message: string, timestamp: string) {
  try {
    // checking malformed markdown code blocks
    const regex = /^(.*)```[\s\S]*?```(.*)$/s
    const match = message.match(regex)

    if (match !== null && match !== undefined) {
      const beforeMarkdown = match[1]?.trim()
      const afterMarkdown = match[2]?.trim()
      const title = beforeMarkdown || afterMarkdown
      return parsingByKeys(title, timestamp)
    }

    return parsingByKeys(message, timestamp)
  } catch {
    return message.trim()
  }
}

export function sanitizeQuestionPrompt({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  try {
    // it shouldn't be possible to receive the prompt answer without a question
    if (!answer) {
      throw new Error('Missing AI answer')
    }

    // Check if 'answer' is truthy; if so, try to find and return the text after "Query:"
    const index = question.indexOf('Query:')
    if (index !== -1) {
      // Return the substring starting right after the first occurrence of "Query:"
      // Adding the length of "Query:" to the index to start after it
      return question.substring(index + 'Query:'.length).trim()
    }
    return question
  } catch (error) {
    // Log the error and return the original question as a fallback
    console.error('Error processing the question:', error)
    return question
  }
}

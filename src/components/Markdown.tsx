import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyToClipboard } from './CopyToClipboard'
import hljs from 'highlight.js'

const LANGUAGES_SUBSET_DETECTION = [
  'c',
  'cpp',
  'csharp',
  'css',
  'elixir',
  'go',
  'groovy',
  'haskell',
  'html',
  'java',
  'javascript',
  'json',
  'kotlin',
  'markdown',
  'php',
  'python',
  'ruby',
  'rust',
  'scala',
  'sql',
  'typescript',
  'yaml',
]

interface Props {
  children: string
  isInverted?: boolean
}

const customStyle = {
  ...oneDark,
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: 'none',
  },
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: '#1a1b26',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    width: '100%',
    position: 'relative',
    boxSizing: 'border-box',
  },
}

export function Markdown({ children, isInverted = false }: Props) {
  return (
    <ReactMarkdown
      className={`prose max-w-none prose-h1:mb-8 prose-h1:text-3xl prose-h1:font-bold
        prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-2xl prose-h2:font-semibold
        prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-xl prose-h3:font-medium
        prose-p:leading-relaxed prose-pre:rounded-lg prose-pre:p-4 prose-pre:shadow-md
        ${isInverted ? 'prose-invert' : ''}`}
      components={{
        code({ className, children, ...props }) {
          if (!children) return null
          const detectedLanguage =
            hljs.highlightAuto(children, LANGUAGES_SUBSET_DETECTION).language ??
            'plaintext'
          const match = /language-(\w+)/.exec(className || '')
          const language = match ? match[1] : detectedLanguage
          return (
            <div
              className="group relative ml-0 w-full"
              data-testid="syntax-highlighter"
            >
              <SyntaxHighlighter
                style={customStyle}
                language={language}
                PreTag="pre"
                className="my-6 overflow-hidden whitespace-normal rounded-lg text-sm shadow-lg"
                wrapLines
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
              {language && (
                <CopyToClipboard
                  text={String(children).replace(/\n$/, '')}
                  className="absolute right-1 top-1"
                />
              )}
            </div>
          )
        },
        pre({ children }) {
          return children
        },
        a({ children, ...props }) {
          return (
            <a
              className="text-brand-600 underline hover:text-brand-800"
              target="_blank"
              {...props}
            >
              {children}
            </a>
          )
        },
        img({ src, alt }) {
          return <img src={src} alt={alt} className="h-auto max-w-full" />
        },
      }}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  )
}

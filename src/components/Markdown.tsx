import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import hljs from 'highlight.js'
import { JSX } from 'react'
import type { Element } from 'hast'
import { tv } from 'tailwind-variants'
import { CopyToClipboard } from './CopyToClipboard'

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

const CodeBlock = ({
  language,
  children,
}: {
  language: string
  children: string
}) => {
  if (!children) return null

  return (
    <div className="relative">
      <SyntaxHighlighter
        data-testid="syntax-highlighter"
        language={language}
        customStyle={{}}
        codeTagProps={{
          className: 'text-primary',
        }}
        PreTag={undefined}
        useInlineStyles={false}
        wrapLines
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
}

const CodeInline = ({
  language,
  children,
}: {
  language: string
  children: string
}) => {
  if (!children) return null

  return (
    <SyntaxHighlighter
      data-testid="syntax-highlighter-inline"
      language={language}
      codeTagProps={{
        className: 'px-1 py-0.5 bg-gray-200 rounded-sm border border-gray-400',
        style: {
          whiteSpace: 'unset',
        },
      }}
      useInlineStyles={false}
      PreTag="span"
      wrapLines={false}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  )
}

function Code({
  children,
  className = '',
  node,
}: JSX.IntrinsicElements['code'] & { node?: Element | undefined }) {
  if (!node?.position || !children || typeof children !== 'string') {
    console.error('Could not parse code node', node)
    return <>{children}</>
  }

  const detectedLanguage =
    hljs.highlightAuto(children, LANGUAGES_SUBSET_DETECTION).language ??
    'plaintext'
  const match = /language-(\w+)/.exec(className || '')
  const language: string = (match ? match[1] : detectedLanguage) ?? 'plaintext'

  if (node.position.start.line === node.position.end.line) {
    return <CodeInline language={language}>{children}</CodeInline>
  }

  return <CodeBlock language={language}>{children}</CodeBlock>
}

const markdownStyles = tv({
  base: [
    'prose',
    'prose-sm prose-code:text-sm',
    'prose-h1:mb-2 prose-h1:text-lg prose-h1:font-semibold',
    'prose-h2:mb-2 prose-h2:text-lg prose-h2:font-semibold',
    'prose-h3:mb-2 prose-h3:text-lg prose-h3:font-semibold',
    'prose-h4:mb-2 prose-h4:text-lg prose-h4:font-semibold',
    'prose-h5:mb-2 prose-h5:text-lg prose-h5:font-semibold',
    'prose-h6:mb-2 prose-h6:text-lg prose-h6:font-semibold',
    'prose max-w-none prose-p:leading-relaxed',
    '[--tw-prose-pre-code:theme(textColor.secondary)]',
    '[--tw-prose-pre-bg:theme(colors.gray.200)]',
    // 'prose-pre:p-4 prose-pre:shadow-md',
  ],
  variants: {
    isInverted: {
      true: 'prose-invert',
      false: '',
    },
  },
})

export function Markdown({ children, isInverted = false }: Props) {
  return (
    <ReactMarkdown
      className={markdownStyles({ isInverted })}
      components={{
        code: Code,
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
        pre: ({ children }) => children,
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

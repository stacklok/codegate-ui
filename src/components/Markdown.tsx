import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { CopyToClipboard } from "./CopyToClipboard";
import hljs from "highlight.js";

const LANGUAGES_SUBSET_DETECTION = [
  "c",
  "cpp",
  "csharp",
  "css",
  "elixir",
  "go",
  "groovy",
  "haskell",
  "html",
  "java",
  "javascript",
  "json",
  "kotlin",
  "markdown",
  "php",
  "python",
  "ruby",
  "rust",
  "scala",
  "sql",
  "typescript",
  "yaml",
];

interface Props {
  children: string;
  className?: string;
}

const customStyle = {
  ...oneDark,
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: "none",
  },
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: "#1a1b26",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    width: "100%",
    position: "relative",
    boxSizing: "border-box",
  },
};
export function Markdown({ children, className = "" }: Props) {
  SyntaxHighlighter.supportedLanguages = LANGUAGES_SUBSET_DETECTION;
  return (
    <ReactMarkdown
      components={{
        code({ className, children, ...props }) {
          const detectedLanguage =
            hljs.highlightAuto(children, LANGUAGES_SUBSET_DETECTION).language ??
            "plaintext";
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : detectedLanguage;
          return (
            <div className="relative group w-full ml-0 my-4">
              <SyntaxHighlighter
                style={customStyle}
                supportedLanguages={LANGUAGES_SUBSET_DETECTION}
                language={language}
                PreTag="div"
                className="rounded-lg overflow-hidden shadow-lg text-sm my-6 whitespace-normal"
                wrapLines
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
              {match && (
                <CopyToClipboard text={String(children).replace(/\n$/, "")} />
              )}
            </div>
          );
        },
        p({ children }) {
          return (
            <p
              className={cn(
                "text-gray-600 leading-relaxed mt-6 mb-3",
                className,
              )}
            >
              {children}
            </p>
          );
        },
        pre({ children }) {
          return <div className="not-prose">{children}</div>;
        },

        a({ children, ...props }) {
          return (
            <a
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              {...props}
            >
              {children}
            </a>
          );
        },
        img({ src, alt }) {
          return <img src={src} alt={alt} className="max-w-full h-auto" />;
        },
      }}
      remarkPlugins={[remarkGfm]}
      className={className}
    >
      {children}
    </ReactMarkdown>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Markdown } from "./Markdown";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";

export function Help() {
  const { section } = useParams();
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/help/${section}.md`);
        if (!response.ok) {
          throw new Error("Failed to load content");
        }
        const text = await response.text();
        setContent(text);

        // Allow content to render before highlighting
        setTimeout(() => {
          Prism.highlightAll();
        }, 0);
      } catch (error) {
        console.error("Error loading help content:", error);
        setContent(
          "# Error\nFailed to load help content. Please try again later."
        );
      }
    };

    fetchContent();
  }, [section]);

  return (
    <div className="max-w-5xl bg-white rounded-lg px-6 mx-auto">
      <Markdown
        className="prose prose-lg max-w-none
            prose-headings:text-primary 
            prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-8
            prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:font-medium prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-secondary prose-p:leading-relaxed
            prose-code:text-blue-600
            prose-pre:bg-gray-900 prose-pre:rounded-lg prose-pre:p-4
            prose-pre:shadow-md
          "
      >
        {content}
      </Markdown>
    </div>
  );
}

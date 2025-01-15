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
          "# Error\nFailed to load help content. Please try again later.",
        );
      }
    };

    fetchContent();
  }, [section]);

  return (
    <div className="max-w-5xl bg-base rounded-lg px-6 mx-auto">
      <Markdown>{content}</Markdown>
    </div>
  );
}

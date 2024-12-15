import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Markdown } from "./Markdown";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";

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
    <div className="w-full">
      <div className="flex mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="w-96 truncate">
                {section === "copilot-setup"
                  ? "CoPilot Setup"
                  : "Continue Setup"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div
        className="
          bg-white rounded-lg shadow-sm p-6 mx-auto
          max-w-[1200px] min-w-[800px]
          max-h-[calc(100vh-8rem)] overflow-y-auto
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
          hover:scrollbar-thumb-gray-400 
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb:hover]:bg-gray-400
        "
      >
        <Markdown
          className="
            prose prose-lg max-w-none
            prose-headings:text-gray-900 
            prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-8
            prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:font-medium prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-code:text-blue-600
            prose-pre:bg-gray-900 prose-pre:rounded-lg prose-pre:p-4
            prose-pre:shadow-md
          "
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
}

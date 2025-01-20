import { useParams } from "react-router-dom";
import { Markdown } from "@/components/Markdown";
import { Breadcrumb, Breadcrumbs } from "@stacklok/ui-kit";
import { BreadcrumbHome } from "@/components/BreadcrumbHome";
import { useHelpContent } from "@/hooks/useHelpContent";

export function RouteHelp() {
  const { section } = useParams();
  const { data: content = "", isError } = useHelpContent(section);

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb>Help</Breadcrumb>
      </Breadcrumbs>

      <div className="max-w-5xl bg-base rounded-lg px-6 mx-auto">
        <Markdown>
          {isError
            ? "# Error\nFailed to load help content. Please try again later."
            : content}
        </Markdown>
      </div>
    </>
  );
}

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function HoverPopover({
  children,
  title,
  className
}: {
  title: ReactNode;
  children: ReactNode;
  className?: string
}) {
  return (
    <div className={twMerge("flex items-center relative group/hoverPopover", className)}>
      <div className="text-primary hover:text-secondary font-semibold cursor-pointer text-base px-2 py-1 rounded-md transition-colors">
        {title}
      </div>
      <div className="absolute right-0 top-full mt-2 w-56 bg-base rounded-lg shadow-lg opacity-0 invisible group-hover/hoverPopover:opacity-100 group-hover/hoverPopover:visible transition-all duration-200 z-50 border border-gray-200">
        <div className="py-1">
          {children}
        </div>
      </div>
    </div>
  );
}

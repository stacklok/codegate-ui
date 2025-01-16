import * as React from "react";
import { twMerge } from "tailwind-merge";

type ChatMessageListProps = React.HTMLAttributes<HTMLDivElement>;

const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      className={twMerge(
        "flex flex-col size-full p-4 gap-6 overflow-y-auto",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  ),
);

ChatMessageList.displayName = "ChatMessageList";

export { ChatMessageList };

import * as React from 'react'
import MessageLoading from './message-loading'
import { Avatar, Button } from '@stacklok/ui-kit'
import { tv } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

// ChatBubble
const chatBubbleVariant = tv({
  base: 'group relative flex max-w-[60%] items-end gap-2 text-sm',
  variants: {
    variant: {
      received: 'self-start',
      sent: 'flex-row-reverse self-end',
    },
    layout: {
      default: '',
      ai: 'w-full max-w-full items-center',
    },
  },
  defaultVariants: {
    variant: 'received',
    layout: 'default',
  },
})

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'received' | 'sent'
  layout?: 'default' | 'ai'
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant, layout, children, ...props }, ref) => (
    <div
      className={twMerge(
        chatBubbleVariant({ variant, layout, className }),
        'group relative'
      )}
      ref={ref}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && typeof child.type !== 'string'
          ? React.cloneElement(child, {
              variant,
              layout,
            } as React.ComponentProps<typeof child.type>)
          : child
      )}
    </div>
  )
)
ChatBubble.displayName = 'ChatBubble'

// ChatBubbleAvatar
interface ChatBubbleAvatarProps extends React.ComponentProps<typeof Avatar> {
  src?: string
  fallback?: string
  className?: string
}

const ChatBubbleAvatar: React.FC<ChatBubbleAvatarProps> = ({
  src,
  fallback,
  className,
  ...rest
}) => (
  <Avatar
    src={src}
    name={fallback}
    className={twMerge(className, 'rounded-full')}
    {...rest}
  />
)

// ChatBubbleMessage
const chatBubbleMessageVariants = tv({
  base: 'bg-gray-100 p-4 text-primary',
  variants: {
    variant: {
      received: 'rounded-r-lg rounded-tl-lg',
      sent: 'rounded-l-lg rounded-tr-lg',
    },
    layout: {
      default: '',
      ai: 'w-full rounded-none border-t bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'received',
    layout: 'default',
  },
})

interface ChatBubbleMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'received' | 'sent'
  layout?: 'default' | 'ai'
  isLoading?: boolean
}

const ChatBubbleMessage = React.forwardRef<
  HTMLDivElement,
  ChatBubbleMessageProps
>(
  (
    { className, variant, layout, isLoading = false, children, ...props },
    ref
  ) => (
    <div
      className={twMerge(
        chatBubbleMessageVariants({ variant, layout, className }),
        'max-w-full break-words'
      )}
      ref={ref}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <MessageLoading />
        </div>
      ) : (
        children
      )}
    </div>
  )
)
ChatBubbleMessage.displayName = 'ChatBubbleMessage'

// ChatBubbleTimestamp
interface ChatBubbleTimestampProps
  extends React.HTMLAttributes<HTMLDivElement> {
  timestamp: string
}

const ChatBubbleTimestamp: React.FC<ChatBubbleTimestampProps> = ({
  timestamp,
  className,
  ...props
}) => (
  <div className={twMerge('mt-2 text-right text-sm', className)} {...props}>
    {timestamp}
  </div>
)

// ChatBubbleAction
type ChatBubbleActionProps = React.ComponentProps<typeof Button> & {
  icon: React.ReactNode
}

const ChatBubbleAction: React.FC<ChatBubbleActionProps> = ({
  icon,
  onPress,
  className,
  variant = 'tertiary',
  isIcon = true,
  ...props
}) => (
  <Button
    variant={variant}
    isIcon={isIcon}
    className={className}
    onPress={onPress}
    {...props}
  >
    {icon}
  </Button>
)

interface ChatBubbleActionWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'sent' | 'received'
  className?: string
}

const ChatBubbleActionWrapper = React.forwardRef<
  HTMLDivElement,
  ChatBubbleActionWrapperProps
>(({ variant, className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      `absolute top-1/2 flex -translate-y-1/2 opacity-0 transition-opacity duration-200
      group-hover:opacity-100`,
      variant === 'sent'
        ? '-left-1 -translate-x-full flex-row-reverse'
        : '-right-1 translate-x-full',
      className
    )}
    {...props}
  >
    {children}
  </div>
))
ChatBubbleActionWrapper.displayName = 'ChatBubbleActionWrapper'

export {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
  chatBubbleVariant,
  chatBubbleMessageVariants,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
}

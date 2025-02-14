interface EmptyStateProps {
  children?: React.ReactNode
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  illustration?: React.ReactNode
}

export function EmptyState({
  illustration,
  title,
  children,
  description,
}: EmptyStateProps) {
  return (
    <>
      <div className="my-4">
        {illustration != null && (
          <div className="m-auto flex w-full justify-center pb-2">
            {illustration}
          </div>
        )}
        <div className="mb-1 text-center text-xl font-medium text-gray-900">
          {title}
        </div>
        <div className="m-auto mb-6 text-center font-normal text-secondary">
          {description}
        </div>
        {children != null && (
          <div className="flex justify-center">{children}</div>
        )}
      </div>
    </>
  )
}

import { Heading as UIKitHeading } from '@stacklok/ui-kit'
import React, { ComponentProps } from 'react'

export function PageHeading({
  title,
  children,
  level,
}: {
  level: ComponentProps<typeof UIKitHeading>['level']
  title: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <UIKitHeading
      level={level}
      className="mb-4 flex items-center justify-between text-2xl font-bold"
    >
      {title}
      {children}
    </UIKitHeading>
  )
}

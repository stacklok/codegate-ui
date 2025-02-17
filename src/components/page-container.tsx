import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export function PageContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={twMerge('mx-auto max-w-[1440px] flex-col p-6', className)}
    >
      {children}
    </section>
  )
}

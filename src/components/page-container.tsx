import { ReactNode } from 'react'

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto max-w-[1440px] flex-col p-6">
      {children}
    </section>
  )
}

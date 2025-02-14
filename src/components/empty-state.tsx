import { Heading } from '@stacklok/ui-kit'
import { JSX, ReactNode, SVGProps } from 'react'
import { tv } from 'tailwind-variants'

const actionsStyle = tv({
  base: 'mx-auto mt-8',
  variants: {
    actions: {
      1: '',
      2: 'grid grid-cols-2 gap-2',
    },
  },
})

function Actions({ actions }: { actions: [ReactNode, ReactNode?] }) {
  return (
    <div className={actionsStyle({ actions: actions.length })}>{actions}</div>
  )
}

export function EmptyState({
  actions,
  body,
  illustration: Illustration,
  title,
}: {
  illustration: (props: SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  body: string
  actions: [ReactNode, ReactNode?] | null
}) {
  return (
    <div
      className="mx-auto flex max-w-[40rem] flex-col items-center justify-center text-balance
        py-32 text-center"
    >
      <Illustration className="mb-4 size-32" />
      <Heading level={4} className="mb-2 font-bold text-gray-900">
        {title}
      </Heading>
      <p>{body}</p>
      {actions ? <Actions actions={actions} /> : null}
    </div>
  )
}

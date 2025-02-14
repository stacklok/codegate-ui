import { formatNumberCompact } from '@/lib/format-number'
import { Card, CardBody, Heading, Skeleton } from '@stacklok/ui-kit'
import { ComponentProps } from 'react'

function AlertsSummaryStatistic({
  count,
  id,
  Icon: Icon,
}: {
  count: number
  id: string
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element
}) {
  return (
    <div data-testid={id} className="flex items-center gap-1 text-5xl">
      <Icon className="size-11" />
      {formatNumberCompact(count)}
    </div>
  )
}

export function AlertsSummary({
  title,
  statistics,
  isPending,
}: {
  title: string
  statistics: ComponentProps<typeof AlertsSummaryStatistic>[]
  isPending: boolean
}) {
  return (
    <Card>
      <CardBody>
        <Heading level={3} className="subhead-bold text-secondary">
          {title}
        </Heading>
        {isPending ? (
          <div className="my-3.5 flex items-center gap-1">
            <Skeleton className="size-12 rounded-full" />
            <Skeleton className="h-10 w-16" />
          </div>
        ) : (
          <div className="flex items-center gap-8">
            {statistics.map((props) => (
              <AlertsSummaryStatistic {...props} key={props.id} />
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}

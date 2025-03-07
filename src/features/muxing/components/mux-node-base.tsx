import { Handle, Position } from '@xyflow/react'
import * as config from '../constants/mux-node-config'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'
import { CSSProperties, ReactNode } from 'react'

const nodeStyles = tv({
  base: 'w-full overflow-hidden rounded border border-gray-200 bg-base shadow-sm',
})

export const MuxNodeBase = ({
  hasSourceRight,
  hasTargetLeft,
  children,
  className,
  icon: Icon,
  style,
}: {
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element
  className?: string
  children: ReactNode
  hasTargetLeft?: boolean
  hasSourceRight?: boolean
  style?: CSSProperties
}) => {
  return (
    <>
      {hasTargetLeft ? <Handle type="target" position={Position.Left} /> : null}

      <div
        style={{
          height: config.HEIGHT_NODE,
          ...style,
        }}
        className={twMerge(nodeStyles(), 'flex items-center')}
      >
        <div
          className="flex shrink-0 items-center justify-center bg-gray-50"
          style={{
            height: config.HEIGHT_NODE,
            width: config.HEIGHT_NODE,
          }}
        >
          <Icon className="size-5" />
        </div>

        <div className={twMerge('w-full px-4 py-3', className)}>{children}</div>
      </div>

      {hasSourceRight ? (
        <Handle type="source" position={Position.Right} />
      ) : null}
    </>
  )
}

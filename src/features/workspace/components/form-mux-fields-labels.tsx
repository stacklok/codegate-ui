import {
  Label,
  Tooltip,
  TooltipInfoButton,
  TooltipTrigger,
} from '@stacklok/ui-kit'
import { muxRowGridStyles } from '../lib/mux-row-grid-styles'

export function FormMuxFieldsLabels() {
  return (
    <div className={muxRowGridStyles()}>
      <div />
      <Label className="flex items-center gap-1">
        Request type
        <TooltipTrigger delay={0}>
          <TooltipInfoButton aria-label="Request type info" />
          <Tooltip placement="right" className="max-w-72 text-balance">
            You can optionally route requests to "fill-in-the-middle" (FIM)
            separately to chat requests with the model.
          </Tooltip>
        </TooltipTrigger>
      </Label>
      <Label className="flex items-center gap-1">
        Filter by
        <TooltipTrigger delay={0}>
          <TooltipInfoButton aria-label="Filter by info" />
          <Tooltip placement="right" className="max-w-72 text-balance">
            <p className="mb-2">
              Enter a glob pattern to mux requests based on filenames or file
              extensions.
            </p>
            <p>
              Filters are applied in top-down order. The first rule that matches
              each prompt determines the chosen model. An empty filter applies
              to all prompts.
            </p>
          </Tooltip>
        </TooltipTrigger>
      </Label>
      <Label>Model</Label>
    </div>
  )
}

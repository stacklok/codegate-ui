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
        Filter type
        <TooltipTrigger delay={0}>
          <TooltipInfoButton aria-label="Filter by description" />
          <Tooltip placement="right" className="max-w-72 text-balance">
            Filters are applied in top-down order. The first rule that matches
            each prompt determines the chosen model. An empty filter applies to
            all prompts.
          </Tooltip>
        </TooltipTrigger>
      </Label>
      <Label className="flex items-center gap-1">
        Filter by
        <TooltipTrigger delay={0}>
          <TooltipInfoButton aria-label="Filter by description" />
          <Tooltip placement="right" className="max-w-72 text-balance">
            Filters are applied in top-down order. The first rule that matches
            each prompt determines the chosen model. An empty filter applies to
            all prompts.
          </Tooltip>
        </TooltipTrigger>
      </Label>
      <Label>Preferred model</Label>
    </div>
  )
}

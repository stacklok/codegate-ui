import { MuxNodeBase } from './mux-node-base'
import { Lock01 } from '@untitled-ui/icons-react'
import * as config from '../constants/mux-node-config'
import SvgDrag from '@/components/icons/Drag'
import {
  FieldGroup,
  Input,
  Select,
  SelectButton,
  TextField,
} from '@stacklok/ui-kit'
import { IconRegex } from '@/components/icons/icon-regex'
import { Node } from '@xyflow/react'

export const MuxNodeMatcher = ({
  id,
  data,
}: Partial<Node> & {
  data: {
    isDisabled?: boolean
    onChange: (id: string | undefined, v: string) => void
  }
}) => {
  return (
    <MuxNodeBase
      style={{
        width: config.WIDTH_NODE,
      }}
      hasSourceRight
      hasTargetLeft
      icon={IconRegex}
      className=""
    >
      <FieldGroup className="grid w-full grid-cols-[1fr_2fr] items-center">
        <Select
          defaultSelectedKey={'all'}
          items={[
            {
              textValue: 'All',
              id: 'all',
            },
            {
              textValue: 'FIM',
              id: 'fim',
            },
            {
              textValue: 'Chat',
              id: 'chat',
            },
          ]}
        >
          <SelectButton isBorderless className="border-r border-r-gray-200" />
        </Select>
        <TextField
          isDisabled={data.isDisabled}
          type="text"
          aria-label="Matcher"
          onChange={(v) => data.onChange(id, v)}
        >
          <Input
            isBorderless
            icon={data.isDisabled ? <Lock01 /> : null}
            placeholder="e.g. *.ts"
          />
        </TextField>
      </FieldGroup>
    </MuxNodeBase>
  )
}

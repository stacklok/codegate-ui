import { MuxNodeBase } from './mux-node-base'
import { MessageDotsCircle } from '@untitled-ui/icons-react'

export const MuxNodePrompt = () => {
  return (
    <MuxNodeBase hasSourceRight icon={MessageDotsCircle}>
      <span className="font-semibold">Prompt</span>
    </MuxNodeBase>
  )
}

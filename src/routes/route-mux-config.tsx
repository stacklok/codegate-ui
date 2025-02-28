import { PageContainer } from '@/components/page-container'
import {
  Node,
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Position,
  Handle,
  ConnectionLineType,
} from '@xyflow/react'
import { useCallback, useState } from 'react'

import '@xyflow/react/dist/style.css'
import {
  Button,
  ButtonDarkMode,
  Heading,
  Input,
  Select,
  SelectButton,
  TextField,
  Tooltip,
  TooltipInfoButton,
  TooltipTrigger,
} from '@stacklok/ui-kit'
import { tv } from 'tailwind-variants'
import { PageHeading } from '@/components/heading'
import { Plus } from '@untitled-ui/icons-react'

const nodeStyles = tv({
  base: 'w-full rounded border border-gray-200 bg-base p-4 shadow-sm',
})
const groupStyles = tv({
  base: `bg-gray-50/50 -z-10 h-auto min-h-64 rounded-lg !border !border-gray-200
  stroke-gray-200 backdrop-blur-sm`,
})

const initialNodes: Node[] = [
  {
    id: 'prompt',
    type: 'prompt',
    data: { label: 'Prompt' },
    position: { x: 50, y: 50 },
    origin: [0.5, 0.5],
    sourcePosition: Position.Right,
    draggable: false,
  },
  {
    id: 'matcher-group',
    type: 'matcherGroup',
    data: {
      title: 'Matchers',
      description:
        'Matchers use regex patterns to route requests to specific models.',
      // onAddNode: addMatcherNode,
    },
    position: { x: 200, y: 0 },
    style: { width: 400 },
    draggable: false,
  },
  {
    id: 'model-group',
    type: 'modelGroup',
    data: {
      title: 'Model Group',
      description: 'Add model nodes here',
      // onAddNode: addModelNode,
    },
    position: { x: 620, y: 0 },
    style: { width: 400 },
    draggable: false,
  },
]

const initialEdges = []

export function RouteMuxes() {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange = (changes) =>
    setNodes((nds) => applyNodeChanges(changes, nds))
  const onEdgesChange = (changes) =>
    setEdges((eds) => applyEdgeChanges(changes, eds))

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  )
  const addMatcherNode = () => {
    const newNode: Node = {
      id: `matcher-${nodes.length}`,
      type: 'matcher',
      data: { label: '', onChange: handleNodeChange },
      position: {
        x: 0,
        y: nodes.filter((node) => node.id.startsWith('matcher')).length * 80,
      },
      parentId: 'matcher-group',
      origin: [0.5, 0.5],
      extent: 'parent',
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
    }
    setNodes((nds) => [...nds, newNode])
  }

  const addModelNode = () => {
    const newNode: Node = {
      id: `model-${nodes.length}`,
      type: 'model',
      data: { label: 'Qwen', onChange: handleNodeChange },
      position: {
        x: 400,
        y: nodes.filter((node) => node.id.startsWith('model')).length * 100,
      },
      parentId: 'model-group',
      extent: 'parent',
      targetPosition: Position.Right,
    }
    setNodes((nds) => [...nds, newNode])
  }

  const handleNodeChange = (id, value) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label: value } }
          : node
      )
    )
  }

  return (
    <PageContainer className="flex min-h-dvh flex-col">
      <PageHeading level={1} title="Muxing" />
      <p className="mb-2 max-w-6xl text-balance text-secondary">
        Model muxing (or multiplexing), allows you to configure your AI
        assistant once and use CodeGate workspaces to switch between LLM
        providers and models without reconfiguring your development environment.
      </p>
      <p className="mb-8 max-w-6xl text-balance text-secondary">
        Configure your IDE integration to send OpenAI-compatible requests to{' '}
        <code className="rounded-sm border border-gray-200 bg-gray-50 px-1 py-0.5">
          http://localhost:8989/v1/mux
        </code>{' '}
        and configure the routing from here.
      </p>
      <div className="h-[32rem] border border-gray-200">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={{
            prompt: PromptNode,
            matcher: MatcherNode,
            model: ModelNode,
            matcherGroup: (props) => (
              <GroupNode
                {...props}
                data={{ ...props.data, onAddNode: addMatcherNode }}
              />
            ),
            modelGroup: (props) => (
              <GroupNode
                {...props}
                data={{ ...props.data, onAddNode: addModelNode }}
              />
            ),
          }}
        >
          <Controls />
          <Background className="bg-gray-100" />
        </ReactFlow>
      </div>
    </PageContainer>
  )
}

const GroupNode = ({
  id,
  data,
}: Partial<Node> & {
  data: {
    title: string
    description: string
    onAddNode: (id: string | undefined) => void
  }
}) => {
  return (
    <div
      className={`-z-10 flex h-auto min-h-64 flex-col rounded-lg !border !border-gray-200
        bg-gray-50 stroke-gray-200 p-2`}
    >
      <div className="flex gap-1 rounded-t-lg bg-gray-50">
        <Heading level={3} className="mb-0 text-lg">
          {data.title}
        </Heading>
        <TooltipTrigger delay={0}>
          <TooltipInfoButton />
          <Tooltip placement="right">{data.description}</Tooltip>
        </TooltipTrigger>
      </div>

      <Button
        className="mt-auto w-full"
        variant="tertiary"
        onPress={() => data.onAddNode(id)}
      >
        <Plus />
        Add Node
      </Button>
    </div>
  )
}

export default GroupNode

const PromptNode = ({ id, data }) => {
  return (
    <>
      <div className={nodeStyles()}>
        <span>Prompt</span>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  )
}
const MatcherNode = ({ id, data }) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />

      <div className={nodeStyles()}>
        <TextField
          type="text"
          value={data.label}
          onChange={(v) => data.onChange(id, v)}
        >
          <Input placeholder="e.g. *.ts" />
        </TextField>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  )
}

const ModelNode = ({ id, data }) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />

      <div className={nodeStyles()}>
        <Select
          items={[
            {
              textValue: 'Qwen2.5-Coder-32B',
              id: 'Qwen2.5-Coder-32B',
            },
          ]}
        >
          <SelectButton />
        </Select>
      </div>
    </>
  )
}

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
  ComboBox,
  ComboBoxInput,
  FieldGroup,
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
import { Lock01, Plus, SearchMd } from '@untitled-ui/icons-react'

const nodeStyles = tv({
  base: 'w-full rounded border border-gray-200 bg-base p-4 shadow-sm',
})
const groupStyles = tv({
  base: `bg-gray-50/50 -z-10 h-auto min-h-[calc(100%-48px)] rounded-lg !border
  !border-gray-200 stroke-gray-200 backdrop-blur-sm`,
})

const GRID_SIZE = 90

const initialNodes: Node[] = [
  {
    id: 'matcher-group',
    type: 'matcherGroup',
    data: {
      title: 'Matchers',
      description:
        'Matchers use regex patterns to route requests to specific models.',
    },
    position: { x: 200, y: 24 },
    style: {
      width: 500,
      height: '100%',
    },
    draggable: false,
  },
  {
    id: 'model-group',
    type: 'modelGroup',
    data: {
      title: 'Model Group',
      description: 'Add model nodes here',
    },
    position: { x: 720, y: 24 },
    style: {
      width: 500,
      height: '100%',
    },
    draggable: false,
  },
  {
    id: 'prompt',
    type: 'prompt',
    data: { label: 'Prompt' },
    position: { x: 50, y: 114 },
    origin: [0.5, 0.5],
    sourcePosition: Position.Right,
    draggable: false,
  },
  {
    id: 'matcher-0',
    type: 'matcher',
    data: { label: 'catch-all', isDisabled: true },
    position: {
      x: 250,
      y: 90,
    },
    parentId: 'matcher-group',
    origin: [0.5, 0.5],
    extent: 'parent',
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
]

const EDGE = {
  type: ConnectionLineType.Bezier,
  animated: true,
}

const initialEdges = [
  {
    id: 'edge-0',
    source: 'prompt',
    target: 'matcher-0',
    ...EDGE,
  },
  {
    id: 'edge-1',
    source: 'matcher-0',
    target: 'model-0',
    ...EDGE,
  },
]

export function RouteMuxes() {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange = (changes) =>
    setNodes((nds) => applyNodeChanges(changes, nds))
  const onEdgesChange = (changes) =>
    setEdges((eds) =>
      applyEdgeChanges(
        {
          ...changes,
          ...EDGE,
        },
        eds
      )
    )

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            ...EDGE,
          },
          eds
        )
      ),
    []
  )

  const addMatcherNode = () => {
    const matcherNodes = nodes.filter(
      (node) => node.type === 'matcher' && node.id !== 'matcher-0'
    )
    const newNode: Node = {
      id: `matcher-${matcherNodes.length + 1}`,
      type: 'matcher',
      data: { label: '', onChange: handleNodeChange },
      position: {
        x: 250,
        y: matcherNodes.length * GRID_SIZE,
      },
      parentId: 'matcher-group',
      origin: [0.5, 0.5],
      extent: 'parent',
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
    }
    setNodes((nds) => {
      const updatedNodes = [...nds, newNode]
      return alignNodesToGrid(updatedNodes)
    })

    const newEdge = {
      id: `edge-${nodes.length}`,
      source: 'prompt',
      target: newNode.id,
      type: ConnectionLineType.Bezier,
      animated: true,
    }
    setEdges((eds) => [...eds, newEdge])
  }

  const addModelNode = () => {
    const newNode: Node = {
      id: `model-${nodes.length}`,
      type: 'model',
      data: { label: 'Qwen', onChange: handleNodeChange },
      position: {
        x: 250,
        y:
          nodes.filter((node) => node.id.startsWith('model')).length *
          GRID_SIZE,
      },
      origin: [0.5, 0.5],
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

  const alignNodesToGrid = (nodes) => {
    const matcherNodes = nodes.filter(
      (node) => node.type === 'matcher' && node.id !== 'matcher-0'
    )
    const catchAllNode = nodes.find((node) => node.id === 'matcher-0')

    matcherNodes.sort((a, b) => a.position.y - b.position.y)

    matcherNodes.forEach((node, index) => {
      node.position.y = index * GRID_SIZE
    })

    if (catchAllNode) {
      catchAllNode.position.y = matcherNodes.length * GRID_SIZE
    }

    return [
      ...matcherNodes,
      catchAllNode,
      ...nodes.filter((node) => node.type !== 'matcher'),
    ]
  }

  const onDragStop = useCallback(
    (event, node) => {
      const { project } = useReactFlow()
      if (node.type === 'matcher' && node.id !== 'matcher-0') {
        const updatedNodes = nodes.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              position: project({
                x: node.position.x,
                y: Math.round(node.position.y / GRID_SIZE) * GRID_SIZE,
              }),
            }
          }
          return n
        })
        setNodes(alignNodesToGrid(updatedNodes))
      }
    },
    [nodes]
  )

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
          onNodeDragStop={onDragStop}
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
      className={`-z-10 flex h-auto min-h-[calc(100%-48px)] flex-col rounded-lg !border-2
        border-dashed !border-gray-200 p-3`}
    >
      <div className="flex gap-1 rounded-t-lg">
        <Heading level={3} className="mb-0 text-lg">
          {data.title}
        </Heading>
        <TooltipTrigger delay={0}>
          <TooltipInfoButton />
          <Tooltip placement="right">{data.description}</Tooltip>
        </TooltipTrigger>

        <Button
          className="ml-auto h-8 px-2"
          variant="secondary"
          onPress={() => data.onAddNode(id)}
        >
          <Plus />
          Add Node
        </Button>
      </div>
    </div>
  )
}

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

const MatcherNode = ({
  id,
  data,
}: Partial<Node> & {
  data: {
    label: string
    isDisabled?: boolean
    onChange: (id: string | undefined, v: string) => void
  }
}) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />

      <div className={nodeStyles()}>
        <TextField
          isDisabled={data.isDisabled}
          type="text"
          value={data.label}
          onChange={(v) => data.onChange(id, v)}
        >
          <Input
            icon={data.isDisabled ? <Lock01 /> : undefined}
            placeholder="e.g. *.ts"
          />
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
        <ComboBox
          items={[
            {
              textValue: 'anthropic/claude-3.7-sonnet',
              id: 'anthropic/claude-3.7-sonnet',
            },
            {
              textValue: 'deepseek-r1',
              id: 'deepseek-r1',
            },
            {
              textValue: 'mistral:7b-instruct',
              id: 'mistral:7b-instruct',
            },
          ]}
        >
          <FieldGroup>
            <ComboBoxInput
              icon={<SearchMd />}
              isBorderless
              placeholder="Search for a model..."
            />
          </FieldGroup>
        </ComboBox>
      </div>
    </>
  )
}

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
  useReactFlow,
} from '@xyflow/react'
import { useCallback, useMemo, useState } from 'react'

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
import {
  ChartBreakoutCircle,
  Lock01,
  Plus,
  SearchMd,
} from '@untitled-ui/icons-react'
import { twMerge } from 'tailwind-merge'
import SvgDrag from '@/components/icons/Drag'
import { IconRegex } from '@/components/icons/icon-regex'

const nodeStyles = tv({
  base: 'w-full rounded border border-gray-200 bg-base p-4 shadow-sm',
})
const groupStyles = tv({
  base: `bg-gray-50/50 -z-10 h-auto min-h-[calc(100%-48px)] rounded-lg !border
  !border-gray-200 stroke-gray-200 backdrop-blur-sm`,
})

const GRID_SIZE = 90
const PADDING_GROUP = 12
const HEIGHT_GROUP_HEADER = 40
const HEIGHT_NODE = 74
const HEIGHT_CONTAINER = 512
const WIDTH_GROUP = 500
const WIDTH_NODE = WIDTH_GROUP - PADDING_GROUP * 2

enum NodeType {
  MATCHER_GROUP = 'matcherGroup',
  MODEL_GROUP = 'modelGroup',
  PROMPT = 'prompt',
  MATCHER = 'matcher',
  MODEL = 'model',
}

function computeGroupNodeY(index: number) {
  return (
    PADDING_GROUP * 4 +
    HEIGHT_GROUP_HEADER +
    HEIGHT_NODE * index +
    PADDING_GROUP * index
  )
}

const initialNodes: Node[] = [
  {
    id: 'prompt',
    type: NodeType.PROMPT,
    data: { label: 'Prompt' },
    position: { x: 50, y: HEIGHT_CONTAINER / 2 },
    origin: [0.5, 0.5],
    sourcePosition: Position.Right,
    draggable: false,
  },
  {
    id: 'matcher-group',
    type: NodeType.MATCHER_GROUP,
    data: {
      title: 'Matchers',
      description:
        'Matchers use regex patterns to route requests to specific models.',
    },
    position: { x: 200, y: HEIGHT_CONTAINER / 2 - HEIGHT_GROUP_HEADER / 2 },
    origin: [0, 0.5],
    style: {
      width: WIDTH_GROUP,
      // height: '100%',
    },
    draggable: false,
  },
  {
    id: 'model-group',
    type: NodeType.MODEL_GROUP,
    data: {
      title: 'Models',
      description: 'Add model nodes here',
    },
    position: { x: 720, y: HEIGHT_CONTAINER / 2 - HEIGHT_GROUP_HEADER / 2 },
    origin: [0, 0.5],
    style: {
      width: WIDTH_GROUP,
      // height: '100%',
    },
    draggable: false,
  },

  {
    id: 'matcher-0',
    type: NodeType.MATCHER,
    data: { label: 'catch-all', isDisabled: true },
    position: {
      x: 250,
      y: computeGroupNodeY(0),
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

/**
 * Ensures correct ordering of "matcher" nodes,
 * both visually, and in the list of nodes.
 */
function alignMatcherNodes(nodes: Node[]) {
  const matcherNodes = nodes.filter((n) => n.type === NodeType.MATCHER)

  // Ensure that the last matcher node is always
  // `matcher-0` (the catch-all matcher)
  if (
    matcherNodes.length > 0 &&
    matcherNodes[matcherNodes.length - 1]?.id !== 'matcher-0'
  ) {
    const catchallNodeIndex = matcherNodes.findIndex(
      (n) => n.id === 'matcher-0'
    )
    if (catchallNodeIndex !== -1) {
      const fallbackNode = matcherNodes.splice(catchallNodeIndex, 1)[0]
      if (fallbackNode) matcherNodes.push(fallbackNode)
    }
  }

  // Update Y position of matcher nodes, so that their
  // visual position reflects their position in the list
  matcherNodes.forEach((n, i) => {
    n.position.y = computeGroupNodeY(i)
  })

  // Re-integrate the matcher nodes into the node list
  return nodes.map((n) =>
    n.type === NodeType.MATCHER ? matcherNodes.shift() : n
  )
}

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
        x: WIDTH_GROUP / 2,
        y: computeGroupNodeY(0),
      },
      parentId: 'matcher-group',
      origin: [0.5, 0.5],
      extent: 'parent',
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
    }
    setNodes((nds) => {
      const updatedNodes = [...nds, newNode]
      return alignMatcherNodes(updatedNodes)
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

  const addModelNode = useCallback(() => {
    const newNode: Node = {
      id: `model-${nodes.length}`,
      type: NodeType.MODEL,
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
  }, [nodes])

  const handleNodeChange = (id, value) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label: value } }
          : node
      )
    )
  }

  const onNodeDragStop = useCallback((event, node) => {
    console.debug('👉 node:', node)
    console.debug('👉 event:', event)
    // const { project } = useReactFlow()
    // console.debug('👉 project:', project)
    // if (node.type === NodeType.MATCHER && node.id !== 'matcher-0') {
    //   const updatedNodes = nodes.map((n) => {
    //     if (n.id === node.id) {
    //       return {
    //         ...n,
    //         position: project({
    //           x: node.position.x,
    //           y: Math.round(node.position.y / GRID_SIZE) * GRID_SIZE,
    //         }),
    //       }
    //     }
    //     return n
    //   })
    //   setNodes(alignMatcherNodes(updatedNodes))
    // }
  }, [])

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
      <div
        style={{
          height: HEIGHT_CONTAINER,
        }}
        className="border border-gray-200"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStop={(...args) => console.log('onNodeDragStop', args)}
          onNodeDragStart={(...args) => console.log('onNodeDragStart', args)}
          nodeTypes={{
            prompt: PromptNode,
            matcher: MatcherNode,
            model: ModelNode,
            matcherGroup: (props) => (
              <GroupNode
                {...props}
                data={{
                  ...props.data,
                  onAddNode: addMatcherNode,
                  numNodes: nodes.filter((n) => n.type === NodeType.MATCHER)
                    .length,
                }}
              />
            ),
            modelGroup: (props) => (
              <GroupNode
                {...props}
                data={{
                  ...props.data,
                  onAddNode: addModelNode,
                  numNodes: nodes.filter((n) => n.type === NodeType.MODEL)
                    .length,
                }}
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
  ...rest
}: Partial<Node> & {
  data: {
    title: string
    description: string
    onAddNode: (id: string | undefined) => void
    numNodes: number
  }
}) => {
  console.debug('👉 data:', rest)
  return (
    <div
      style={{
        // padding: PADDING_GROUP,
        height:
          HEIGHT_GROUP_HEADER +
          PADDING_GROUP * 2 + // space around all nodes
          (data.numNodes - 1) * PADDING_GROUP + // space between nodes
          data.numNodes * HEIGHT_NODE,
      }}
      className={`-z-10 flex h-auto min-h-[calc(100%-48px)] flex-col rounded-lg !border-2
        border-dashed !border-gray-200`}
    >
      <div
        style={{
          height: HEIGHT_GROUP_HEADER,
        }}
        className="flex items-center gap-1 rounded-t-lg px-3"
      >
        <Heading level={3} className="mb-0 text-lg">
          {data.title} ({data.numNodes})
        </Heading>
        <TooltipTrigger delay={0}>
          <TooltipInfoButton />
          <Tooltip placement="right">{data.description}</Tooltip>
        </TooltipTrigger>

        <Button
          className="ml-auto h-7 px-2"
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
      <div
        style={{
          height: HEIGHT_NODE,
        }}
        className={twMerge(nodeStyles(), 'flex items-center gap-2')}
      >
        <ChartBreakoutCircle />
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

      <div
        style={{
          height: HEIGHT_NODE,
          width: WIDTH_NODE,
        }}
        className={twMerge(
          nodeStyles(),
          'grid grid-cols-[32px_1fr_2fr] items-center gap-4'
        )}
      >
        <SvgDrag className="size-8" />
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
          <SelectButton />
        </Select>
        <TextField
          isDisabled={data.isDisabled}
          type="text"
          aria-label="Matcher"
          value={data.label}
          onChange={(v) => data.onChange(id, v)}
        >
          <Input
            icon={data.isDisabled ? <Lock01 /> : <IconRegex />}
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

      <div
        style={{
          height: HEIGHT_NODE,
          width: WIDTH_NODE,
        }}
        className={nodeStyles()}
      >
        <ComboBox
          aria-label="Model"
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

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
} from '@xyflow/react'
import { useState } from 'react'

import '@xyflow/react/dist/style.css'
import { Input, Select, SelectButton, TextField } from '@stacklok/ui-kit'
import { tv } from 'tailwind-variants'

const nodeStyles = tv({
  base: 'rounded border border-gray-200 bg-base p-4 shadow-sm',
})
const groupStyles = tv({
  base: 'h-auto min-h-64 rounded-lg !border !border-gray-400 bg-gray-50 stroke-gray-200',
})

const initialNodes: Node[] = [
  {
    id: 'prompt',
    type: 'input',
    data: { label: 'Prompt' },
    position: { x: 0, y: 80 },
    sourcePosition: Position.Right,
    draggable: false,
  },
  {
    id: 'matcher-group',
    type: 'group',
    data: { label: 'Matcher Group' },
    position: { x: 200, y: 0 },
    style: { width: 400 },
    draggable: false,
    className: groupStyles(),
  },
  {
    id: 'model-group',
    type: 'group',
    data: { label: 'Model Group' },
    position: { x: 620, y: 0 },
    draggable: false,
    style: { width: 400 },
    className: groupStyles(),
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
  const onConnect = (connection) => setEdges((eds) => addEdge(connection, eds))

  const addMatcherNode = () => {
    const newNode: Node = {
      id: `matcher-${nodes.length}`,
      type: 'matcher',
      data: { label: '', onChange: handleNodeChange },
      position: {
        x: 0,
        y: nodes.filter((node) => node.id.startsWith('matcher')).length * 10,
      },
      parentId: 'matcher-group',
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
    <PageContainer className="min-h-dvh w-full">
      <div className="h-dvh w-dvw border border-gray-200">
        <div className="controls">
          <button onClick={addMatcherNode}>Add Matcher Node</button>
          <button onClick={addModelNode}>Add Model Node</button>
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={{
            matcher: MatcherNode,
            model: ModelNode,
          }}
        >
          <Controls />
          <Background />
          <MiniMap />
        </ReactFlow>
      </div>
    </PageContainer>
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
          <Input placeholder="Enter regex" />
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

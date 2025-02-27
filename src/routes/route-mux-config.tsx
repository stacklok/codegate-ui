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

const initialNodes = [
  {
    id: 'prompt',
    type: 'input',
    data: { label: 'Prompt' },
    position: { x: 0, y: 80 },
    sourcePosition: 'right',
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
    const newNode = {
      id: `matcher-${nodes.length}`,
      type: 'matcher',
      data: { label: '', onChange: handleNodeChange },
      position: { x: 200, y: nodes.length * 100 },
      targetPosition: 'left',
      sourcePosition: 'right',
    }
    setNodes((nds) => [...nds, newNode])
  }

  const addModelNode = () => {
    const newNode = {
      id: `model-${nodes.length}`,
      type: 'model',
      data: { label: 'Qwen', onChange: handleNodeChange },
      position: { x: 400, y: nodes.length * 100 },
      targetPosition: 'left',
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

import {
  addEdge,
  applyNodeChanges,
  Connection,
  NodeChange,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import CustomNode from "./components/custom-node";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "customNode",
    position: { x: 100, y: 100 },
    data: { label: "Node 1" },
  },
  {
    id: "2",
    type: "customNode",
    position: { x: -100, y: 200 },
    data: { label: "Node 2" },
  },
];

const App = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const updateNodeLabel = (id: string, value: string) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label: value } }
          : node
      )
    );
  };

  console.log("nodes", nodes);

  // Register the custom node type
  const nodeTypes = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customNode: (props: any) => (
      <CustomNode
        {...props}
        data={{ ...props.data, onChange: updateNodeLabel }}
      />
    ),
  };

  return (
    <ReactFlowProvider>
      <div style={{ height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          fitView
        />
      </div>
    </ReactFlowProvider>
  );
};

export default App;

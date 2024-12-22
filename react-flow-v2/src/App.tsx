import { useCallback, useRef } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  Controls,
  Background,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import { DnDProvider, useDnD } from "./providers/dnd-provider";

import "@xyflow/react/dist/style.css";
import "./App.css";
import Sidebar from "./components/sidebar";
const initialNodes = [
  { id: "1", data: { label: "Node nè" }, position: { x: 0, y: 0 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 200 } },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export function Flow() {
  const reactFlowWrapper = useRef(null);
  const idRef = useRef(0);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes]
  );

  const getId = () => `dndnode_${idRef.current++}`;

  console.log("nodes", nodes);

  return (
    <div className="dndflow">
      <Sidebar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <Flow />
      </DnDProvider>
    </ReactFlowProvider>
  );
}

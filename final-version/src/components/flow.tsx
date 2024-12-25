import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react";
import { useCallback, useContext, useEffect, useRef } from "react";
import { DnDContext } from "../providers/dnd-provider";
import { useNodeStore } from "../stores/flow-store";
import Layout from "./layout";
import { useSidebarStore } from "../stores/sidebar-store";
import RightSidebar from "./right-sidebar";

const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "Input node" },
    type: "input",
    position: { x: 0, y: 0 },
  },
];

const initialEdges: Edge[] = [];

function Flow() {
  const idRef = useRef(0);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const { type } = useContext(DnDContext);

  const { selectedNode, nodeLabel, setSelectedNode, setNodeLabel } =
    useNodeStore();

  const { setIsOpen } = useSidebarStore();

  useEffect(() => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, label: nodeLabel } }
            : node
        )
      );
    }
  }, [nodeLabel, selectedNode, setNodes]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!type) {
        return;
      }

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

  const handleNodeClick = (e: React.MouseEvent, node: Node) => {
    setIsOpen();
    setSelectedNode(node);
    setNodeLabel(node.data.label as string);
  };

  return (
    <Layout>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Controls />
        <Background />
      </ReactFlow>

      <RightSidebar />
    </Layout>
  );
}

export default Flow;

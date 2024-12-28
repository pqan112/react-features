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
import { useSidebarStore } from "../stores/sidebar-store";
import Layout from "./layout";
import CustomNode from "./nodes/custom-default";
import CustomInput from "./nodes/custom-input";
import CustomOutput from "./nodes/custom-output";
import RightSidebar from "./right-sidebar";

const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "Input node" },
    type: "customInput",
    position: { x: 50, y: 50 },
  },
  {
    id: "2",
    data: { label: "Default node" },
    type: "customDefault",
    position: { x: 150, y: 150 },
  },
];

const initialEdges: Edge[] = [];

const nodeTypes = {
  customInput: CustomInput,
  customDefault: CustomNode,
  customOutput: CustomOutput,
};

function Flow() {
  const idRef = useRef(0);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const { type } = useContext(DnDContext);

  const {
    selectedNode,
    label,
    bgColor,
    textColor,
    fontSize,
    handleColor,
    setSelectedNode,
    setLabel,
    setBgColor,
    setTextColor,
    setFontSize,
    setHandleColor,
  } = useNodeStore();

  const { setIsOpen } = useSidebarStore();

  useEffect(() => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: label,
                  bgColor: bgColor,
                  textColor: textColor,
                  fontSize: fontSize,
                  handleColor: handleColor,
                  isSelected: true,
                },
              }
            : node
        )
      );
    }
  }, [
    selectedNode,
    label,
    bgColor,
    textColor,
    fontSize,
    handleColor,
    setNodes,
  ]);

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
        data: { label: `node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes]
  );

  const getId = () => `dndnode_${idRef.current++}`;

  const handleNodeClick = (e: React.MouseEvent, node: Node) => {
    setIsOpen();
    setSelectedNode(node);
    setLabel(node.data.label as string);
    setBgColor(node.data.bgColor as string);
    setTextColor(node.data.textColor as string);
    setFontSize(node.data.textColor as string);
    setHandleColor(node.data.textColor as string);
  };

  return (
    <Layout>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
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

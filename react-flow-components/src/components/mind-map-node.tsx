import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import useStore from "@/store";
import { useState } from "react";

export type NodeData = {
  label: string;
};

export default function MindMapNode({ id, data }: NodeProps<Node<NodeData>>) {
  const [inputValue, setInputValue] = useState(data.label);
  const updateNodeLabel = useStore((state) => state.updateNodeLabel);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
    updateNodeLabel(id, e.target.value);
  };

  return (
    <>
      <input value={inputValue} onChange={handleChange} />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

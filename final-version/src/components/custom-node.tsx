import { BaseNode } from "./base-node";
import { Handle, NodeProps, Position } from "@xyflow/react";

function CustomNode({ data }: NodeProps) {
  return (
    <BaseNode className={`${data.bgColor}`}>
      <>
        {data.label}
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
      </>
    </BaseNode>
  );
}

export default CustomNode;

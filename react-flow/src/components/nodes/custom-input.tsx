import { cn } from "../../lib/utils";
import { useNodeStore } from "../../stores/flow-store";
import { BaseNode } from "../base-node";
import { Handle, NodeProps, Position } from "@xyflow/react";

function CustomInput({ id, data }: NodeProps) {
  const { selectedNode } = useNodeStore();
  return (
    <BaseNode
      selected={id === selectedNode?.id}
      className={cn(
        "py-2.5 border border-solid border-[#1a192b] px-4 w-40 text-sm text-gray-800",
        `${data.bgColor ?? ""} ${data.fontSize ?? ""} ${data.textColor ?? ""}`
      )}
    >
      <>
        {data.label}
        <Handle
          type="source"
          position={Position.Bottom}
          className={cn("bg-[#1a192b] rounded-md w-16", `${data.handleColor}`)}
        />
      </>
    </BaseNode>
  );
}

export default CustomInput;

import { cn } from "../../lib/utils";
import { useNodeStore } from "../../stores/flow-store";
import { BaseNode } from "../base-node";
import { Handle, NodeProps, Position } from "@xyflow/react";

function CustomOutput({ id, data }: NodeProps) {
  const { selectedNode } = useNodeStore();
  return (
    <BaseNode
      selected={id === selectedNode?.id}
      className={cn(
        "py-2.5 border border-solid border-[#1a192b] px-4 w-40 text-sm text-gray-800 hover:ring-0 ",
        `${data.bgColor ?? ""} ${data.fontSize ?? ""} ${data.textColor ?? ""}`
      )}
    >
      <>
        {data.label}
        <Handle
          type="target"
          position={Position.Top}
          className={cn("bg-[#1a192b] rounded-md w-16", `${data.handleColor}`)}
        />
      </>
    </BaseNode>
  );
}

export default CustomOutput;

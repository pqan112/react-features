import { cn } from "../../lib/utils";
import { BaseNode } from "../base-node";
import { Handle, NodeProps, Position } from "@xyflow/react";

function CustomOutput({ data }: NodeProps) {
  return (
    <BaseNode
      className={cn(
        "py-2.5 border border-solid border-[#1a192b] hover:!ring-0 px-4 w-40 text-sm text-gray-800",
        `${data.bgColor} ${data.fontSize} ${data.textColor}`
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

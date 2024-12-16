import { Handle, Position } from "@xyflow/react";

type CustomNodeProps = {
  id: string;
  data: {
    label: string;
    onChange: (id: string, value: string) => void;
  };
};

const CustomNode = ({ id, data }: CustomNodeProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    data.onChange(id, e.target.value);
  };

  return (
    <div style={{ padding: 10, border: "1px solid #ddd", borderRadius: 5 }}>
      <input
        type="text"
        value={data.label}
        onChange={(e) => handleChange(e)}
        style={{ width: "100%", padding: 5 }}
      />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default CustomNode;

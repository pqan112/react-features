import { useNodeStore } from "../stores/useNodeStore";

function RightPanel() {
  const { nodeLabel, setNodeLabel } = useNodeStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNodeLabel(e.target.value);
  };

  return (
    <div style={{ padding: "10px" }}>
      <input
        value={nodeLabel}
        onChange={handleChange}
        style={{ border: "1px solid red" }}
      />
    </div>
  );
}

export default RightPanel;

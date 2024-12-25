import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "./providers/dnd-provider";
import Flow from "./components/flow";
import "./App.css";
import "@xyflow/react/dist/style.css";
function App() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <Flow />
      </DnDProvider>
    </ReactFlowProvider>
  );
}

export default App;

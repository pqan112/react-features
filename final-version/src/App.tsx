import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "./providers/dnd-provider";
import Flow from "./components/flow";
import "@xyflow/react/dist/style.css";
import "./App.css";
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

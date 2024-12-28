import { ReactFlowProvider } from "@xyflow/react";
import Flow from "./components/flow";
import { DnDProvider } from "./providers/dnd-provider";
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

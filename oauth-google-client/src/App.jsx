import { RouterProvider } from "react-router";
import "./App.css";
import router from "./router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

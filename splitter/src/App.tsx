import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [leftPanel, setLeftPanel] = useState<HTMLElement | null>(null);
  const [rightPanel, setRightPanel] = useState<HTMLElement | null>(null);
  const [leftPanelWidth, setLeftPanelWidth] = useState<number>(0);
  const [rightPanelWidth, setRightPanelWidth] = useState<number>(0);
  const [splitterX, setSplitterX] = useState<number>(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // pageX, pageY là tọa độ của vị trí click chuột lên element
    // leftPanel là previousElementSibling
    // rightPanel là nextElementSibling
    setIsDragging(true);

    const left = (e.target as HTMLElement)
      .previousElementSibling as HTMLElement | null;
    const right = (e.target as HTMLElement)
      .nextElementSibling as HTMLElement | null;

    if (!left || !right) return;

    setLeftPanel(left);
    setRightPanel(right);
    setLeftPanelWidth(left.offsetWidth);
    setRightPanelWidth(right.offsetWidth);
    setSplitterX(e.pageX);
  };

  const handleMouseMove = (e) => {
    const moveX = e.pageX - splitterX;
    (leftPanel as HTMLElement).style.width = `${leftPanelWidth + moveX}px`;
    (rightPanel as HTMLElement).style.width = `${rightPanelWidth - moveX}px`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="container">
      <div className="left-panel"></div>
      <div className="splitter" onMouseDown={handleMouseDown}></div>
      <div className="right-panel"></div>
    </div>
  );
}

export default App;

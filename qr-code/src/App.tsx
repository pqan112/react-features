import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import reactLogo from "./assets/react.svg";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const qrGenerate = "https://maps.app.goo.gl/bXxvRFyyd4RHQw8t9";
  const width = 250;
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, width, width);

    const virtualCanvas = document.createElement("canvas");

    QRCode.toCanvas(
      virtualCanvas,
      qrGenerate,
      { width, margin: 1.5, errorCorrectionLevel: "Q" },
      function (error) {
        if (error) {
          console.error(error);
        }
        ctx.drawImage(virtualCanvas, 0, 0, width, width);

        const logoContainer = 30;
        const x = (width - logoContainer) / 2;
        const y = (width - logoContainer) / 2;
        ctx.fillStyle = "#fff";
        ctx.fillRect(x, y, logoContainer, logoContainer);
        ctx.textAlign = "center";

        const logo = new Image();
        logo.src = reactLogo;
        logo.onload = function () {
          const logoSize = 20;
          const x = (width - logoSize) / 2;
          const y = (width - logoSize) / 2;
          ctx.drawImage(logo, x, y, logoSize, logoSize);
        };
      }
    );
  }, [qrGenerate, width]);

  return (
    <canvas
      style={{ borderRadius: "6px" }}
      width={width}
      height={width}
      ref={canvasRef}
    ></canvas>
  );
}

export default App;

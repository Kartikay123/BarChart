import React, { useEffect, useRef } from "react";

const Canvas = ({ width, height, padding, bars }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, width, height);

    // === Solid axes (bottom + left) ===
    ctx.beginPath();
    // X axis (bottom border)
    ctx.moveTo(0, height - 1);
    ctx.lineTo(width, height - 1);

    // Y axis (left border)
    ctx.moveTo(1, 0);
    ctx.lineTo(1, height);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();

    // === Dotted borders (top + right) ===
    ctx.beginPath();
    ctx.setLineDash([6, 4]); // dash length + gap
    ctx.moveTo(0, 1); // top border
    ctx.lineTo(width, 1);

    ctx.moveTo(width - 1, 0); // right border
    ctx.lineTo(width - 1, height);

    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]); // reset dash style
  }, [bars, width, height, padding]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="chart-canvas"
    />
  );
};

export default Canvas;

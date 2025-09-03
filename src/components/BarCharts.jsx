import React, { useState } from "react";
import Canvas from "./Canvas";
import Bar from "./Bar";

const BarChart = () => {
  const width = 800;
  const height = 500;
  const padding = 10; // safe distance from borders

  const [bars, setBars] = useState([]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    const barWidth = 60;
    const barHeight = 120;
    // const barGap = 10; // space around bars

    // Clamp inside chart
    if (x < padding) x = padding;
    if (y < padding) y = padding;
    if (x + barWidth > width - padding) x = width - padding - barWidth;
    if (y + barHeight > height - padding) y = height - padding - barHeight;

    const newBar = {
      id: Date.now(),
      x,
      y,
      width: barWidth,
      height: barHeight,
    };

    setBars((prevBars) => {
      const updatedBars = [...prevBars, newBar];

      const barGap = 10;
      const totalBars = updatedBars.length;
      const totalGap = barGap * (totalBars + 1);
      const availableWidth = width - 2 * padding - totalGap;

      const totalCurrentWidth = updatedBars.reduce(
        (sum, b) => sum + b.width,
        0
      );

      // ✅ Only shrink if actual overflow happens
      if (totalCurrentWidth > availableWidth) {
        const scale = availableWidth / totalCurrentWidth;

        let currentX = padding + barGap;

        return updatedBars.map((b) => {
          const newWidth = b.width * scale;
          const newBar = { ...b, width: newWidth, x: currentX };
          currentX += newWidth + barGap;
          return newBar;
        });
      }

      // ✅ Otherwise, just return with new bar (no shrink)
      return updatedBars;
    });
  };

  const updateBar = (id, updates) => {
    setBars((prevBars) =>
      prevBars.map((bar) => (bar.id === id ? { ...bar, ...updates } : bar))
    );
  };

  return (
    <div
      style={{ position: "relative", width, height }}
      onContextMenu={handleContextMenu}
    >
      <Canvas width={width} height={height} padding={padding} bars={bars} />
      {bars.map((bar) => (
        <Bar
          key={bar.id}
          bar={bar}
          onUpdate={updateBar}
          chartWidth={width}
          chartHeight={height}
          padding={padding}
          allBars={bars}
        />
      ))}
    </div>
  );
};

export default BarChart;

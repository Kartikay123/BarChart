import React from "react";
import { Rnd } from "react-rnd";

const Bar = ({ bar, onUpdate, allBars, chartWidth, chartHeight, padding }) => {
  const isOverlapping = (a, b) => {
    return !(
      a.x + a.width <= b.x ||
      b.x + b.width <= a.x ||
      a.y + a.height <= b.y ||
      b.y + b.height <= a.y
    );
  };

  const handleDrag = (e, d) => {
    // Clamp position continuously while dragging
    const newX = Math.max(
      padding,
      Math.min(d.x, chartWidth - padding - bar.width)
    );
    const newY = Math.max(
      padding,
      Math.min(d.y, chartHeight - padding - bar.height)
    );

    const newBar = { ...bar, x: newX, y: newY };

    // Prevent overlapping
    const overlap = allBars.some(
      (other) => other.id !== bar.id && isOverlapping(newBar, other)
    );

    if (!overlap) onUpdate(bar.id, newBar);
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    let newWidth = parseInt(ref.style.width, 10);
    let newHeight = parseInt(ref.style.height, 10);

    // Clamp resize to stay inside chart
    if (position.x + newWidth > chartWidth - padding)
      newWidth = chartWidth - padding - position.x;
    if (position.y + newHeight > chartHeight - padding)
      newHeight = chartHeight - padding - position.y;
    if (position.x < padding) position.x = padding;
    if (position.y < padding) position.y = padding;

    const newBar = { ...bar, width: newWidth, height: newHeight, ...position };

    const overlap = allBars.some(
      (other) => other.id !== bar.id && isOverlapping(newBar, other)
    );

    if (!overlap) onUpdate(bar.id, newBar);
  };

  return (
    <Rnd
      size={{ width: bar.width, height: bar.height }}
      position={{ x: bar.x, y: bar.y }}
      bounds="parent" // keep inside parent div
      onDrag={handleDrag} // clamp while dragging
      onResizeStop={handleResizeStop}
      className="bar"
    />
  );
};

export default Bar;

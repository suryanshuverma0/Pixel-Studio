import { useState, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const Canvas = () => {
  const [color, setColor] = useState("#ffffff");
  const [width, setWidth] = useState(4);
  const canvasRef = useRef(null);

  const handleClear = () => {
    canvasRef.current.clearCanvas();
  };

  const handleUndo = () => {
    canvasRef.current.undo();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "600px",
          position: "relative",
        }}
      >
        <ReactSketchCanvas
          ref={canvasRef}
          strokeColor={color}
          strokeWidth={width}
          canvasColor="black"
          hideGrid
          width="100%"
          height="100%"
        />
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear
        </button>
        <button
          onClick={handleUndo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Undo
        </button>
        <label className="flex items-center space-x-2">
          <span>Brush Color:</span>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border border-gray-300 rounded"
          />
        </label>
        <label className="flex items-center space-x-2">
          <span>Brush Width:</span>
          <input
            type="range"
            min="1"
            max="50"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-24"
          />
        </label>
      </div>
    </div>
  );
};

export default Canvas;

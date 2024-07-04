import { useState } from "react";
import { CirclePicker } from "react-color";
import DrawingPanel from "./DrawingPanel";
const Editor = () => {
  //states
  const [panelWidth, setPanelWidth] = useState(16);
  const [panelHeight, setPanelHeight] = useState(16);
  const [hideOptions, setHideOptions] = useState(false);
  const [hideDrawingPanel, setHideDrawingPanel] = useState(true);
  const [buttonText, setButtonText] = useState("Start Drawing");
  const [selectedColor, setSelectedColor] = useState("#f44336");
  //events
  const handleInitializeDrawing = () => {
    setHideOptions(!hideOptions);
    setHideDrawingPanel(!hideDrawingPanel);

    buttonText === "Start Drawing"
      ? setButtonText("Reset")
      : setButtonText("Start Drawing");
  };
  const handleChangeColor = (color) => {
    setSelectedColor(color.hex);
  };
  return (
    <>
      <div className="flex justify-center items-center  h-[100vh]">
        <div className="bg-[#161B22] border border-gray-600 rounded-2xl shadow-2xl max-w-2xl text-center">
          <div className="flex flex-col gap-4">
            {hideDrawingPanel && (
              <div className="mt-2">
                <h1 className="text-2xl font-bold">Draw Pixel Art</h1>
              </div>
            )}

            {hideDrawingPanel && (
              <div>
                <div className="m-2">
                  <h2 className="text-lg">Enter dimesions</h2>
                </div>

                <div className="flex flex-row gap-4">
                  <div className="flex flex-col gap-2 items-center">
                    <input
                      type="number"
                      className="text-2xl px-2 py-2 text-center rounded-lg shadow-2xl border border-red-500  w-1/4 h-3/4 bg-black"
                      max={20}
                      defaultValue={panelWidth}
                      onChange={(e) => {
                        setPanelWidth(e.target.value);
                      }}
                    />
                    <span>Width</span>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <input
                      type="number"
                      className="text-2xl px-2 py-2 text-center rounded-lg shadow-2xl border border-red-500 w-1/4 h-3/4 bg-black"
                      defaultValue={panelHeight}
                      max={20}
                      onChange={(e) => {
                        setPanelHeight(e.target.value);
                      }}
                    />
                    <span>Height</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 mb-4">
              <button
                className="w-1/2 text-xl rounded-md px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                onClick={handleInitializeDrawing}
              >
                {buttonText}
              </button>
            </div>
          </div>
          {hideOptions && (
            <div className=" flex justify-center text-center m-6">
              <CirclePicker
                color={selectedColor}
                onChange={handleChangeColor}
              />
            </div>
          )}

          {hideOptions && (
            <div className="flex justify-center m-3">
              <DrawingPanel
                width={panelWidth}
                height={panelHeight}
                color={selectedColor}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Editor;

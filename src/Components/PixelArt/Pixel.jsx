import { useState } from "react";

const Pixel = (prop) => {
  const [pixelColor, setPixelColor] = useState("#FFFFFF");
  const [oldColor, setOldColor] = useState(pixelColor);
  const [canChagngeColor, setCanChagngeColor] = useState(true);
  const { color } = prop;

  const applyColor = () => {
    setPixelColor(color);
    setCanChagngeColor(false);
  }
  const changeColorOnHover = () => {
    setOldColor(pixelColor);
    setPixelColor(color);
  }
  const handleReset = () => {
    if(canChagngeColor) {
      setPixelColor(oldColor);
    }
    setCanChagngeColor(true);
  }
  return (
    <>
        <div
      style={{ backgroundColor: pixelColor, width: '15px', height: '15px' }} onClick={applyColor} onMouseEnter={changeColorOnHover} onMouseLeave={handleReset}
    ></div>
    </>
  );
};

export default Pixel;

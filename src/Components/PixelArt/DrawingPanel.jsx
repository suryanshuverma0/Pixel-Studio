import Rows from "./Rows";
import { useRef } from "react";
import PropTypes from "prop-types";
import { exportComponentAsPNG } from "react-component-export-image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DrawingPanel = (props) => {
  const { width, height, color } = props;
  const panelRef = useRef();

  let rows = [];

  for (let i = 0; i < height; i++) {
    rows.push(<Rows key={i} width={width} color={color} />);
  }
  return (
    <>
    <div className="flex flex-col">
      <div className="flex flex-col" ref={panelRef}>
        {rows}
      </div>
      <div className="m-2 w-full">
        <button
          className="w-full text-xl rounded-md px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          onClick={() => {
            exportComponentAsPNG(panelRef);
            toast.success("Image saved as PNG!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }}
        >
          EXPORT AS PNG
        </button>
      </div>
      </div>
      <ToastContainer/>
    </>
  );
};

DrawingPanel.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
export default DrawingPanel;

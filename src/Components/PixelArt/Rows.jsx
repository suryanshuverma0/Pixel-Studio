import PropTypes from "prop-types";
import Pixel from "./Pixel";
const Rows = (props) => {
  const {width, color} = props;
  let pixels = [];

  for (let i = 0; i < width; i++) {
         pixels.push(<Pixel key={i} color={color} />)
  }
  return (
    <>
      <div  className="flex">
         {pixels}
      </div>
    </>
  );
};
Rows.propTypes = {
  width: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
export default Rows;

import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ element }) => {
  const { authState } = useAuth();
  console.log("hi i am private", authState.isAuth);
  return authState.isAuth ? element : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;


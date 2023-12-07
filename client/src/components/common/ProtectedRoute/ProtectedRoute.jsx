import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../../store/usersSlice";

const ProtectedRoute = ({ component: Component, children, ...routeProps }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{Component ? <Component {...routeProps} /> : children}</>;
};

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ProtectedRoute;

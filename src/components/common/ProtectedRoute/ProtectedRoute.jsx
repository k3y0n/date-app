import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";

const ProtectedRoute = ({ component: Component, children, ...routeProps }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
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

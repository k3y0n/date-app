import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUserList } from "../../../store/usersSlice";
import { useEffect } from "react";
import PropTypes from "prop-types";

const UsersLoader = ({ children }) => {
  const dispatch = useDispatch();

  const dataStatus = useSelector(getDataStatus());

  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadUserList());
    }
  }, []);

  return <>{!dataStatus ? "Loading..." : children}</>;
};

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default UsersLoader;

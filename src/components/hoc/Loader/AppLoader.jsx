import { useDispatch, useSelector } from "react-redux";
import {
  getDataStatus,
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUserList,
} from "../../../store/usersSlice";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { loadQualityList } from "../../../store/qualitySlice";
import { loadProfessionList } from "../../../store/professionsSlice";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const dataStatus = useSelector(getDataStatus());
  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());

  useEffect(() => {
    dispatch(loadQualityList());
    dispatch(loadProfessionList());
    if (isLoggedIn) {
      dispatch(loadUserList());
    }
    if (!dataStatus) {
      dispatch(loadUserList());
    }
  }, []);

  return <>{usersStatusLoading ? "Loading..." : children}</>;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;

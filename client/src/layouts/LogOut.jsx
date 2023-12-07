import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/usersSlice";

const LogOut = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logOut());
  }, []);

  return <div>Loading...</div>;
};

export default LogOut;

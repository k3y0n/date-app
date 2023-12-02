import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return <div>Loading...</div>;
};

export default LogOut;

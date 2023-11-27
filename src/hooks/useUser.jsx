import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    try {
      const { content } = await userService.get();
      setUsers(content);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (!error) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <UserContext.Provider value={{ users }}>
      {loading ? <h2>Loading...</h2> : children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;

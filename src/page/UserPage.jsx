import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

const UserPage = () => {
  const id = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    API.users.getById(id).then((user) => setUser(user));
  }, [id]);

  console.log(user);

  return <div>UserPage</div>;
};

export default UserPage;

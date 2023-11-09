import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Qualities from "../components/Qualities";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    API.users.getById(userId).then((user) => setUser(user));
  }, [userId]);

  const handleClick = () => {
    navigate("/users");
  };

  return (
    <>
      {user ? (
        <div>
          <h1> {user.name}</h1>
          <h2>Профессия: {user.profession.name}</h2>
          <Qualities qualities={user.qualities} />
          <p>completedMeetings: {user.completedMeetings}</p>
          <h2>Rate: {user.rate}</h2>
          <button className="btn btn-primary" onClick={handleClick}>
            Все Пользователи
          </button>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default UserPage;

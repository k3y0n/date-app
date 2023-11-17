import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api";
import Qualities from "../../ui/Qualities/Qualities";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    API.users.getById(userId).then((user) => setUser(user));
  }, [userId]);

  const handleClick = () => {
    navigate("/users");
  };
  const handleClickEdit = () => {
    navigate(`edit`);
  };

  return (
    <>
      {user ? (
        <div>
          <h1> {user.name}</h1>
          <h2>Профессия: {user.profession.name}</h2>
          <Qualities qualities={user.qualities} />
          <p>Кол-во встреч: {user.completedMeetings}</p>
          <h2>Оценка: {user.rate}</h2>
          <button className="btn btn-primary" onClick={handleClick}>
            Все пользователи
          </button>
          <button className="btn btn-primary" onClick={handleClickEdit}>
            Редактировать
          </button>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

UserPage.proptTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPage;

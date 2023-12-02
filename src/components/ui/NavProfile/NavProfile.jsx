import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const NavProfile = () => {
  const [isVisible, setVisible] = useState(false);
  const { currentUser } = useAuth();

  const toggleShow = () => {
    setVisible((prev) => !prev);
  };
  return (
    <div className="dropdown" onClick={toggleShow}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img
          src={
            "https://api.dicebear.com/7.x/personas/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=" +
            currentUser.name
          }
          alt="user_img"
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={`w-100 dropdown-menu ${isVisible ? "show" : ""}`}>
        <Link className="dropdown-item" to={`/users/${currentUser._id}`}>
          Профиль
        </Link>
        <Link className="dropdown-item" to="/logout">
          Выйти
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;

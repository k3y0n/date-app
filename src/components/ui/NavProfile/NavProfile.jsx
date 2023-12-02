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
          src={currentUser.image}
          alt="user avatar"
          height="40"
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={"w-100 dropdown-menu" + (isVisible ? " show" : "")}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;

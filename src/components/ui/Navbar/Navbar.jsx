import { Link } from "react-router-dom";
import NavProfile from "../NavProfile/NavProfile";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../../store/usersSlice";

const Navbar = () => {
  const currentUser = useSelector(getCurrentUserData());

  return (
    <nav className="navbar bg-light mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/">
              Main
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/users">
                Users
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {currentUser ? (
            <NavProfile />
          ) : (
            <Link className="nav-link " aria-current="page" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

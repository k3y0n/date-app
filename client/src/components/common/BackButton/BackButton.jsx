import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUserId } from "../../../store/usersSlice";
const BackButton = () => {
  const navigate = useNavigate();
  const currentUserId = useSelector(getCurrentUserId());
  return (
    <button
      className="btn btn-primary"
      onClick={() => navigate(`/users/${currentUserId}`)}
    >
      <i className="bi bi-caret-left"></i>
      Назад
    </button>
  );
};

export default BackButton;

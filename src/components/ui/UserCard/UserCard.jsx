import PropTypes from "prop-types";
import Card from "../../hoc/Card/Card";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectProfessionById } from "../../../store/professionsSlice";

const UserCard = ({ name, email, _id, profession, rate, handleClickEdit }) => {
  const professionName = useSelector((state) =>
    selectProfessionById(state, profession)
  );
  const { currentUser } = useAuth();
  return (
    <Card className={"card mb-3"}>
      <div className="card-body">
        {currentUser._id === _id && (
          <button
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
            onClick={handleClickEdit}
          >
            <i className="bi bi-gear"></i>
          </button>
        )}
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={
              "https://api.dicebear.com/7.x/personas/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=" +
              email
            }
            className="rounded-circle"
            width="150"
          />
          <div className="mt-3">
            <h4>{name}</h4>
            {professionName && (
              <p className="text-secondary mb-1">{professionName.name}</p>
            )}
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{rate}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

UserCard.proptTypes = {
  name: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  rate: PropTypes.string.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
};

export default UserCard;

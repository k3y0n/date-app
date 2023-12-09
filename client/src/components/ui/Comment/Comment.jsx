import { useSelector } from "react-redux";
import { formateDate } from "../../../utils/formateDate";
import Card from "../../hoc/Card/Card";
import { getCurrentUserData, selectUserById } from "../../../store/usersSlice";
import PropTypes from "prop-types";

const Comment = ({ content, created_at, userId, _id, handleDelete }) => {
  const user = useSelector(selectUserById(userId));
  const currentUser = useSelector(getCurrentUserData());

  return (
    <>
      {user && (
        <Card className={"bg-light card-body  mb-3"}>
          <div className="row">
            <div className="col">
              <div className="d-flex flex-start ">
                <img
                  src={user.image}
                  className="rounded-circle shadow-1-strong me-3"
                  alt="avatar"
                  width="65"
                  height="65"
                />
                <div className="flex-grow-1 flex-shrink-1">
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-1 ">
                        <span className="m-1">{user.name}</span>
                        <span className="small">{formateDate(created_at)}</span>
                      </p>
                      {userId === currentUser._id && (
                        <button className="btn btn-sm text-primary d-flex align-items-center">
                          <i
                            className="bi bi-x-lg"
                            onClick={() => handleDelete(_id)}
                          />
                        </button>
                      )}
                    </div>
                    <p className="small mb-0">{content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Comment;

import { useUser } from "../../../hooks/useUser";
import { formateDate } from "../../../utils/formateDate";
import Card from "../../hoc/Card/Card";

const Comment = ({ comment, created_at, userId, _id, handleDelete }) => {
  const { getUser } = useUser();
  const user = getUser(userId);
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
                      <button className="btn btn-sm text-primary d-flex align-items-center">
                        <i
                          className="bi bi-x-lg"
                          onClick={() => handleDelete(_id)}
                        ></i>
                      </button>
                    </div>
                    <p className="small mb-0">{comment}</p>
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

export default Comment;

import { formateDate } from "../../../utils/formateDate";
import Card from "../../hoc/Card/Card";
import { useEffect, useState } from "react";
import API from "../../../api";

const Comment = ({ content, created_at, userId }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, []);

  return (
    <>
      {user && (
        <Card className={"bg-light card-body  mb-3"}>
          <div className="row">
            <div className="col">
              <div className="d-flex flex-start ">
                <img
                  src={
                    "https://api.dicebear.com/7.x/personas/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=" +
                    user.name
                  }
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
                        <i className="bi bi-x-lg"></i>
                      </button>
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

export default Comment;

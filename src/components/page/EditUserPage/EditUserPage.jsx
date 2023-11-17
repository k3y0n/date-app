import { useEffect, useState } from "react";
import API from "../../../api";
import PropTypes from "prop-types";
import EditForm from "../../ui/EditForm/EditForm";

const EditUserPage = ({ userId }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    API.users.getById(userId).then((user) => setUser(user));
  }, [userId]);

  return (
    <>
      {user ? (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
              <EditForm user={user} />
            </div>
          </div>
        </div>
      ) : (
        "Загрузка..."
      )}
    </>
  );
};

EditUserPage.proptTypes = {
  userId: PropTypes.string.isRequired,
};

export default EditUserPage;

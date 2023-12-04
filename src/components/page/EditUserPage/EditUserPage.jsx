import PropTypes from "prop-types";
import EditForm from "../../ui/EditForm/EditForm";
import BackButton from "../../common/BackButton/BackButton";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/usersSlice";

const EditUserPage = ({ userId }) => {
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
      {userId === currentUserId ? (
        <div className="container mt-5">
          <BackButton />
          <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
              <EditForm />
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={`/users/${currentUserId}/edit`} />
      )}
    </>
  );
};

EditUserPage.proptTypes = {
  userId: PropTypes.string.isRequired,
};

export default EditUserPage;

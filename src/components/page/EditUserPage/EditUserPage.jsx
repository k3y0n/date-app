import PropTypes from "prop-types";
import EditForm from "../../ui/EditForm/EditForm";
import BackButton from "../../common/BackButton/BackButton";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const EditUserPage = ({ userId }) => {
  const { currentUser } = useAuth();

  return (
    <>
      {userId === currentUser._id ? (
        <div className="container mt-5">
          <BackButton />
          <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
              <EditForm />
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={`/users/${currentUser._id}/edit`} />
      )}
    </>
  );
};

EditUserPage.proptTypes = {
  userId: PropTypes.string.isRequired,
};

export default EditUserPage;

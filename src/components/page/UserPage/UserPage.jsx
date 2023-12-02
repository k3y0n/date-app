import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import UserCard from "../../ui/UserCard/UserCard";
import QualitiesCard from "../../ui/QualitesCard/QualitiesCard";
import MeetingsCard from "../../ui/MeetingsCard/MeetingsCard";
import Comments from "../../ui/Comments/Comments";
import { useUser } from "../../../hooks/useUser";
import CommentsProvider from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
  const { getUser } = useUser();
  const user = getUser(userId);
  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(`edit`);
  };

  return (
    <>
      {user ? (
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard {...user} handleClickEdit={handleClickEdit} />
              <QualitiesCard qualities={user.qualities} />
              <MeetingsCard completedMeetings={user.completedMeetings} />
            </div>
            <div className="col-md-8">
              <CommentsProvider>
                <Comments userId={userId} />
              </CommentsProvider>
            </div>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

UserPage.proptTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPage;

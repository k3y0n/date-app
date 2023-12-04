import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import UserCard from "../../ui/UserCard/UserCard";
import QualitiesCard from "../../ui/QualitesCard/QualitiesCard";
import MeetingsCard from "../../ui/MeetingsCard/MeetingsCard";
import Comments from "../../ui/Comments/Comments";
import CommentsProvider from "../../../hooks/useComments";
import { useSelector } from "react-redux";
import { selectUserById } from "../../../store/usersSlice";

const UserPage = ({ userId }) => {
  const user = useSelector(selectUserById(userId));

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
                <Comments />
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

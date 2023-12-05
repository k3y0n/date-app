import PropTypes from "prop-types";
import UserCard from "../../ui/UserCard/UserCard";
import QualitiesCard from "../../ui/QualitesCard/QualitiesCard";
import MeetingsCard from "../../ui/MeetingsCard/MeetingsCard";
import Comments from "../../ui/Comments/Comments";
import { useSelector } from "react-redux";
import { selectUserById } from "../../../store/usersSlice";

const UserPage = ({ userId }) => {
  const user = useSelector(selectUserById(userId));

  return (
    <>
      {userId ? (
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard user={user} />
              <QualitiesCard qualities={user.qualities} />
              <MeetingsCard completedMeetings={user.completedMeetings} />
            </div>
            <div className="col-md-8">
              <Comments />
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

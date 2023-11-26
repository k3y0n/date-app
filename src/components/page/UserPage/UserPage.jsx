import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api";
import PropTypes from "prop-types";
import UserCard from "../../ui/UserCard/UserCard";
import QualitiesCard from "../../ui/QualitesCard/QualitiesCard";
import MeetingsCard from "../../ui/MeetingsCard/MeetingsCard";
import CommentsList from "../../ui/CommentsList/CommentsList";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    API.users.getById(userId).then((user) => setUser(user));
  }, [userId]);

  const handleClick = () => {
    navigate("/users");
  };
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
              <CommentsList userId={userId} />
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

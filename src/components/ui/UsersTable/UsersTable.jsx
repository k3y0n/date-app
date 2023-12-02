import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Qualities from "../Qualities/Qualities";
import BookMark from "../../common/Bookmark/Bookmark";
import Table from "../../common/Table/Table";
import Professions from "../Professions/Professions";

const UsersTable = ({ visibleUsers, currentSort, toggleBookmark, onSort }) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>,
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />,
    },
    professions: {
      name: "Профессия",
      component: (user) => <Professions id={user.profession} />,
    },
    completedMeetings: {
      path: "completedMeetings",
      name: "Встретился, раз",
    },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <BookMark id={user._id} onToggle={toggleBookmark} {...user} />
      ),
    },
  };
  return (
    <Table
      data={visibleUsers}
      columns={columns}
      selectedSort={currentSort}
      onSort={onSort}
    />
  );
};

UsersTable.propTypes = {
  visibleUsers: PropTypes.array.isRequired,
  currentSort: PropTypes.object.isRequired,
  toggleBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default UsersTable;

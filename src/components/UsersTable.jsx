import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Qualities from "./Qualities.jsx";
import BookMark from "./BookMark.jsx";
import Table from "./Table";

const UsersTable = ({
  visibleUsers,
  currentSort,
  handleDelete,
  toggleBookmark,
  onSort,
}) => {
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
    professions: { path: "profession.name", name: "Профессия" },
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
    delete: {
      component: (user) => (
        <button
          onClick={() => handleDelete(user._id)}
          className="btn btn-danger"
        >
          delete
        </button>
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
  handleDelete: PropTypes.func.isRequired,
  toggleBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default UsersTable;

import TableHeader from "./TableHeader";
import User from "./User";
import PropTypes from "prop-types";

const UsersTable = ({
  visibleUsers,
  currentSort,
  handleDelete,
  toggleBookmark,
  onSort,
}) => {
  const columns = {
    name: { field: "name", name: "Имя" },
    qualities: { name: "Качества" },
    professions: { field: "profession.name", name: "Профессия" },
    completedMeetings: { field: "completedMeetings", name: "Встретился раз" },
    rate: { field: "rate", name: "Оценка" },
    bookmark: { field: "bookmark", name: "Израбанное" },
    delete: {},
  };
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        selectedSort={currentSort}
        onSort={onSort}
      />
      <tbody>
        {visibleUsers.map((user) => (
          <User
            key={user._id}
            {...user}
            onDelete={handleDelete}
            onToggle={toggleBookmark}
          />
        ))}
      </tbody>
    </table>
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

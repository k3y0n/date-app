import { useState } from "react";
import API from "../api";
import SearchStatus from "./SearchStatus";
import User from "./User";

const Users = () => {
  const [users, setUsers] = useState(API.users.fetchAll());

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  const toggleBookmark = (id) => {
    setUsers(
      users.map((user) =>
        user._id === id ? { ...user, bookmark: !user.bookmark } : user
      )
    );
  };

  return (
    <>
      <SearchStatus length={users.length} />
      <table className="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Качества</th>
            <th>Профессия</th>
            <th>Встретился,раз</th>
            <th>Оценка</th>
            <th>Избранное</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User
              key={user._id}
              {...user}
              onDelete={handleDelete}
              onToggle={toggleBookmark}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;

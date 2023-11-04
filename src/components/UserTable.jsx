import { useState } from "react";
import API from "../api/index.js";

const UserTable = () => {
  const [users, setUsers] = useState(API.users.fetchAll());

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  const phrase = (users) => {
    if (users.length > 4 && users.length < 12) {
      return "человек";
    } else if (users.length <= 4 && users.length >= 2) {
      return "человека";
    } else return "человек";
  };

  const titleText =
    users.length > 0
      ? `С тобой пообщается ${users.length} ${phrase(users)}`
      : "С тобой никто не пообщается";

  const titleClass = users.length > 0 ? "primary" : "warning";
  return (
    <>
      <h1>
        <span className={`badge text-bg-${titleClass}`}>{titleText}</span>
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Качества</th>
            <th>Профессия</th>
            <th>Встретился,раз</th>
            <th>Оценка</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>
                {user.qualities.map((item) => (
                  <span
                    key={item.name}
                    className={`badge text-bg-${item.color} m-2`}
                  >
                    {item.name}
                  </span>
                ))}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}/5</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;

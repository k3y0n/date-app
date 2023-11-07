import { useState, useEffect } from "react";
import API from "../api";
import SearchStatus from "./SearchStatus";
import User from "./User";
import Pagination from "./Pagination";
import { paginate } from "../utils/pagination";
import Filter from "./Filter";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [professions, setProfessions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfession, setSelectedProfession] = useState();
  const pageSize = 3;

  useEffect(() => {
    API.users.fetchAll().then((data) => {
      setUsers(data);
    });
    API.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProfession]);

  const filteredUsers = selectedProfession
    ? users.filter((user) => user.profession === selectedProfession)
    : users;

  const visibleUsers = paginate(filteredUsers, currentPage, pageSize);

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

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const handleProfessionSelect = (profession) => {
    setSelectedProfession(profession);
  };

  return (
    <>
      {users.length > 0 && (
        <div className="d-flex gap-5 p-3">
          <div className="d-flex flex-column gap-2 ">
            <Filter
              items={professions}
              profession={selectedProfession}
              onItemSelect={handleProfessionSelect}
            />
            <button
              className="btn btn-primary"
              onClick={() => setSelectedProfession()}
            >
              Очистить фильтры
            </button>
          </div>

          <div className="d-flex flex-column">
            <SearchStatus length={filteredUsers.length} />
            {visibleUsers.length > 0 && (
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
            )}
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={filteredUsers.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePage}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;

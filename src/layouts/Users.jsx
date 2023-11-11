import { useState, useEffect } from "react";
import API from "../api";
import SearchStatus from "../components/SearchStatus";
import Pagination from "../components/Pagination";
import { paginate } from "../utils/pagination";
import Filter from "../components/Filter";
import UsersTable from "../components/UsersTable";
import _ from "lodash";
import Search from "../components/Search";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [professions, setProfessions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfession, setSelectedProfession] = useState();
  const [currentSort, setCurrentSort] = useState({
    path: "name",
    order: "asc",
  });
  const [search, setSearch] = useState("");
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
    ? users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProfession)
      )
    : users;

  const searchUsers = filteredUsers.filter((user) =>
    user.name.toLowerCase().includes(search)
  );

  const sortedUsers = _.orderBy(
    searchUsers,
    [currentSort.path],
    [currentSort.order]
  );

  const visibleUsers = paginate(sortedUsers, currentPage, pageSize);

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
    setSearch("");
  };

  const handleProfessionSelect = (profession) => {
    setSelectedProfession(profession);
    setSearch("");
  };

  const handleSort = (sort) => {
    setCurrentSort(sort);
  };

  const handleSearch = (query) => {
    setSelectedProfession(undefined);
    console.log(query);
    setSearch(query);
  };

  return (
    <>
      {visibleUsers.length > 0 ? (
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
            <Search search={search} setSearch={handleSearch} />
            {visibleUsers.length > 0 && (
              <UsersTable
                visibleUsers={visibleUsers}
                currentSort={currentSort}
                handleDelete={handleDelete}
                toggleBookmark={toggleBookmark}
                onSort={handleSort}
              />
            )}
            {visibleUsers.length >= 3 && (
              <div className="d-flex justify-content-center">
                <Pagination
                  itemsCount={filteredUsers.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePage}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Users;

import { useState, useEffect } from "react";
import SearchStatus from "../../ui/SearchStatus/SearchStatus";
import Search from "../../common/Search/Search";
import UsersTable from "../../ui/UsersTable/UsersTable";
import Filter from "../../common/Filter/Filter";
import Pagination from "../../common/Pagination/Pagination";
import _ from "lodash";
import { paginate } from "../../../utils/pagination";
import { useSelector } from "react-redux";
import {
  getProfessions,
  getProfessionsStatus,
} from "../../../store/professionsSlice";
import { getCurrentUserId, getUsers } from "../../../store/usersSlice";

const UsersListPage = () => {
  const users = useSelector(getUsers());
  const currentUserId = useSelector(getCurrentUserId());
  const professions = useSelector(getProfessions());
  const professionLoading = useSelector(getProfessionsStatus());

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfession, setSelectedProfession] = useState();
  const [currentSort, setCurrentSort] = useState({
    path: "name",
    order: "asc",
  });
  const [search, setSearch] = useState("");
  const pageSize = 2;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProfession]);

  const filterUsers = (data) => {
    const filteredUsers = selectedProfession
      ? data.filter(
          (user) =>
            JSON.stringify(user.profession) ===
            JSON.stringify(selectedProfession)
        )
      : data;
    return filteredUsers.filter((user) => user._id !== currentUserId);
  };

  const filteredUsers = filterUsers(users);


  const searchUsers = filteredUsers.filter((user) =>
    user.name.toLowerCase().includes(search)
  );


  const sortedUsers = _.orderBy(
    searchUsers,
    [currentSort.path],
    [currentSort.order]
  );

  const visibleUsers = paginate(sortedUsers, currentPage, pageSize);

  const handlePage = (page) => {
    setCurrentPage(page);
    setSearch("");
  };

  const handleProfessionSelect = (profession) => {
    setSelectedProfession(profession._id);
    setSearch("");
  };

  const handleSort = (sort) => {
    setCurrentSort(sort);
  };

  const handleSearch = (query) => {
    setSelectedProfession(undefined);
    setSearch(query);
  };

  return (
    <>
      {users.length > 0 ? (
        <>
          {professions && !professionLoading && (
            <div className="d-flex gap-5 p-3">
              <div className="d-flex flex-column gap-2">
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
                    onSort={handleSort}
                  />
                )}
                {visibleUsers.length >= 2 && (
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
          )}
        </>
      ) : (
        "Загрузка..."
      )}
    </>
  );
};

export default UsersListPage;

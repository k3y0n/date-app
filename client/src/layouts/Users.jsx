import { Navigate, useParams } from "react-router-dom";
import UserPage from "../components/page/UserPage/index";
import UsersListPage from "../components/page/UsersListPage/index";
import EditUserPage from "../components/page/EditUserPage/EditUserPage";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/usersSlice";
import UsersLoader from "../components/hoc/Loader/UsersLoader";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <UsersLoader>
      {userId ? (
        edit ? (
          currentUserId === userId ? (
            <EditUserPage />
          ) : (
            <Navigate to={`/users/${currentUserId}/edit`} />
          )
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </UsersLoader>
  );
};

export default Users;

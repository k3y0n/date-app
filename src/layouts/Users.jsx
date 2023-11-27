import { useParams } from "react-router-dom";
import UserPage from "../components/page/UserPage/index";
import UsersListPage from "../components/page/UsersListPage/index";
import EditUserPage from "../components/page/EditUserPage/EditUserPage";
import UserProvider from "../hooks/useUser";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            <EditUserPage userId={userId} />
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  );
};

export default Users;

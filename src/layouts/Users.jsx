import { useParams } from "react-router-dom";
import UserPage from "../components/page/UserPage/index";
import UsersListPage from "../components/page/UsersListPage/index";

const Users = () => {
  const params = useParams();
  const { userId } = params;
  return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>;
};

export default Users;

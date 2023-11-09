import { useParams } from "react-router-dom";
import UserPage from "./UserPage";
import Users from "../layouts/Users";

const UsersPage = () => {
  const params = useParams();
  const { userId } = params;
  return <>{userId ? <UserPage userId={userId} /> : <Users />}</>;
};

export default UsersPage;

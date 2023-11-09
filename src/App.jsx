import { Routes, Route } from "react-router-dom";
import Users from "./layouts/Users";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Navbar from "./components/Navbar";
import UserPage from "./page/UserPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />}>
          <Route path=":id" element={<UserPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

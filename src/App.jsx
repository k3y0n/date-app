import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Navbar from "./components/Navbar";
import UsersPage from "./page/UsersPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="users/:userId?" element={<UsersPage />} />
      </Routes>
    </>
  );
}

export default App;

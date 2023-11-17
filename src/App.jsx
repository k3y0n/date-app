import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Navbar from "./components/ui/Navbar/Navbar";
import Users from "./layouts/Users";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login/:type?" element={<Login />} />
        <Route path="users/:userId?/:edit?" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;

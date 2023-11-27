import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Navbar from "./components/ui/Navbar/Navbar";
import Users from "./layouts/Users";
import { ToastContainer } from "react-toastify";
import PorfessionProvider from "./hooks/useProfession";

function App() {
  return (
    <>
      <Navbar />
      <PorfessionProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login/:type?" element={<Login />} />
          <Route path="users/:userId?/:edit?" element={<Users />} />
        </Routes>
      </PorfessionProvider>
      <ToastContainer />
    </>
  );
}

export default App;

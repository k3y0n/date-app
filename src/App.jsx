import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Navbar from "./components/ui/Navbar/Navbar";
import Users from "./layouts/Users";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";
import LogOut from "./layouts/LogOut";
import "react-toastify/dist/ReactToastify.css";
import AppLoader from "./components/hoc/Loader/AppLoader";

function App() {
  return (
    <AppLoader>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login/:type?" element={<Login />} />
        <Route path="/logout" element={<ProtectedRoute component={LogOut} />} />
        <Route
          path="users/:userId?/:edit?"
          element={<ProtectedRoute component={Users} />}
        />
      </Routes>
      <ToastContainer autoClose={1500} />
    </AppLoader>
  );
}

export default App;

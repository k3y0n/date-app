import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Navbar from "./components/ui/Navbar/Navbar";
import Users from "./layouts/Users";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";
import LogOut from "./layouts/LogOut";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadQualityList } from "./store/qualitySlice";
import { loadProfessionList } from "./store/professionsSlice";
import { loadUserList } from "./store/usersSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQualityList());
    dispatch(loadProfessionList());
    dispatch(loadUserList());
  }, []);

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login/:type?" element={<Login />} />
          <Route path="/logout" element={<LogOut />} />
          <Route
            path="users/:userId?/:edit?"
            element={<ProtectedRoute component={Users} />}
          />
        </Routes>
      </AuthProvider>
      <ToastContainer autoClose={1500} />
    </>
  );
}

export default App;

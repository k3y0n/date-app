import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Navbar from "./components/ui/Navbar/Navbar";
import Users from "./layouts/Users";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";
import LogOut from "./layouts/LogOut";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadQualityList } from "./store/qualitySlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQualityList());
  }, []);

  return (
    <>
      <AuthProvider>
        <Navbar />
        <ProfessionProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="login/:type?" element={<Login />} />
            <Route path="/logout" element={<LogOut />} />
            <Route
              path="users/:userId?/:edit?"
              element={<ProtectedRoute component={Users} />}
            />
          </Routes>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer autoClose={1500} />
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Navbar from "./components/ui/Navbar/Navbar";
import Users from "./layouts/Users";
import { ToastContainer } from "react-toastify";
import PorfessionProvider from "./hooks/useProfession";
import QualityProvider from "./hooks/useQuality";

function App() {
  return (
    <>
      <Navbar />
      <PorfessionProvider>
        <QualityProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="login/:type?" element={<Login />} />
            <Route path="users/:userId?/:edit?" element={<Users />} />
          </Routes>
        </QualityProvider>
      </PorfessionProvider>
      <ToastContainer />
    </>
  );
}

export default App;

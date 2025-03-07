import { Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/public/Home";
import Services from "./pages/public/Services";
import AboutUs from "./pages/public/AboutUs";
import ContactUs from "./pages/public/ContactUs";
import SignUp from "./pages/public/SignUp";
import LogIn from "./pages/public/LogIn";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/admin/dashboard";
import AdminLayout from "./layout/AdminLayout";
import MallOwner from "./pages/admin/MallOwner";
import Mall from "./pages/admin/Mall";
import Settings from "./pages/admin/Settings";

function App() {
  const { isLoggedIn, isAdmin, isOwner, userData } = useAuth();
  console.log(isLoggedIn, isAdmin, isOwner, userData);
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="service" element={<Services />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="mall-owners" element={<MallOwner />} />
          <Route path="malls" element={<Mall />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

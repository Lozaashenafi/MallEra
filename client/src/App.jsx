import { Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/public/Home";
import Services from "./pages/public/Services";
import AboutUs from "./pages/public/AboutUs";
import ContactUs from "./pages/public/ContactUs";
import SignUp from "./pages/public/SignUp";
import LogIn from "./pages/public/LogIn";
import { useAuth } from "./Context/authContext";

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
      </Routes>
    </>
  );
}

export default App;

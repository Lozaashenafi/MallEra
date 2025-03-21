import { useState, useEffect, useContext, createContext } from "react";
import getAuth from "../utils/authHeader"; // Assuming this is your utility to get the authenticated user

// Create Auth Context
const AuthContext = createContext();

// AuthProvider to provide auth data to the app
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false); // Added for Owner role

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch authentication data from your utility
  const fetchData = async () => {
    try {
      const loggedInUser = await getAuth();
      console.log(loggedInUser);
      console.log("Logged-in user:", loggedInUser); // Debugging
      if (loggedInUser?.token) {
        setIsLoggedIn(true);
        if (loggedInUser.role == "ADMIN") {
          console.log(loggedInUser.role);
          setIsAdmin(true);
        } else if (loggedInUser.role == "MALL_OWNER") {
          setIsOwner(true);
        }
        const { userId, mallId, fullName, role, token, mallName } =
          loggedInUser;
        setUserData({
          userId,
          mallId,
          fullName,
          role,
          token,
          mallName,
        });
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  // Values passed through context
  const values = {
    isLoggedIn,
    setIsLoggedIn,
    isAdmin,
    isOwner, // Added to context values
    userData,
    setUserData,
    fetchData,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

// Custom hook to access auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Function to read the data from the user's local storage
const getAuth = async () => {
  // Get the token directly from localStorage
  const token = localStorage.getItem("token"); // This is a string, not an object
  let userData = {
    userId: "",
    mallId: "",
    fullName: "",
    role: "",
    mallName: "Mall Spot", // Default to "Mall Spot"
    token: token || null, // Use the token directly
  };

  if (token) {
    const decodedToken = await decodeTokenPayload(token); // Pass the token directly

    if (decodedToken) {
      userData.userId = decodedToken.userId;
      userData.fullName = decodedToken.fullName;
      userData.role = decodedToken.role;
      userData.mallId = decodedToken.mallId;
      userData.mallName = decodedToken.mallName || "Mall Spot"; // Use mallName from token or default to "Mall Spot"
      return userData;
    }
  }

  return {}; // Return an empty object if no token is found or token is invalid
};

const decodeTokenPayload = (token) => {
  try {
    const base64Url = token.split(".")[1]; // Extract payload part from JWT
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );

    const decoded = JSON.parse(jsonPayload);

    // Check if the token has expired
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decoded.exp && decoded.exp < currentTime) {
      console.log("Token expired");
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // Return null in case of error (invalid token format)
  }
};

export default getAuth;

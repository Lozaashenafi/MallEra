import express from "express";
import config from "./src/config/index.js"; // Add `.js` extension
import middleware from "./src/middleware/index.js"; // Add `.js` extension
import routes from "./src/route/index.js"; // Add `.js` extension

const app = express();

// Middleware
app.use(middleware);

// Routes
app.use("/api", routes);

// Start the server
const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

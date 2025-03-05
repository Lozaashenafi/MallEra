import dotenv from "dotenv";
dotenv.config(); // Load environment variables first

import express from "express";
import config from "./src/config/index.js";
import middleware from "./src/middleware/index.js";
import routes from "./src/route/index.js";

const app = express();

// Middleware
app.use(middleware);

// Routes
app.use("/api", routes);

// Start the server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

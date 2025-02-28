require("dotenv").config();
const path = require("path");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to MySQL Database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

app.get("/", (req, res) => {
  res.send("Welcome to the MallERA!");
});

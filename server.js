const path = require("path");
const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

const app = express();

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Spark-Hub" });
});

const ideasRouter = require("./routes/ideas");
app.use("/api/ideas", ideasRouter);

// Error handling middleware
app.listen(port, () => console.log(`Listening on port ${port}`));

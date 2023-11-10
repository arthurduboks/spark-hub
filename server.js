const express = require("express");
const port = 5000;

const app = express();

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

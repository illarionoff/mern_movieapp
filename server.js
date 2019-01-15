const express = require("express");
const mongoose = require("mongoose");
// Routes
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const movies = require("./routes/api/movies");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("hello world");
});

// User Routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/movies", movies);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on PORT ${port}`));

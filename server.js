const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
// Routes
const users = require("./routes/api/users");

const movies = require("./routes/api/movies");

// Init app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// User Routes
app.use("/api/users", users);

app.use("/api/movies", movies);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on PORT ${port}`));

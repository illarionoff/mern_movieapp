const express = require("express");
const router = express.Router();

// @route GET api/movies/test
// @desc Tests movies route
// @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Movies works" });
});

module.exports = router;

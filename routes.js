const express = require("express");
const router = express.Router();
const app = express();

router.get("/login", (req, res) => {
    res.render("login.ejs");
});

module.exports = router;
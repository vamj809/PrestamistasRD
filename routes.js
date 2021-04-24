const express = require("express");
const router = express.Router();
const app = express();

router.get("/", (req, res) => {
    res.render("login/index.ejs");
});

module.exports = router;
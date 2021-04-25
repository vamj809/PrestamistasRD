const express = require("express");
const router = express.Router();
const app = express();

router.get("/", (req, res) => {
    res.render("login.ejs");
});
router.get("/register-page",(req,res)=>{
    res.render("register-page.ejs");
})
router.get("/dashboard",(req,res)=>{
    res.render("dashboard.ejs");
})

module.exports = router;
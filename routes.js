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
router.get("/payments",(req,res)=>{
    res.render("payments.ejs");
})
router.get("/clients",(req,res)=>{
    res.render("clients.ejs");
})
router.get("/profile",(req,res)=>{
    res.render("profile.ejs");
})

module.exports = router;
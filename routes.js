const express = require("express");
const router = express.Router();
const app = express();

//Parse JSON into usable format.
//const bodyParser = require("body-parser");
//app.use(bodyParser.urlencoded({ extended: true }));

//Inicio de Sesion
const PrestamistasController = require('./controllers/controller.prestamistas');

router.get("/", (req, res) => {
    res.render("login.ejs");
});
//router.post("/", PrestamistasController.Authenticate);

//Registrar Usuario
router.get("/register-page", (req, res) => {
    res.render("register-page.ejs");
});

router.get("/page", (req, res) => {
    res.render("page.ejs");
});
//page options
router.get("/add-client", (req, res) => {
    res.render("add-client.ejs");
});
//router.post("/register-page", PrestamistasController.Create);

/* router.get("/dashboard", (req, res) => {
    res.render("dashboard.ejs");
})
router.get("/payments", (req, res) => {
    res.render("payments.ejs");
})
router.get("/clients", (req, res) => {
    res.render("clients.ejs");
})
router.get("/profile", (req, res) => {
    res.render("profile.ejs");
}) */

module.exports = router;
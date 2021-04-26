const express = require("express");
const router = express.Router();
const app = express();

//Inicio de Sesion
const PrestamistasController = require('./controllers/controller.prestamistas');

router.get("/", (req, res) => {
    res.render("login.ejs");
});

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
router.get("/success", (req, res) => {
    res.render("success.ejs");
});

module.exports = router;
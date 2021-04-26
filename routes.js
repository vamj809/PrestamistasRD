const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const app = express();

const PrestamistasController = require('./controllers/controller.prestamistas');
const ClientesController = require('./controllers/controller.clientes');
const PrestamosController = require('./controllers/controller.prestamos');

//Configuraciones para formato de requests y responses
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended : false}))

//Inicio de Sesion
router.get("/", (req, res) => {res.render("login.ejs");});
router.post("/", PrestamistasController.Authenticate);

//Registrar Usuario
router.get("/register-page", (req, res) => {res.render("register-page.ejs");});
router.post("/register-page", PrestamistasController.Create);

//Menu Principal [Page]
router.get("/page", (req, res) => {res.render("page.ejs");});

//Menu Utilities
router.get("/success", (req, res) => {res.render("success.ejs");});

//Operaciones del Cliente
router.get("/add-client", (req, res) => {res.render("add-client.ejs");});
router.post("/add-client", ClientesController.Create);
module.exports = router;
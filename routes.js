const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const app = express();

//Session Configuration
const session = require('express-session');
router.use(session({ secret: 'prestamistasrd', saveUninitialized: true, resave: true }));
var sess; //global session

const PrestamistasController = require('./controllers/controller.prestamistas');
const ClientesController = require('./controllers/controller.clientes');
const PrestamosController = require('./controllers/controller.prestamos');

//Configuraciones para formato de requests y responses
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

//Inicio de Sesion
router.get("/", (req, res) => {
    sess = req.session;
    res.render("login.ejs");
});
router.post("/", (req, res) => {
    sess = req.session;
    sess.username = req.body.email;
    PrestamistasController.Authenticate(req, res)
});

//Registrar Usuario
router.get("/register-page", (req, res) => { res.render("register-page.ejs"); });
router.post("/register-page", PrestamistasController.Create);

//Menu Principal [Page]
router.get("/page", (req, res) => {
    sess = req.session;
    if (sess.username) {
        res.render("page.ejs", { username: sess.username });
    } else {
        console.log('Acceso denegado: Debe iniciar sesion primero.');
        res.redirect('/logout');
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) { return console.error(err); }
        res.redirect('/');
    });
});

//Menu Utilities
router.get("/success", (req, res) => { res.render("success.ejs"); });

//Operaciones del Cliente
router.get("/add-client", (req, res) => { res.render("add-client.ejs"); });
router.post("/add-client", ClientesController.Create);

router.get("/list-clients", async (req, res) => {
    let ListaClientes = await ClientesController.GetAll();
    res.render("list-clients.ejs", {ListaClientes: ListaClientes}); });

//Prestamos
router.get("/add-loan", (req, res) => { res.render("add-loan.ejs"); });
router.get("/add-loan", PrestamosController.Create);
router.get("/list-loans", async (req, res) => {
    let ListaPrestamos = await PrestamosController.GetAll();
    res.render("list-loans.ejs", {ListaPrestamos: ListaPrestamos}); });

module.exports = sess;
module.exports = router;
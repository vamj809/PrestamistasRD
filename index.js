const port = 3000;
const express = require("express");

//requerir archivos con las rutas de la app
const routes = require("./routes");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//para leer archivos de css ubicados en views/public/assets
app.use('/public', express.static('views/public'));

//usar rutas
app.use(routes);

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto ", port);
});

//Reutilizar constante para otros módulos.
exports.app = app;
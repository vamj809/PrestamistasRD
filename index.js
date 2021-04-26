const port = 3000;
const express = require("express");
const routes = require("./routes");
const app = express();

//Establecer formato de requests y responses.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//para leer archivos de css ubicados en views/public/assets
app.use('/public', express.static('views/public'));

//usar rutas
app.use(routes);

app.listen(port, () => {
    console.log("Cliente se ejecuta en el puerto ", port);
});
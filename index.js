const port = 3000;
const express = require("express");
const routes = require("./routes");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(routes);
app.listen(port, () => {
    console.log("Servidor corriendo en el puerto ", port);
});
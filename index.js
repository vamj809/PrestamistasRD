const port = 3000;
const express = require("express");
const mongoose = require("mongoose");
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

//MONGODB CONFIG
const MONGODB_URI = "mongodb+srv://loaner:1234@myvmcluster.tec0x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI || 'mongodb://localhost/2800', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
})

//schemas
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    id: String,
    idPrestamista: String,
    nombre: String,
    cedula: String,
    telefono: String
});
//model
const client = mongoose.model("client", clientSchema);

//POST methods
app.post('/add-client', (req, res) => {
    let mng = "";
    const data = {
        id: Date.now().toString(),
        idPrestamista: "FALTA",
        nombre: req.body.name,
        cedula: req.body.cedula,
        telefono: req.body.phone
    }
    const newClient = new client(data);
    newClient.save((err) => {
        if (err) {
            console.log(":( El error: ", err);
            mng = "Ha ocurrido un error al conectarse a la base de datos."
        }
        else {
            console.log("Cliente creado!");
            mng = "El cliente ha sido creado exitosamente";
        }
    });
    res.render("success.ejs", {
        mng: mng
    });
});

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto ", port);
});
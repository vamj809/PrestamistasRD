const mongoose = require("mongoose");

//MONGODB CONFIG
const MONGODB_URI = "mongodb+srv://loaner:prestamistasrd@myvmcluster.tec0x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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

//Sugerencia: en vez de poner el post/get en la parte de base de datos, 
//      solo transformar la parte de "Get[Entidad]" y "Save[Entidad]" y no rehacer los métodos
//      GET, POST, etc.

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
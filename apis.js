const express=require("express");
const mongoose = require('mongoose');
const app=express();
const MONGODB_URI = 'mongodb+srv://loaner:prestamistasrd@myvmcluster.tec0x.mongodb.net/test';

mongoose.connect(MONGODB_URI || 'mongodb://localhost/2800', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
})

//Schema
const Schema = mongoose.Schema;
const PrestamistaSchema = new Schema({
    userName: String,
    displayName: String,
    email: String,
    passwordHash: String,
    passwordSalt: String,
    fechaCreacion: String,
    fechaUltimoAcceso: String,
    intentosFallidos: Number
});
const ClienteSchema = new Schema({
    id: String,
    idPrestamista: String,
    Nombre: String,
    Cedula: Number,
    Telefono: Number,
    Endeudado: Boolean
});
const PrestamoSchema = new Schema({
    id: String,
    idCliente: String,
    Monto: Number,
    Cuota: Number,
    ValorCuotas: Number,
    Interes: Number,
    MontoRestantes: Number,
    fechaPrestamo: String,
    fechaLimite: String
});

//POST methods

const getCliente = (data) => {
    const jsonData = fs.readFileSync('./localdb_test/cliente.json');
    return JSON.parse(jsonData)
}

const saveClientes = (data) => {
    const stringfyData = JSON.stringify(data);
    fs.writeFileSync('./localdb_test/cliente.json', stringfyData);
}
app.post('/add-client', (req, res) => {
    const clientes = req.body;
    if(clientes.name === "" || clientes.cedula === "" || clientes.phone === "")
    {
        return (res.status(404).send({success: false, msg: 'You left fields empty, check again'}))
    }
    const cliente = getCliente();
    const findExist = cliente.find(cli => cli.name === clientes.name || cli.cedula === clientes.cedula || cli.phone === clientes.phone);
    if(findExist)
    {
        return res.status(404).send({success: false, msg: 'Name, phone or social ID are already taken!'})
    }
    clientes.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    clientes.push(cliente);
    saveClientes(clientes);
    //res.send({success: true, msg: 'Cliente Creado!'});
    res.render("success.ejs",{
        mng:"Cliete creado exitosamente."
    });
});
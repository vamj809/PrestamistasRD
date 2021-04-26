const mongoose = require('mongoose');

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
    Cedula: String,
    Telefono: String,
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

const PagoSchema = new Schema({
    id: String,
    idPrestamo: String,
    Monto: Number,
    fechaPago: String

});

//Model
const Prestamista = mongoose.model('Prestamista', PrestamistaSchema);
const data1 = {
    userName: "vMontero",
    displayName: "Victor Montero",
    email: "1067196@est.intec.edu.do",
    passwordHash: "admin202101",
    passwordSalt: "vicmont0001",
    fechaUltimoAcceso: "23/03/2021",
    fechaCreacion: "15/03/2020",
    intentosFallidos: 0
}
const newPrestamista = new Prestamista(data1);
// newPrestamista.save((error) => {
//     if (error) {
//         console.log('Something went wrong');
//     } else {
//         console.log('Data has been saved!');
//     }
// });
//Route
// app.get('/Prest', (req, res) => {
//     Prestamista.find({ })
//         .then((data1) => {
//             console.log('Data: ', data1);
//             res.json(data1);
//         })
//         .catch((error) => {
//             console.log('error: ', datta)
//         })
// });

const Cliente = mongoose.model('Cliente', ClienteSchema);
const data2 = {
    id: "c10755",
    idPrestamista: "p0002",
    Nombre: "Pedro Rodriguez",
    Cedula: 001-7022589-5,
    Telefono: 829-914-0766,
    Endeudado: false
} 
const newCliente = new Cliente(data2);
// newCliente.save((error) => {
//     if (error) {
//         console.log('Something went wrong');
//     } else {
//         console.log('Data has been saved!');
//     }
// });
// app.get('/cli', (req, res) => {
//     Prestamista.find({ })
//         .then((data2) => {
//             console.log('Data: ', data2);
//             res.json(data2);
//         })
//         .catch((error) => {
//             console.log('error: ', datta)
//         })
// });

const Prestamo = mongoose.model('Prestamo', PrestamoSchema);
 const data3 = {
    id: "pr10544",
    idCliente: "c19314",
    Monto: 5000,
    Cuotas: 5,
    ValorCuotas: 1000,
    Interes: 0.5,
    montoRestante: 0,
    fechaPrestamo: "20/12/2020",
    fechaLimite: "20/6/2021"
} 
const newPrestamo = new Prestamo(data3);
// newPrestamo.save((error) => {
//     if (error) {
//         console.log('Something went wrong');
//     } else {
//         console.log('Data has been saved!');
//     }
// });
// app.get('/pres', (req, res) => {
//     Prestamista.find({ })
//         .then((data3) => {
//             console.log('Data: ', data3);
//             res.json(data3);
//         })
//         .catch((error) => {
//             console.log('error: ', datta)
//         })
// });

const Pago = mongoose.model('Pago', PagoSchema);
const data4 = {
    id: "pa11049",
    idPrestamo: "pr10544",
    Monto: 1000,
    fechaPago: "20/12/2020"
}
const newPago = new Pago(data4);
// newPago.save((error) => {
//     if (error) {
//         console.log('Something went wrong');
//     } else {
//         console.log('Data has been saved!');
//     }
// });
// app.get('/pag', (req, res) => {
//     Prestamista.find({ })
//         .then((data4) => {
//             console.log('Data: ', data4);
//             res.json(data4);
//         })
//         .catch((error) => {
//             console.log('error: ', datta)
//         })
// });

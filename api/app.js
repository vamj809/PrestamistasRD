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


const express = require('express');
const fs = require('fs');

const app = express();

//parse request body
app.use(express.json())
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/prestamista/create', (req, res) => {
    const prestamista = req.body;
   //validate prestamista
   if(prestamista.userName == '' || prestamista.passwordHash == '' || prestamista.passwordSalt == '' || prestamista.displayName == '' || prestamista.email == '')
   {
       return (res.status(404).send({success: false, msg: 'You left fields empty, check again'}))
   }
   //verify if prestamista exist
   const ListaPrestamistas = getPrestamistas();
   const findExist = ListaPrestamistas.find(prest => prest.userName === prestamista.userName || prest.displayName === prestamista.displayName || prest.email === prestamista.email);
   if(findExist)
   {
       return res.status(404).send({success: false, msg: 'Username, displayName or email are already taken!'})
   }
    //create prestamista
    prestamista.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    //save created prestamista
    ListaPrestamistas.push(prestamista);
    savePrestamistas(ListaPrestamistas);
    //show messages
    res.send({success: true, msg: 'Prestamista Creado!'});

})
app.post('/add-client', (req, res) => {
    const cliente = req.body;
    if(cliente.name === "" || cliente.cedula === "" || cliente.phone === "")
    {
        return (res.status(404).send({success: false, msg: 'You left fields empty, check again'}))
    }
    const ListaClientes = getCliente();
    const findExist = ListaClientes.find(cli => cli.name === cliente.name || cli.cedula === cliente.cedula || cli.phone === cliente.phone);
    if(findExist)
    {
        return res.status(404).send({success: false, msg: 'Name, phone or social ID are already taken!'})
    }
    cliente.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    ListaClientes.push(cliente);
    saveClientes(ListaClientes);
    res.send({success: true, msg: 'Cliente Creado!'});
});

app.post('/prestamo/create', (req, res) => {
    const prestamo = req.body;
    if(prestamo.idCliente == "" || prestamo.Monto == "" || prestamo.Cuotas == "" || prestamo.ValorCuotas == "" || prestamo.Interes == "" || prestamo.montoRestantes == "" || prestamo.fechaPrestamo == "" || prestamo.fechaLimite == "")
    {
        return (res.status(404).send({success: false, msg: 'You left fields empty, check again'}))
    }
    const ListaPrestamos = getPrestamo();
    // const findExist = ListaPrestamos.find(pre => pre.idCliente === prestamos.idCliente);
    // if(findExist)
    // {
    //     return res.status(404).send({success: false, msg: 'idCliente is already taken!'})
    // }
    prestamo.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    ListaPrestamos.push(prestamo);
    savePrestamos(ListaPrestamos);
    res.send({success: true, msg: 'Prestamo Creado!'});
})

app.post('/pago/create', (req, res) => {
    const pago = req.body;
    if(pago.idPrestamo == "" || pago.Monto == "" || pago.fechaPago == "")
    {
        return (res.status(404).send({success: false, msg: 'You left fields empty, check again'}))
    }
    const ListaPagos = getPago();
    const findExist = ListaPagos.find(pag => pago.idPrestamo === pago.idPrestamo);
    if(findExist)
    {
        return res.status(404).send({success: false, msg: 'idPrestamo is already taken!'})
    }
    pago.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    ListaPagos.push(pago);
    savePagos(ListaPagos);
    res.send({success: true, msg: 'Pago Creado!'});
})

app.patch('/prestamista/update', (req, res) => {
    const userName = req.body.userName;
    const displayName = req.body;
    const prestamista = getPrestamistas();
    var findExist = prestamista.find(prest => prest.userName === userName);
    if(!findExist)
    {
        return res.status(404).send({success: false, msg: 'Prestamista no existe.'})
    }
    const updatePrestamista = prestamista.filter(prest.userName === userName);
    updatePrestamista.push(prestamista);
    res.send({success: true, msg: 'Prestamista ha sido actualizado.'});
})
app.patch('/cliente/update', (req, res) => {
    const id = req.body.id;
    const Nombre = req.body;
    const cliente = getCliente();
    var findExist = cliente.find(cli => cli.id === id);
    if(!findExist)
    {
        return res.status(404).send({success: false, msg: 'Cliente no existe.'})
    }
    const updateCliente = cliente.filter(cli.id === id);
    updateCliente.push(cliente);
    res.send({success: true, msg: 'Cliente ha sido actualizado.'});
})
app.patch('/prestamo/update', (req, res) => {
    const id = req.body.id;
    const idCliente = req.body;
    const prestamo = getPrestamo();
    var findExist = prestamo.find(pre => pre.id === id);
    if(!findExist)
    {
        return res.status(404).send({success: false, msg: 'Prestamo no existe.'})
    }
    const updatePrestamo = prestamo.filter(pre.id === id);
    updatePrestamo.push(prestamo);
    res.send({success: true, msg: 'Prestamo ha sido actualizado.'});
})
app.patch('/pago/update', (req, res) => {
    const id = req.body.id;
    const idPrestamo = req.body;
    const pago = getPago();
    var findExist = pago.find(pag => pag.id === id);
    if(!findExist)
    {
        return res.status(404).send({success: false, msg: 'Pago no existe.'})
    }
    const updatePago = pago.filter(pag.id === id);
    updatePago.push(pago);
    res.send({success: true, msg: 'Pago ha sido actualizado.'});
})

app.delete('/prestamista/delete', (req, res) => {
    const userName = req.body.userName;
    const prestamista = getPrestamistas();
    const filter = prestamista.filter(prest => prest.userName === userName);
    if(prestamista.length === filter.length)
    {
        return res.status(404).send({success: false, msg: 'El prestamista no existe.'})
    }
    savePrestamistas(filter);
    res.send({success: true, msg: "prestamista eliminado satisfactoriamente!"})
})
app.delete('/cliente/delete', (req, res) => {
    const id = req.body.id;
    const cliente = getClientes();
    const filter = cliente.filter(cli => cli.id === id);
    if(cliente.length === filter.length)
    {
        return res.status(404).send({success: false, msg: 'El cliente no existe.'})
    }
    saveClientes(filter);
    res.send({success: true, msg: "cliente eliminado satisfactoriamente!"})
})
app.delete('/prestamo/delete', (req, res) => {
    const id = req.body.id;
    const prestamo = getPrestamos();
    const filter = prestamo.filter(pre => pre.id === id);
    if(prestamo.length === filter.length)
    {
        return res.status(404).send({success: false, msg: 'El prestamo no existe.'})
    }
    savePrestamos(filter);
    res.send({success: true, msg: "prestamo eliminado satisfactoriamente!"})
})
app.delete('/pago/delete', (req, res) => {
    const id = req.body.id;
    const pago = getPagos();
    const filter = pago.filter(pag => pag.id === id);
    if(pago.length === filter.length)
    {
        return res.status(404).send({success: false, msg: 'El pago no existe.'})
    }
    savePagos(filter);
    res.send({success: true, msg: "pago eliminado satisfactoriamente!"})
})

app.get('/prestamista/list', (req, res) => {
    const prestamista = getPrestamistas();
    res.send(prestamista);
})

const getPrestamistas = (data) => {
    const jsonData = fs.readFileSync('./localdb_test/prestamista.json');
    return JSON.parse(jsonData)
}

app.get('/cliente/list', (req, res) => {
    const cliente = getCliente();
    res.send(cliente);
})

const getCliente = (data) => {
    const jsonData = fs.readFileSync('./localdb_test/cliente.json');
    return JSON.parse(jsonData)
}

app.get('/prestamo/list', (req, res) => {
    const prestamo = getPrestamo();
    res.send(prestamo);
})

const getPrestamo = (data) => {
    const jsonData = fs.readFileSync('./localdb_test/prestamo.json');
    return JSON.parse(jsonData)
}

app.get('/pago/list', (req, res) => {
    const pago = getPago();
    res.send(prestamo);
})

const getPago = (data) => {
    const jsonData = fs.readFileSync('./localdb_test/pago.json');
    return JSON.parse(jsonData)
}

const savePrestamistas = (data) => {
    const stringfyData = JSON.stringify(data);
    fs.writeFileSync('./localdb_test/prestamista.json', stringfyData);
}

const saveClientes = (data) => {
    const stringfyData = JSON.stringify(data);
    fs.writeFileSync('./localdb_test/cliente.json', stringfyData);
}

const savePrestamos = (data) => {
    const stringfyData = JSON.stringify(data);
    fs.writeFileSync('./localdb_test/prestamo.json', stringfyData);
}

const savePagos = (data) => {
    const stringfyData = JSON.stringify(data);
    fs.writeFileSync('./localdb_test/pago.json', stringfyData);
}


//configure the server port
app.listen(2800, () => {
    console.log('Server is running on port 2800')
}) 
require('./database')

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const app = express();

//parse request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
const url = require('url');

//////////////////////////////////////////////////////////////////
/////////////////////  CREATE - POST Methods /////////////////////
//////////////////////////////////////////////////////////////////

app.post('/prestamista/create', (req, res) => {
    //If request comes in Json get Json else get request from URL
    const prestamista = url.parse(req.url,true).query ? url.parse(req.url,true).query : req.body;
    
    //validate prestamista
    if(prestamista.userName == '' || prestamista.passwordHash == '' || prestamista.passwordSalt == '' || prestamista.displayName == '' || prestamista.email == '')
    {
        console.log('You left fields empty, check again');
        return (res.status(404).send({success: false, message: 'You left fields empty, check again'}))
    }
    //verify if prestamista exist
    const ListaPrestamistas = getPrestamistas();
    const findExist = ListaPrestamistas.find(prest => prest.userName === prestamista.userName || prest.displayName === prestamista.displayName || prest.email === prestamista.email);
    if(findExist)
    {
        console.log('Username, displayName or email are already taken!');
        return res.status(404).send({success: false, message: 'Username, displayName or email are already taken!'})
    }
    //create prestamista
    prestamista.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    //save created prestamista
    ListaPrestamistas.push(prestamista);
    savePrestamistas(ListaPrestamistas);
    //show messages
    res.send({success: true, message: 'Prestamista Creado!'});

})
app.post('/cliente/create', (req, res) => {
    //If request comes in Json get Json else get request from URL
    const cliente = url.parse(req.url,true).query ? url.parse(req.url,true).query : req.body;
    
    if(cliente.Nombre === "" || cliente.Cedula === "" || cliente.Telefono === "")
    {
        return (res.status(404).send({success: false, message: 'You left fields empty, check again'}))
    }
    const ListaClientes = getCliente();
    const findExist = ListaClientes.find(cli => cli.Nombre === cliente.Nombre && cli.Cedula === cliente.Cedula && cli.Telefono === cliente.Telefono);
    if(findExist)
    {
        return res.status(404).send({success: false, message: 'Name, phone or social ID are already taken!'})
    }
    cliente.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    ListaClientes.push(cliente);
    saveClientes(ListaClientes);
    res.send({success: true, message: 'Cliente Creado!'});
});

app.post('/prestamo/create', (req, res) => {
    //If request comes in Json get Json else get request from URL
    const prestamo = url.parse(req.url,true).query ? url.parse(req.url,true).query : req.body;
    if(prestamo.idCliente == "" || prestamo.Monto == "" || prestamo.Cuotas == "" || prestamo.ValorCuotas == "" || prestamo.Interes == "" || prestamo.montoRestantes == "" || prestamo.fechaPrestamo == "" || prestamo.fechaLimite == "")
    {
        return (res.status(404).send({success: false, message: 'You left fields empty, check again'}))
    }
    const ListaPrestamos = getPrestamo();
    // const findExist = ListaPrestamos.find(pre => pre.idCliente === prestamos.idCliente);
    // if(findExist)
    // {
    //     return res.status(404).send({success: false, message: 'idCliente is already taken!'})
    // }
    prestamo.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    ListaPrestamos.push(prestamo);
    savePrestamos(ListaPrestamos);
    res.send({success: true, message: 'Prestamo Creado!'});
})

app.post('/pago/create', (req, res) => {
    //If request comes in Json get Json else get request from URL
    const pago = url.parse(req.url,true).query ? url.parse(req.url,true).query : req.body;

    if(pago.idPrestamo == "" || pago.Monto == "" || pago.fechaPago == "")
    {
        return (res.status(404).send({success: false, message: 'You left fields empty, check again'}))
    }
    const ListaPagos = getPago();
    const findExist = ListaPagos.find(pag => pago.idPrestamo === pago.idPrestamo);
    if(findExist)
    {
        return res.status(404).send({success: false, message: 'idPrestamo is already taken!'})
    }
    pago.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    ListaPagos.push(pago);
    savePagos(ListaPagos);
    res.send({success: true, message: 'Pago Creado!'});
})

//////////////////////////////////////////////////////////////////
/////////////////////  UPDATE - PATCH Methods ////////////////////
//////////////////////////////////////////////////////////////////

app.patch('/prestamista/update', (req, res) => {
    const userName = req.body.userName;
    const displayName = req.body;
    const prestamista = getPrestamistas();
    var findExist = prestamista.find(prest => prest.userName === userName);
    if(!findExist)
    {
        return res.status(404).send({success: false, message: 'Prestamista no existe.'})
    }
    const updatePrestamista = prestamista.filter(prest.userName === userName);
    updatePrestamista.push(prestamista);
    res.send({success: true, message: 'Prestamista ha sido actualizado.'});
})
app.patch('/cliente/update', (req, res) => {
    const id = req.body.id;
    const Nombre = req.body;
    const cliente = getCliente();
    var findExist = cliente.find(cli => cli.id === id);
    if(!findExist)
    {
        return res.status(404).send({success: false, message: 'Cliente no existe.'})
    }
    const updateCliente = cliente.filter(cli.id === id);
    updateCliente.push(cliente);
    res.send({success: true, message: 'Cliente ha sido actualizado.'});
})
app.patch('/prestamo/update', (req, res) => {
    const id = req.body.id;
    const idCliente = req.body;
    const prestamo = getPrestamo();
    var findExist = prestamo.find(pre => pre.id === id);
    if(!findExist)
    {
        return res.status(404).send({success: false, message: 'Prestamo no existe.'})
    }
    const updatePrestamo = prestamo.filter(pre.id === id);
    updatePrestamo.push(prestamo);
    res.send({success: true, message: 'Prestamo ha sido actualizado.'});
})
app.patch('/pago/update', (req, res) => {
    const id = req.body.id;
    const idPrestamo = req.body;
    const pago = getPago();
    var findExist = pago.find(pag => pag.id === id);
    if(!findExist)
    {
        return res.status(404).send({success: false, message: 'Pago no existe.'})
    }
    const updatePago = pago.filter(pag.id === id);
    updatePago.push(pago);
    res.send({success: true, message: 'Pago ha sido actualizado.'});
})

//////////////////////////////////////////////////////////////////
/////////////////////////  DELETE Methods ////////////////////////
//////////////////////////////////////////////////////////////////

app.delete('/prestamista/delete', (req, res) => {
    const userName = req.body.userName;
    const prestamista = getPrestamistas();
    const filter = prestamista.filter(prest => prest.userName === userName);
    if(prestamista.length === filter.length)
    {
        return res.status(404).send({success: false, message: 'El prestamista no existe.'})
    }
    savePrestamistas(filter);
    res.send({success: true, message: "prestamista eliminado satisfactoriamente!"})
})
app.delete('/cliente/delete', (req, res) => {
    const id = req.body.id;
    const cliente = getClientes();
    const filter = cliente.filter(cli => cli.id === id);
    if(cliente.length === filter.length)
    {
        return res.status(404).send({success: false, message: 'El cliente no existe.'})
    }
    saveClientes(filter);
    res.send({success: true, message: "cliente eliminado satisfactoriamente!"})
})
app.delete('/prestamo/delete', (req, res) => {
    const id = req.body.id;
    const prestamo = getPrestamos();
    const filter = prestamo.filter(pre => pre.id === id);
    if(prestamo.length === filter.length)
    {
        return res.status(404).send({success: false, message: 'El prestamo no existe.'})
    }
    savePrestamos(filter);
    res.send({success: true, message: "prestamo eliminado satisfactoriamente!"})
})
app.delete('/pago/delete', (req, res) => {
    const id = req.body.id;
    const pago = getPagos();
    const filter = pago.filter(pag => pag.id === id);
    if(pago.length === filter.length)
    {
        return res.status(404).send({success: false, message: 'El pago no existe.'})
    }
    savePagos(filter);
    res.send({success: true, message: "pago eliminado satisfactoriamente!"})
})

//////////////////////////////////////////////////////////////////
////////////////////////  GET ALL Methods ////////////////////////
//////////////////////////////////////////////////////////////////

app.get('/prestamista/list', (req, res) => {
    const prestamista = getPrestamistas();
    res.send(prestamista);
})

app.get('/cliente/list', (req, res) => {
    const cliente = getCliente();
    res.send(cliente);
})

app.get('/prestamo/list', (req, res) => {
    const prestamo = getPrestamo();
    res.send(prestamo);
})

app.get('/pago/list', (req, res) => {
    const pago = getPago();
    res.send(prestamo);
})

//////////////////////////////////////////////////////////////////
/////////////////////  GET DATA FUNCTIONS  ///////////////////////
//////////////////////////////////////////////////////////////////

const getPrestamistas = (data) => {
    const jsonData = fs.readFileSync(__dirname + '/localdb_test/prestamista.json');
    return JSON.parse(jsonData)
}
const getCliente = (data) => {
    const jsonData = fs.readFileSync(__dirname + '/localdb_test/cliente.json');
    return JSON.parse(jsonData)
}

const getPrestamo = (data) => {
    const jsonData = fs.readFileSync(__dirname + '/localdb_test/prestamo.json');
    return JSON.parse(jsonData)
}

const getPago = (data) => {
    const jsonData = fs.readFileSync(__dirname + '/localdb_test/pago.json');
    return JSON.parse(jsonData)
}

//////////////////////////////////////////////////////////////////
////////////////////  SAVE DATA FUNCTIONS  ///////////////////////
//////////////////////////////////////////////////////////////////

const savePrestamistas = (data) => {
    const stringfyData = JSON.stringify(data);
    fs.writeFileSync(__dirname + '/localdb_test/prestamista.json', stringfyData);
}

const saveClientes = (data) => {
    const stringfyData = JSON.stringify(data);
    fs.writeFileSync(__dirname + '/localdb_test/cliente.json', stringfyData);
}

const savePrestamos = (data) => {
    const stringfyData = JSON.stringify(data);
    fs.writeFileSync(__dirname + '/localdb_test/prestamo.json', stringfyData);
}

const savePagos = (data) => {
    const stringfyData = JSON.stringify(data);
    fs.writeFileSync(__dirname + '/localdb_test/pago.json', stringfyData);
}

//////////////////////////////////////////////////////////////////
///////////////////  SERVER CONFIGURATION  ///////////////////////
//////////////////////////////////////////////////////////////////

//configure the server port
app.listen(2800, () => {
    console.log('Server is running on port 2800')
}) 
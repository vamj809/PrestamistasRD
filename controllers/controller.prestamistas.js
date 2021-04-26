const { response } = require('express');
const model = require('../models/model.prestamistas');
const basecontroller = require('./controller.base');
const URL_Params = basecontroller.URL.Prestamista;
const Prestamista = {}

Prestamista.Authenticate = async (req, res) => {
    try {
        var email = req.body.email;
        var password = req.body.password;

        RequestData = await Prestamista.GetAll();
        var getResult = RequestData.data.find(obj => obj.email == email && obj.passwordSalt == password);

        if(getResult){
            res.redirect('/page');
        } else {
            res.send("Usuario y/o contraseña incorrecta. Vuelva a intentarlo otra vez");
        }

    } catch(error) {
        console.log(error.message);
        res.send("Error del servidor. Vuelva a intentarlo");
    }
}

Prestamista.Create = async function Create(name, lastname, email, password){
    let res = await basecontroller.Create(URL_Params, {
        displayname: lastname + ', ' + name,
        email: email,
        password: password
    });

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Prestamista.GetAll = async function GetAll(){
    let res = await basecontroller.ReadAll(URL_Params);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Prestamista.Get = async function Get(id){
    let res = await basecontroller.Read(URL_Params, id);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Prestamista.Update = async function Update(prestamista){
    let res = await basecontroller.Update(URL_Params, {
        _id:prestamista.id,
        userName: prestamista.userName,
        displayname: prestamista.displayname,
        email: prestamista.email,
        password: prestamista.password,
        attemptFails: 0
    });

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Prestamista.Delete = async function Delete(id){
    let res = await basecontroller.Update(URL_Params, id);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

module.exports = Prestamista;
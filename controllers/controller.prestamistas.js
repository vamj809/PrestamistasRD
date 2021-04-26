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
            req.session.userid = getResult._id;
            res.redirect('/page');
        } else {
            res.send("Usuario y/o contraseña incorrecta. Vuelva a intentarlo otra vez");
        }

    } catch(error) {
        console.log(error.message);
        res.send("Error del servidor. Vuelva a intentarlo");
    }
}

Prestamista.Create = async (req, res) => {
    try {
        let response = await basecontroller.Create(URL_Params, {
            username: req.body.email,
            displayname: req.body.lastname + ', ' + req.body.firstname,
            email: req.body.email,
            passwordHash: 'demo',
            passwordSalt: req.body.password
        });

        if(response.data.success){
            res.redirect('/');
        } else{
            throw Error(response.data);
        }
        return response;

    } catch(error) {
        console.log(error.message);
        res.send("Error del servidor. Vuelva a intentarlo: " + error.message);
    }
}

Prestamista.GetAll = async function GetAll(){
    let res = await basecontroller.ReadAll(URL_Params);
    return res;
}

// Prestamista.Get = async function Get(id){
//     let res = await basecontroller.Read(URL_Params, id);

//     console.log(res.status);
//     console.log(res.data);
    
//     return res;
// }

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
    let res = await basecontroller.Delete(URL_Params, id);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

module.exports = Prestamista;
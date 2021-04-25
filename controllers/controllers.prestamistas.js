const model = require('../models/model.prestamistas');
const basecontroller = require('./controller.base');
const URL_Params = '/Prestamistas';
const Prestamista = {}

Prestamista.Authenticate = async function AuthenticateUser(req, res) {
    try {
        let res = await basecontroller.Auth(URL_Params, {
            user : req.body.email,
            password: req.body.password
        });
    
        return res;
    } catch(error) {
        return res.status(500)({success: false, message: error.message});
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

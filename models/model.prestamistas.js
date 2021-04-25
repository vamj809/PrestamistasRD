import config from '../config/api.config';
const basemodel = require('./model.base');

const URL_Params = '/Prestamistas';

//TO-DO: Abstraer el module.exports para uso genérico de los distintos modelos y 
//       poder facilitar la extensión del mismo. #SOLID.

var Prestamista = function(_prestamista) {
    //TODO: Crear Prestamista [Actualizar atributos en base a definido en arquitectura]
    this._id = _prestamista._id;
    this.userName = _prestamista.userName;
    this.displayName = _prestamista.displayName;
    this.email = _prestamista.email;
    this.passwordHash = _prestamista.passwordHash;
    this.passwordSalt = _prestamista.passwordSalt;
    this.lastAccessDate = _prestamista.lastAccessDate;
    this.createdAt = _prestamista.createdAt;
    this.createdBy = _prestamista.createdBy;
    this.attemptFails = _prestamista.attemptFails;
};

async function AuthenticateUser(email, password) {
    let res = await basemodel.Auth(URL_Params, {
        user : email,
        password: password
    });

    console.log(res.status);
    console.log(res.data);

    return res;
}

async function Create(name, lastname, email, password){
    let res = await basemodel.Create(URL_Params, {
        displayname: lastname + ', ' + name,
        email: email,
        password: password
    });

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

async function Get(id){
    let res = await basemodel.Read(URL_Params, id);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

async function Update(prestamista){
    let res = await basemodel.Update(URL_Params, {
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

async function Delete(id){
    let res = await basemodel.Update(URL_Params, id);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}
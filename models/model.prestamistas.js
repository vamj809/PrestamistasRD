//ApiSettings
const basemodel = require('./model.base');
const URL_Params = '/Prestamistas';

//TO-DO: Abstraer el module.exports para uso genérico de los distintos modelos y 
//       poder facilitar la extensión del mismo. #SOLID.

var Prestamista = function(_prestamista) {
    //TODO: Crear Prestamista [Actualizar atributos en base a definido en arquitectura]
    this._id = _prestamista._id;
    this.usuario = _prestamista.usuario;
    this.nombre = _prestamista.nombre;
    this.email = _prestamista.email;
    this.passwordHash = _prestamista.passwordHash;
    this.passwordSalt = _prestamista.passwordSalt;
    this.fechaUltimoAcceso = _prestamista.fechaUltimoAcceso;
    this.fechaCreacion = _prestamista.fechaCreacion;
    this.intentosFallidos = _prestamista.intentosFallidos;
};

Prestamista.Authenticate = async function AuthenticateUser(email, password) {
    let res = await basemodel.Auth(URL_Params, {
        user : email,
        password: password
    });

    console.log(res.status);
    console.log(res.data);

    return res;
}

Prestamista.Create = async function Create(name, lastname, email, password){
    let res = await basemodel.Create(URL_Params, {
        displayname: lastname + ', ' + name,
        email: email,
        password: password
    });

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Prestamista.Get = async function Get(id){
    let res = await basemodel.Read(URL_Params, id);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Prestamista.Update = async function Update(prestamista){
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

Prestamista.Delete = async function Delete(id){
    let res = await basemodel.Update(URL_Params, id);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

module.exports = Prestamista;
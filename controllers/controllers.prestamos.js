const model = require('../models/model.prestamos');
const basecontroller = require('./controller.base');
const URL_Params = basecontroller.URL.Prestamos;
const Prestamos = {}

Prestamo.Create = async function Create(prestamo){
    let res = await basecontroller.Create(URL_Params, prestamo);
    return res;
}

Prestamo.Get = async function Get(id){
    let res = await basecontroller.Read(URL_Params, id);
    return res;
}


Prestamo.GetAll = async function GetAll(){
    let res = await basecontroller.ReadAll(URL_Params);
    return res;
}

Prestamo.Update = async function Update(prestamo){
    let res = await basecontroller.Update(URL_Params, prestamo);
    return res;
}

Prestamo.Delete = async function Delete(id){
    let res = await basecontroller.Update(URL_Params, id);
    return res;
}

module.exports = Prestamo;
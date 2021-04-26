const model = require('../models/model.prestamistas');
const basecontroller = require('./controller.base');
const URL_Params = basecontroller.URL.Pagos;
const Pago = {}

Pago.Create = async function Create(pago){
    let res = await basecontroller.Create(URL_Params, pago);
    return res;
}

Pago.Get = async function Get(id){
    let res = await basecontroller.Read(URL_Params, id);
    return res;
}


Pago.GetAll = async function GetAll(){
    let res = await basecontroller.ReadAll(URL_Params);
    return res;
}

Pago.Update = async function Update(pago){
    let res = await basecontroller.Update(URL_Params, pago);
    return res;
}

Pago.Delete = async function Delete(id){
    let res = await basecontroller.Update(URL_Params, id);
    return res;
}

module.exports = Pago;
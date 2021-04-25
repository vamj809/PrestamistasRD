//ApiSettings
const basemodel = require('./model.base');
const URL_Params = '/Pagos';

var Pago = function(_pago) {
    //TODO: Crear Prestamista [Actualizar atributos en base a definido en arquitectura]
    this._id = _pago._id;
    this.idPrestamo = _pago.idPrestamo;
    this.monto = _pago.monto;
    this.fechaPago = _pago.fechaPago;
};

Pago.Create = async function Create(pago){
    let res = await basemodel.Create(URL_Params, pago);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Pago.Get = async function Get(id){
    let res = await basemodel.Read(URL_Params, id);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}


Pago.GetAll = async function GetAll(){
    let res = await basemodel.ReadAll(URL_Params);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Pago.Update = async function Update(pago){
    let res = await basemodel.Update(URL_Params, pago);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Pago.Delete = async function Delete(id){
    let res = await basemodel.Update(URL_Params, id);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

module.exports = Pago;
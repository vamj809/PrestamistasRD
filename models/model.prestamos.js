//ApiSettings
const basemodel = require('./model.base');
const URL_Params = '/Prestamos';

var Prestamo = function(_prestamos) {
    //TODO: Crear Prestamista [Actualizar atributos en base a definido en arquitectura]
    this._id = _prestamos._id;
    this.idCliente = _prestamos.idCliente;
    this.monto = _prestamos.monto;
    this.cuotas = _prestamos.cuotas;
    this.valorCuotas = _prestamos.valorCuotas;
    this.interes = _prestamos.interes;
    this.montoRestante = _prestamos.montoRestante;
    this.fechaPrestamo = _prestamos.fechaPrestamo;
    this.fechaLimite = _prestamos.fechaLimite;
};

Prestamo.Create = async function Create(prestamo){
    let res = await basemodel.Create(URL_Params, prestamo);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Prestamo.Get = async function Get(id){
    let res = await basemodel.Read(URL_Params, id);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}


Prestamo.GetAll = async function GetAll(){
    let res = await basemodel.ReadAll(URL_Params);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Prestamo.Update = async function Update(prestamo){
    let res = await basemodel.Update(URL_Params, prestamo);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Prestamo.Delete = async function Delete(id){
    let res = await basemodel.Update(URL_Params, id);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

module.exports = Prestamo;
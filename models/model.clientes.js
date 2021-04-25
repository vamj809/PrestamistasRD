//ApiSettings
const basemodel = require('./model.base');
const URL_Params = '/Clientes';

var Cliente = function(_cliente) {
    //TODO: Crear Prestamista [Actualizar atributos en base a definido en arquitectura]
    this._id = _cliente._id;
    this.idPrestamista = _cliente.idPrestamista;
    this.nombre = _cliente.nombre;
    this.cedula = _cliente.cedula;
    this.telefono = _cliente.telefono;
    this.endeudado = _cliente.endeudado;
};

Cliente.Create = async function Create(cliente){
    let res = await basemodel.Create(URL_Params, cliente);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Cliente.Get = async function Get(id){
    let res = await basemodel.Read(URL_Params, id);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Cliente.GetAll = async function GetAll(){
    let res = await basemodel.ReadAll(URL_Params);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Cliente.Update = async function Update(cliente){
    let res = await basemodel.Update(URL_Params, cliente);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Cliente.Delete = async function Delete(id){
    let res = await basemodel.Update(URL_Params, id);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

module.exports = Cliente;
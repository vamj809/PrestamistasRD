const model = require('../models/model.clientes');
const basecontroller = require('./controller.base');
const URL_Params = basecontroller.URL.Clientes;
const Cliente = {}

Cliente.Create = async (req, res) => {
    try {
        let res = await basecontroller.Create(URL_Params, req.body);

        if(res.data.success){
            res.redirect('/');
        } else{
            throw Error(res.data);
        }
        return res;

    } catch(error) {
        console.log(error.message);
        res.send("Error del servidor. Vuelva a intentarlo");
    }
}

Cliente.Get = async function Get(id){
    let res = await basecontroller.Read(URL_Params, id);
    return res;
}

Cliente.GetAll = async function GetAll(){
    let res = await basecontroller.ReadAll(URL_Params);
    return res;
}

Cliente.Update = async function Update(cliente){
    let res = await basecontroller.Update(URL_Params, cliente);
    return res;
}

Cliente.Delete = async function Delete(id){
    let res = await basecontroller.Update(URL_Params, id);
    return res;
}

module.exports = Cliente;
const basecontroller = require('./controller.base');
const URL_Params = basecontroller.URL.Clientes;
const Cliente = {}

Cliente.Create = async (req, res) => {
    try {
        var sess = req.session;
        var _cliente = {
            idPrestamista : sess.userid,
            Nombre : req.body.name,
            Cedula : req.body.cedula,
            Telefono: req.body.phone,
            Endeudado : false
        }
        let response = await basecontroller.Create(URL_Params, _cliente);

        if(response.data.success){
            res.redirect('/page');
        } else{
            throw Error(res.data);
        }
        return response;

    } catch(error) {
        console.log(error.message);
        res.send("Error del servidor. Vuelva a intentarlo: " + error.message);
    }
}

// Cliente.Get = async function Get(id){
//     let res = await basecontroller.Read(URL_Params, id);
//     return res;
// }

Cliente.GetAll = async (req, res) => {
    let response = await basecontroller.ReadAll(URL_Params);
    return response.data;
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
const basecontroller = require('./controller.base');
const URL_Params = basecontroller.URL.Prestamos;
const Prestamo = {}

Prestamo.Create = async (req, res) => {
    try {
        var _prestamo = {
            idCliente: req.body.idCliente,
            monto: req.body.monto,
            cuotas: req.body.cuotas,
            valorCuotas: req.body.valorCuotas,
            interes: req.body.interes,
            montoRestante: req.body.monto,
            fechaPrestamo: req.body.fechaPrestamo,
            fechaLimite: req.body.fechaLimite
        }
        let response = await basecontroller.Create(URL_Params, _prestamo);
        
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

// Prestamo.Get = async function Get(id){
//     let res = await basecontroller.Read(URL_Params, id);
//     return res;
// }


Prestamo.GetAll = async (req, res) => {
    let response = await basecontroller.ReadAll(URL_Params);
    return response.data;
}

Prestamo.Update = async (req, res) => {
    let response = await basecontroller.Update(URL_Params, req.body);
    return response;
}

Prestamo.Delete = async (req, res) => {
    let response = await basecontroller.Delete(URL_Params, req.body.id);
    return response;
}

module.exports = Prestamo;
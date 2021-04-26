// Información de conexión con API
const config = require('../config/api.config');

//Abstracción de los métodos de consumo de la API para facilitar la extensión de las operaciones.
module.exports = {
    URL: {
        Prestamista: '/prestamista',
        Clientes: '/cliente',
        Prestamos: '/prestamo',
        Pagos: '/pago'
    },
    Auth: (URL_Params,data) => config.ApiConsumer({
        method:"POST",
        url: config.connectionString + URL_Params + '/auth',
        headers: {"content-type":"application/json"},
        params: data
    }),
    Create: (URL_Params,data) => config.ApiConsumer({
        method:"POST",
        url: config.connectionString + URL_Params + '/create',
        headers: {"content-type":"application/json"},
        params: data
    }),
    Read: (URL_Params,id) => config.ApiConsumer({
        method:"GET",
        url: config.connectionString + URL_Params + '/' + id,
        headers: {"content-type":"application/json"}
    }),
    ReadAll: (URL_Params) => config.ApiConsumer({
        method:"GET",
        url: config.connectionString + URL_Params + '/list',
        headers: {"content-type":"application/json"}
    }),
    Update: (URL_Params,data) => config.ApiConsumer({
        method:"PUT",
        url: config.connectionString + URL_Params + '/update',
        headers: {"content-type":"application/json"}, 
        params: data
    }),
    Delete: (URL_Params,id) => config.ApiConsumer({
        method:"DELETE",
        url: config.connectionString + URL_Params + '/delete' + id,
        headers: {"content-type":"application/json"}
    })
}
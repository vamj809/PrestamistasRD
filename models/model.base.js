// Modelo base con campo universal de ID
const config = require('../config/api.config');

//TO-DO: Abstraer el module.exports para uso genérico de los distintos modelos y 
//       poder facilitar la extensión del mismo. #SOLID.

module.exports = {
    Auth: (URL_Params,data) => config.ApiConsumer({
        method:"POST",
        url: config.connectionString + URL_Params + '/auth',
        params: data
    }),
    Create: (URL_Params,data) => config.ApiConsumer({
        method:"POST",
        url: config.connectionString + URL_Params + '/create',
        params: data
    }),
    Read: (URL_Params,id) => config.ApiConsumer({
        method:"GET",
        url: config.connectionString + URL_Params + '/id=' + id
    }),
    ReadAll: (URL_Params) => config.ApiConsumer({
        method:"GET",
        url: config.connectionString + URL_Params + '/list'
    }),
    Update: (URL_Params,data) => config.ApiConsumer({
        method:"PUT",
        url: config.connectionString + URL_Params + '/id=' + data._id, 
        params: data
    }),
    Delete: (URL_Params,id) => config.ApiConsumer({
        method:"DELETE",
        url: config.connectionString + URL_Params + '/id=' + id
    })
}
import conn from '../index';
import config from '../config/api.config';
const URL_Params = '/Prestamistas';

var Prestamista = function(prestamista) {
    //TODO: Crear Prestamista
    //forma: this.atributo = prestamista.atributo
};

module.exports = {
    Create: (name, lastname, email, password) => config.ApiConsumer({
        method:"POST",
        url: config.connectionString + URL_Params,
        params: {
            displayname: lastname + ', ' + name,
            email: email,
            password: password
        }
    }),
    Read: (id) => config.ApiConsumer({
        method:"GET",
        url: config.connectionString + URL_Params + '/id=' + id
    }),
    ReadAll: () => config.ApiConsumer({
        method:"GET",
        url: config.connectionString + URL_Params + '/list',
        params: {
            _id: id
        }
    }),
    Update: (prestamista) => config.ApiConsumer({
        method:"PUT",
        url: config.connectionString + URL_Params + '/id=' + prestamista.id, 
        params: {
            _id:prestamista.id,
            userName: prestamista.userName,
            displayname: prestamista.displayname,
            email: prestamista.email,
            password: prestamista.password,
            attemptFails: 0
        }
    }),
    Delete: (id) => config.ApiConsumer({
        method:"DELETE",
        url: config.connectionString + URL_Params + '/id=' + id
    })
}
import config from '../config/api.config';
const URL_Params = '/Prestamistas';

//TO-DO: Abstraer el module.exports para uso genérico de los distintos modelos y 
//       poder facilitar la extensión del mismo. #SOLID.

var Prestamista = function(_prestamista) {
    //TODO: Crear Prestamista [Actualizar atributos en base a definido en arquitectura]
    this._id = _prestamista._id;
    this.userName = _prestamista.userName;
    this.displayName = _prestamista.displayName;
    this.email = _prestamista.email;
    this.passwordHash = _prestamista.passwordHash;
    this.passwordSalt = _prestamista.passwordSalt;
    this.lastAccessDate = _prestamista.lastAccessDate;
    this.createdAt = _prestamista.createdAt;
    this.createdBy = _prestamista.createdBy;
    this.attemptFails = _prestamista.attemptFails;
};

module.exports = {
    Auth: (email, password) => config.ApiConsumer({
        method:"POST",
        url: config.connectionString + URL_Params + '/auth',
        params: {
            user: email,
            password: password
        }
    }),
    Create: (name, lastname, email, password) => config.ApiConsumer({
        method:"POST",
        url: config.connectionString + URL_Params + '/create',
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
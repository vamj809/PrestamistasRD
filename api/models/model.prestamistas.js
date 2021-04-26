var Prestamista = function(_prestamista) {
    //Atributos del Prestamista (Usuario)
    this._id = _prestamista._id;
    this.usuario = _prestamista.usuario;
    this.nombre = _prestamista.nombre;
    this.email = _prestamista.email;
    this.passwordHash = _prestamista.passwordHash;
    this.passwordSalt = _prestamista.passwordSalt;
    this.fechaUltimoAcceso = _prestamista.fechaUltimoAcceso;
    this.fechaCreacion = _prestamista.fechaCreacion;
    this.intentosFallidos = _prestamista.intentosFallidos;
};
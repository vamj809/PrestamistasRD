var Cliente = function(_cliente) {
    //Atributos del Cliente
    this._id = _cliente._id;
    this.idPrestamista = _cliente.idPrestamista;
    this.nombre = _cliente.nombre;
    this.cedula = _cliente.cedula;
    this.telefono = _cliente.telefono;
    this.endeudado = _cliente.endeudado;
};
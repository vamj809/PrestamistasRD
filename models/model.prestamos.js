var Prestamo = function(_prestamos) {
    //Atributos del Prestamo
    this._id = _prestamos._id;
    this.idCliente = _prestamos.idCliente;
    this.monto = _prestamos.monto;
    this.cuotas = _prestamos.cuotas;
    this.valorCuotas = _prestamos.valorCuotas;
    this.interes = _prestamos.interes;
    this.montoRestante = _prestamos.montoRestante;
    this.fechaPrestamo = _prestamos.fechaPrestamo;
    this.fechaLimite = _prestamos.fechaLimite;
};
# PrestamistasRD
PrestamistasRD. Un proyecto orientado a prestamistas independientes.

## LocalDBTest
> Contiene casos de ejemplo, para simular la respuesta del servidor/api.

## Models
> La idea es ubicar las clases que se comunican con la api

# Cliente - Operaciones / Vistas
### LOGIN:
* Autentica Usuario X

### REGISTRO USUARIO:
* Crea Usuario X

### DASHBOARD:
* Obten listado prestamos/con info de su cliente respectivo del usuario X
* Registra nuevo préstamo 
    * [Ext-Clientes] Registra nuevo cliente
* [Ext-Pagos] Registra nuevos pagos
* [Ext-Clientes] Registra nuevo cliente

### PAGOS:
* Obten listado de pagos.
* Registra nuevos pagos.
* Cancela pagos inválidos?

### CLIENTES:
* Obten listado Clientes
* Editar información de [1] cliente
* Eliminar cliente [que no tenga prestamos activos/pendientes]

### MI_PERFIL:
* Obten información del usuario actual.
* [If admin] Obten listado de todos los usuarios?
* Editar mi perfil

# Servidor - Operaciones
API:
* Conectar con BD
* Guardar cambios
* Responder los requests con status respectivos:
    * [200] -> OK
    * [404] -> ERROR - MSG
const model = require('../models/model.prestamistas');
const basecontroller = require('./controller.base');
const URL_Params = basecontroller.URL.Prestamista;
const Prestamista = {}

Prestamista.Authenticate = async (req, res) => {
    try {
        email = document.getElementById('email').innerText;
        password = document.getElementById('password').innerText;
        errorField = document.getElementById('servermsg');

        res = await basecontroller.Auth(URL_Params, {
            user : email,
            password: password
        });
        
        if(res.json.success == true){
            res.redirect('/dashboard');
        } else {
            errorField.style.visibility = "visible";
            errorField.innerText = "Usuario y/o contraseña incorrecta. Vuelva a intentarlo otra vez";
        }

    } catch(error) {
        console.log(error.message);
        errorField.style.visibility = "visible";
        errorField.innerText = "Error del servidor. Vuelva a intentarlo";
    }
}

Prestamista.Create = async function Create(name, lastname, email, password){
    let res = await basecontroller.Create(URL_Params, {
        displayname: lastname + ', ' + name,
        email: email,
        password: password
    });

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Prestamista.Get = async function Get(id){
    let res = await basecontroller.Read(URL_Params, id);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Prestamista.Update = async function Update(prestamista){
    let res = await basecontroller.Update(URL_Params, {
        _id:prestamista.id,
        userName: prestamista.userName,
        displayname: prestamista.displayname,
        email: prestamista.email,
        password: prestamista.password,
        attemptFails: 0
    });

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

Prestamista.Delete = async function Delete(id){
    let res = await basecontroller.Update(URL_Params, id);

    console.log(res.status);
    console.log(res.data);
    
    return res;
}

module.exports = Prestamista;
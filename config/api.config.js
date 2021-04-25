//TODO: Colocar información de conexión al servidor / API
const Axios = require("axios");
const BASE_URL = 'http://localhost:2800';

exports.connectionString = BASE_URL;
exports.ApiConsumer = Axios;
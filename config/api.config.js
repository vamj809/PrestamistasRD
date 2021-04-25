//TODO: Colocar información de conexión al servidor / API
const Axios = require("axios");
const BASE_URL = 'localhost:3000';

exports.connectionString = BASE_URL;
exports.ApiConsumer = Axios;
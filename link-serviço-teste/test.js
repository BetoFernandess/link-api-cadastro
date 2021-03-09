api = require( './services/api')


api.post("/login").then(response => console.log("Resposta do servidor: " + response)).catch(err => console.log("Erro: " + err))
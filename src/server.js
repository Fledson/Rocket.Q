const express = require('express');
const route = require('./routes');
const path = require('path');

const server = express();

// configurando o motor para rodar o arquivo js no navegador
server.set('view engine', 'ejs');
//informando que esta sendo usado uma pasta public
server.use(express.static('public'))
// mostrando ao servidor aonde esta a pasta views com o index.ejs
server.set('views', path.join(__dirname, 'views'))

server.use(route);

server.listen(3000, () => {
    console.log("Server is Running");
});
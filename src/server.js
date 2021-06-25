const express = require('express');
const route = require('./routes');
const path = require('path');

const server = express();

// configurando o motor para rodar o arquivo js no navegador
server.set('view engine', 'ejs');
// informando que esta sendo usado uma pasta public
server.use(express.static('public'));
// mostrando ao servidor aonde esta a pasta views com o index.ejs
server.set('views', path.join(__dirname, 'views'));
// decodificar conteúdo que vem do formulário
server.use(express.urlencoded({ extended: true }));

server.use(route);

server.listen(process.env.PORT || 3000);
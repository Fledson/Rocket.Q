const express = require('express');
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')
const route = express.Router();

route.get("/", (req, res) => res.render("index", {page: 'enter-room'}));
route.get("/create-pass", (req, res) => res.render("index", {page: 'create-pass'}));

/** ******************* SOBRE QUESTOES *******************  */
//Listar todas as Questões da sala
route.post('/question/:room/:question/:action', QuestionController.index);
//Postar uma nova Questão
route.post('/question/create/:room', QuestionController.create)

/** ******************* SOBRE SALAS *******************  */
//Criar nova sala
route.post('/create-room', RoomController.create);
//Abrir a Nova Sala
route.get('/room/:room', RoomController.open);
//entrar em uma Sala
route.post('/enterroom/', RoomController.enter)

module.exports  =  route;
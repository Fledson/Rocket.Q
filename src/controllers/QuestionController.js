module.exports = {
   index(req, res) {
        const { room, question, action } = req.params;
        const password = req.body.password;
        console.log(room, question, action);
        console.log(`room = ${room}, id da questão =${question}, ação = ${action}, senha = ${password}`);

   } 
}
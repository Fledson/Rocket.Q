const Database = require('../db/config')

module.exports = {
   async index(req, res) {
      const db = await Database();
      const { room, question, action } = req.params;
      const password = req.body.password;

      //   Verificar se a senha esta correta   => db.get() pega apenas um registro
      const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${room}`);
      if(verifyRoom.pass == password){
         if (action == 'check') {
            await db.run(`UPDATE questions SET read = '1' WHERE id = ${question}`);
         } else if (action == 'delete'){
            await db.run(`UPDATE questions SET deletado = 'SIM' WHERE id = ${question}`);
         }
         res.status(202).redirect(`/room/${room}`);
      }else{
         res.render('passincorrect', {roomId: room});
      }

      db.close();
   },
   async create(req, res){
      const db = await Database();
      const { question } = req.body;
      const { room } = req.params;

      try {
        await db.run(`
            INSERT INTO questions (question, read, room, deletado) VALUES ('${question}', 0,'${Number(room)}', 'NÃO')
         `);
      } catch (error) {
         console.log("deu ruim " + error)
         res.status(500).redirect(`/room/${room}`);
      }

      
      res.status(202).redirect(`/room/${room}`);
      db.close();
     
   }
}
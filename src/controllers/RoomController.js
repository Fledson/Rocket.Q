const Database = require('../db/config');

module.exports = {
    async create(req, res) {
        const password = req.body.password;
        const db = await Database(); 
        let roomId = '';
        let isRoom = true;

        while(isRoom) {
            // gerando numero automatico para a sala
            for(var i = 0; i < 6; i++) {
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString();
            }

            // Verificando se o numero gerado para a sala existe no banco
            const roomsExistIds = await db.all(`SELECT id FROM rooms`);
            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId); 

            if(!isRoom){
                try {
                    await db.run(`
                        INSERT INTO rooms (id, pass) VALUES (${Number(roomId)}, '${password}');
                    `);
                } catch (error) {
                    console.log(error);
                }
            }

        }

        await db.close();

        res.redirect(`/room/${roomId}`);
    },
    
    async open(req, res) {
        const db = await Database(); 

        const { room } = req.params;
        const questions = await db.all(`SELECT * FROM questions WHERE deletado = 'NÃO' and room = ${room} and read = 0`);
        const questionsRead = await db.all(`SELECT * FROM questions WHERE deletado = 'NÃO' and room = ${room} and read = 1`);
        let isNoQuestions;

        if (questions.length == 0) {
            if (questionsRead == 0) {
                isNoQuestions= true;
            }
        }

        // console.log(questions);
        res.render("room", {roomId: room, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions});
    }, 

    enter(req, res) {
        const { roomId } = req.body;

        res.redirect(`/room/${roomId}`)
    }
}
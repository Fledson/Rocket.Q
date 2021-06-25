const Database = require('../db/config');

module.exports = {
    async create(req, res) {
        const password = req.body.password;
        const db = await Database(); 
        let roomId = '';

        // gerando numero automatico para a sala
        for(var i = 0; i < 6; i++) {
            i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
            roomId += Math.floor(Math.random() * 10).toString();
        }
        try {
            await db.run(`
                INSERT INTO rooms (id, pass) VALUES (${Number(roomId)}, '${password}');
            `);
        } catch (error) {
            console.log(error);
        }

        await db.close();

        res.redirect(`/room/${roomId}`);
    }
}
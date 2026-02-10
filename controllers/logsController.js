const { getDB } = require("../config/db");
const insertLog = async (req, res) => {
    try {
        const db = getDB();
        const logData = req.body || {
            book_id: "64b5c2d8a123456ef8914",
            action: "borrowed"
        };
        const result = await db.collection("logs").insertOne(logData);
        res.json({ acknowledged: true, insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    insertLog
};

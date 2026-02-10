const { getDB, getClient } = require("../config/db");
const createBooksCollection = async (req, res) => {
    try {
        const db = getDB();
        await db.createCollection("books", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["title"],
                    properties: {
                        title: {
                            bsonType: "string",
                            minLength: 1,
                            description: "Title is required and must be a non-empty string"
                        }
                    }
                }
            }
        });
        res.json({ ok: 1 });
    } catch (error) {
        if (error.code === 48) {
            res.status(400).json({ error: "Collection already exists" });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};
const createAuthorsCollection = async (req, res) => {
    try {
        const db = getDB();
        const authorData = req.body || { name: "Author1", nationality: "British" };
        const result = await db.collection("authors").insertOne(authorData);
        res.json({ acknowledged: true, insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const createCappedLogsCollection = async (req, res) => {
    try {
        const db = getDB();
        await db.createCollection("logs", {
            capped: true,
            size: 1048576
        });
        res.json({ ok: 1 });
    } catch (error) {
        if (error.code === 48) {
            res.status(400).json({ error: "Collection already exists" });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};
const createBooksIndex = async (req, res) => {
    try {
        const db = getDB();
        const indexName = await db.collection("books").createIndex({ title: 1 });
        res.json(indexName);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    createBooksCollection,
    createAuthorsCollection,
    createCappedLogsCollection,
    createBooksIndex
};

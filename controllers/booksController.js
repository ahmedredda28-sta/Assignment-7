const { getDB } = require("../config/db");
const insertOne = async (req, res) => {
    try {
        const db = getDB();
        const book = req.body || {
            title: "Book1",
            author: "Ali",
            year: 1997,
            genres: ["Fantasy", "Adventure"]
        };
        const result = await db.collection("books").insertOne(book);
        res.json({ acknowledged: true, insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const insertMany = async (req, res) => {
    try {
        const db = getDB();
        const books = req.body || [
            {
                title: "Future",
                author: "George Orwell",
                year: 2020,
                genres: ["Science Fiction"]
            },
            {
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                year: 1960,
                genres: ["Classic", "Fiction"]
            },
            {
                title: "Brave New World",
                author: "Aldous Huxley",
                year: 2000,
                genres: ["Dystopian", "Science Fiction"]
            }
        ];
        const result = await db.collection("books").insertMany(books);
        res.json({
            acknowledged: true,
            insertedIds: result.insertedIds
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateByTitle = async (req, res) => {
    try {
        const db = getDB();
        const { title } = req.params;
        const updateData = req.body || { year: 2022 };
        const result = await db.collection("books").updateOne(
            { title: title },
            { $set: updateData }
        );
        res.json({
            acknowledged: true,
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const findByTitle = async (req, res) => {
    try {
        const db = getDB();
        const { title } = req.query;
        const book = await db.collection("books").findOne({ title: title });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const findByYearRange = async (req, res) => {
    try {
        const db = getDB();
        const { from, to } = req.query;
        const books = await db.collection("books").find({
            year: { $gte: parseInt(from), $lte: parseInt(to) }
        }).toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const findByGenre = async (req, res) => {
    try {
        const db = getDB();
        const { genre } = req.query;
        const books = await db.collection("books").find({
            genres: genre
        }).toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const findWithSkipLimit = async (req, res) => {
    try {
        const db = getDB();
        const books = await db.collection("books")
            .find({})
            .sort({ year: -1 })
            .skip(2)
            .limit(3)
            .toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const findYearInteger = async (req, res) => {
    try {
        const db = getDB();
        const books = await db.collection("books").find({
            year: { $type: "int" }
        }).toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const findExcludeGenres = async (req, res) => {
    try {
        const db = getDB();
        const books = await db.collection("books").find({
            genres: { $nin: ["Horror", "Science Fiction"] }
        }).toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteBeforeYear = async (req, res) => {
    try {
        const db = getDB();
        const { year } = req.query;
        const result = await db.collection("books").deleteMany({
            year: { $lt: parseInt(year) }
        });
        res.json({
            acknowledged: true,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const aggregate1 = async (req, res) => {
    try {
        const db = getDB();
        const books = await db.collection("books").aggregate([
            { $match: { year: { $gt: 2000 } } },
            { $sort: { year: -1 } }
        ]).toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const aggregate2 = async (req, res) => {
    try {
        const db = getDB();
        const books = await db.collection("books").aggregate([
            { $match: { year: { $gt: 2000 } } },
            { $project: { _id: 0, title: 1, author: 1, year: 1 } }
        ]).toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const aggregate3 = async (req, res) => {
    try {
        const db = getDB();
        const books = await db.collection("books").aggregate([
            { $unwind: "$genres" },
            { $project: { _id: 0, title: 1, genres: 1 } }
        ]).toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const aggregate4 = async (req, res) => {
    try {
        const db = getDB();
        const books = await db.collection("books").aggregate([
            {
                $lookup: {
                    from: "logs",
                    localField: "_id",
                    foreignField: "book_id",
                    as: "book_details"
                }
            }
        ]).toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    insertOne,
    insertMany,
    updateByTitle,
    findByTitle,
    findByYearRange,
    findByGenre,
    findWithSkipLimit,
    findYearInteger,
    findExcludeGenres,
    deleteBeforeYear,
    aggregate1,
    aggregate2,
    aggregate3,
    aggregate4
};

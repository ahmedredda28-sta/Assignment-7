const express = require("express");
const collectionRoutes = require("./routes/collectionRoutes");
const booksRoutes = require("./routes/booksRoutes");
const logsRoutes = require("./routes/logsRoutes");
const app = express();
app.use(express.json());
app.use("/collection", collectionRoutes);
app.use("/books", booksRoutes);
app.use("/logs", logsRoutes);
app.get("/", (req, res) => {
    res.json({ message: "Assignment 8 - MongoDB Express API" });
});
module.exports = app;

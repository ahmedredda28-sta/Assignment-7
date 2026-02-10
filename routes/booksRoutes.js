const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/booksController");
router.post("/", insertOne);
router.post("/batch", insertMany);
router.patch("/:title", updateByTitle);
router.get("/title", findByTitle);
router.get("/year", findByYearRange);
router.get("/genre", findByGenre);
router.get("/skip-limit", findWithSkipLimit);
router.get("/year-integer", findYearInteger);
router.get("/exclude-genres", findExcludeGenres);
router.delete("/before-year", deleteBeforeYear);
router.get("/aggregate1", aggregate1);
router.get("/aggregate2", aggregate2);
router.get("/aggregate3", aggregate3);
router.get("/aggregate4", aggregate4);
module.exports = router;

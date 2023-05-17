const express = require('express');
const router = express.Router();
const {
    getBookByTitleKeyword,
    createBook
} = require("../controllers/booksContoller");

// Set GET /:keyword
router.get("/:keyword", getBookByTitleKeyword);

// Set POST /
router.post("/", createBook);

module.exports = router;
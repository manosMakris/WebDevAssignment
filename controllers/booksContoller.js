const Book = require("../models/Book");

// Get a book based on a title keyword function
async function getBookByTitleKeyword(req, res) {
    // Get the keyword
    const keyword = req.params.keyword;

    try {
        let books;

        if (keyword === "*") {
            books = await Book.find();
        } else {
            const regex = new RegExp(keyword, "i");
            books = await Book.find({ title: { $regex: regex } });
        }

        res.status(200).json({ books });
    } catch (err) {
        res.status(500).json({ message: "The server encountered a database error." });
    }
}

// Create a book function
async function createBook(req, res) {
    // Check if a book with the same title exists in the database
    try {
        const books = await Book.find();
        for (const book of books) {
            if (book.title == req.body.title) {
                res.status(400).json({ message: "There is a book with the same name." });
                return;
            }
        }
    } catch (err) {
        res.status(500).json({ message: "The server had a database error." });
    }

    // Create a new book
    const newBook = new Book(req.body);

    // Save the new book to the database
    try {
        await newBook.save();
        res.status(201).json({ message: "The book has been succesfully saved." });
    } catch (err) {
        res.status(500).json({ message: "The server had a database error." });
    }
}

// Exports the controllers functions
module.exports = {
    getBookByTitleKeyword,
    createBook
};
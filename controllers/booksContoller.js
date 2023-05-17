const Book = require("../models/Book");

// Get a book based on a title keyword functions
async function getBookByTitleKeyword(req, res) {
    // Get the keyword
    const keyword = req.params.keyword;

    // Create the response object based on the given keyword
    try {
        const allBooks = await Book.find();

        const books = [];
        for (const book of allBooks) {

            // Case insensitive comparison
            if (book.title.toUpperCase().includes(keyword.toUpperCase()) || keyword == "*") {
                books.push(book);
            }
        }

        res.set("Content-Type", "application/json");
        res.status(200).json({ books });
    } catch (err) {
        res.status(500).json({ message: "The server had a database error." });
    }
};

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
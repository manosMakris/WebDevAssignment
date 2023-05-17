// Require modules
const mongoose = require("mongoose");

// Get the Schema class
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true 
    }
});

// Make a model based on the schema above
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
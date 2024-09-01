const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

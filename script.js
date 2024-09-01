const mongoose = require("mongoose");
const User = require("./user");

mongoose.connect("mongodb://localhost:27017/libraryDB");

async function addNewBook(
  title,
  author,
  yearPublished,
  genres,
  availableCopies
) {
  try {
    const newBook = new Book({
      title,
      author,
      yearPublished,
      genres,
      availableCopies,
    });
    await newBook.save();
    console.log("Book added successfully:", newBook);
  } catch (error) {
    console.error("Error adding book:", error);
  }
}

async function updateAvailableCopies(title, newAvailableCopies) {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { title },
      { availableCopies: newAvailableCopies },
      { new: true }
    );
    console.log("Book updated successfully:", updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
  }
}

async function findBooksByAuthor(author) {
  try {
    const books = await Book.find({ author });
    console.log(`Books by ${author}:`, books);
  } catch (error) {
    console.error("Error finding books by author:", error);
  }
}

async function deleteBookByTitle(title) {
  try {
    const deletedBook = await Book.findOneAndDelete({ title });
    console.log("Book deleted successfully:", deletedBook);
  } catch (error) {
    console.error("Error deleting book:", error);
  }
}
addNewBook(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  1925,
  ["Fiction", "Classic"],
  5
)
  .then(() => {
    console.log("Book added successfully");
  })
  .catch((error) => {
    console.error("Error adding book:", error);
  });

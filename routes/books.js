const express = require('express');
const Book = require('../models/Book');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  const newBook = new Book({ title, author });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;

  const existingBook = await Book.findOne({ id });

  if (!existingBook) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  try {
    const updatedBook = await Book.findOneAndUpdate({ id }, { title, author }, { new: true });
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const existingBook = await Book.findOne({ id });

  if (!existingBook) {
    return res.status(404).json({ message: "Book not found" });
  }

  try {
    await Book.findOneAndDelete({ id });
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
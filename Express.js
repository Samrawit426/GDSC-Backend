const express = require('express');
const connectDB = require('./db/connect');
const bookRoutes = require('./routes/books');
const mongoose = require('mongoose');

connectDB();

const app = express();

app.use(express.json());

app.use('/api/books', bookRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
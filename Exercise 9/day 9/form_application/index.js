const express = require("express");
const MessageRepository = require("./repository");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/messages", (req, res) => {
  const messages = MessageRepository.getAll();
  res.json(messages);
});

app.post("/messages", (req, res) => {
  const message = req.body.message;
  MessageRepository.create(message);
  res.status(201).send("Message created successfully");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

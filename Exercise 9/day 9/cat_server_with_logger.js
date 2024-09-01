const express = require("express");
const bodyParser = require("body-parser");
const { cats } = require("./modules/reqository.js");
const { Cat } = require("./modules/cat_model.js");
const logger = require("./modules/logger.js");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  const date = new Date().toISOString();
  const method = req.method;
  const path = req.url;

  logger.log_data(`[${date}] ${method} ${path}\n`);

  res.send("Welcome to the cat server");
});

app.get("/cats", (req, res) => {
  res.status(200).json(cats);
});

app.post("/cats", (req, res) => {
  const newCat = new Cat(req.body.name, req.body.color, req.body.pictureUrl);
  cats.push(newCat);
  res.status(201).json(newCat);
});

app.patch("/cats", (req, res) => {
  const updatedCat = {
    name: req.body.name,
    newcolor: req.body.color,
    newpictureUrl: req.body.pictureUrl,
  };

  const catIndex = cats.findIndex((cat) => cat.name === updatedCat.name);
  if (catIndex !== -1) {
    if (updatedCat.newcolor) {
      cats[catIndex].color = updatedCat.newcolor;
    }
    if (updatedCat.newpictureUrl) {
      cats[catIndex].pictureUrl = updatedCat.newpictureUrl;
    }
    res.status(200).json(cats[catIndex]);
  } else {
    res.status(404).json({ message: "Cat not found" });
  }
});

app.delete("/cats", (req, res) => {
  const name = req.body.name;
  const catIndex = cats.findIndex((cat) => cat.name === name);
  if (catIndex !== -1) {
    cats.splice(catIndex, 1);
    res.status(200).json({ message: "Cat deleted successfully" });
  } else {
    res.status(404).json({ message: "Cat not found" });
  }
});

app.use((req, res) => {
  res.status(404).send("File Not Found");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
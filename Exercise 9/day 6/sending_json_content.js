const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  fs.readFile(path.join(__dirname, "content.json"), (err, data) => {
    if (err) {
      res.status(404).send("File Not Found");
    } else {
      res.setHeader("Content-Type", "application/json");
      res.send(data);
    }
  });
});

app.get("/browser.js", (req, res) => {
  fs.readFile(path.join(__dirname, "browser.js"), (err, data) => {
    if (err) {
      res.status(404).send("File Not Found");
    } else {
      res.setHeader("Content-Type", "application/javascript");
      res.send(data);
    }
  });
});

app.get("/index.html", (req, res) => {
  fs.readFile(path.join(__dirname, "browser.html"), "utf8", (err, data) => {
    if (err) {
      res.status(404).send("File Not Found");
    } else {
      res.setHeader("Content-Type", "text/html");
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

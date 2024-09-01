const express = require("express");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "public");
const app = express();

// Function to get content type based on file extension
function getContentType(filePath) {
  const extname = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".xml": "application/xml",
    ".jfif": "image/png",
    ".jpeg": "image/jpeg",
  };
  return mimeTypes[extname] || "text/plain";
}

app.get("*", (req, res) => {
  let filePath = req.url;
  filePath = path.join(PUBLIC_DIR, filePath);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send("File not found");
      return;
    }

    const contentType = getContentType(filePath);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send("Error reading file");
        return;
      }

      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    });
  });
});

const server = app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

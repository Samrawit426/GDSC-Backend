const express = require("express");
const fs = require("fs").promises;
const crypto = require("crypto");
const path = require("path");
const readline = require("readline");

const app = express();
const port = 3000;

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

app.get("/", async (req, res) => {
  const choice = await askQuestion(
    "Choose an option:\n1. Enter text\n2. Process text in file.txt\n"
  );

  switch (choice) {
    case "1":
      const text = await askQuestion("Enter the text: ");
      const encryptedText = encryptText(text);
      console.log(`Original text: ${text}\nEncrypted text: ${encryptedText}`);
      res.send(`Original text: ${text}<br>Encrypted text: ${encryptedText}`);
      break;
    case "2":
      try {
        const data = await fs.readFile(path.join(__dirname, "file.txt"));
        const fileText = data.toString();
        const encryptedFileText = encryptText(fileText);
        console.log(
          `Original text from file: ${fileText}\nEncrypted text: ${encryptedFileText}`
        );
        res.send(
          `Original text from file: ${fileText}<br>Encrypted text: ${encryptedFileText}`
        );
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while processing the file.");
      }
      break;
    default:
      console.log("Please try 1 or 2");
      res.status(400).send("Invalid choice. Please try 1 or 2.");
  }
});

function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function encryptText(text) {
  return cipher.update(text, "utf-8", "hex") + cipher.final("hex");
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

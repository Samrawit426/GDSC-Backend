const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "command.txt");

fs.watch(filePath, (eventType, filename) => {
  if (filename && eventType === "change") {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      const trimmedData = data.trim();
      const [action, ...params] = trimmedData.split(" ");
      const fileName = params[0];
      const newFileName = params.slice(1).join(" ");

      switch (action) {
        case "create":
          break;
        case "delete":
          break;
        case "rename":
          fs.rename(fileName, newFileName, (err) => {
            if (err) {
              console.error("Error renaming file:", err);
              return;
            }
            console.log(`File ${fileName} renamed to ${newFileName}.`);
          });
          break;
        case "add":
          break;
        default:
          console.log(`Invalid action: ${action}`);
      }
    });
  }
});

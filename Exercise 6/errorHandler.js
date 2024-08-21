const http = require("http");

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  res.statusCode = 500;
  res.end("Internal Server Error in browser");
};

const server = http.createServer((req, res) => {
  try {
    throw new Error("Something is wrong excuted in terminal");
  } catch (err) {
    errorHandler(err, req, res);
  }
});

server.listen(8999, () => {
  console.log("Server is running on port 8999");
});

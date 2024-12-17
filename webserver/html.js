const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = "localhost";
const port = 4000;

const htmlFileHandler = function (req, res) {
  const htmlFilePath = path.join(__dirname, "index.html");
  if (req.url === "/index.html") {
    fs.readFile(htmlFilePath, function (error, htmlfile) {
      if (error) {
        console.error(error);
        res.writeHead(500);
        res.end("Error loading HTML file");
      } else {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.write(htmlfile);
        res.end();
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
};

const server = http.createServer(htmlFileHandler);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

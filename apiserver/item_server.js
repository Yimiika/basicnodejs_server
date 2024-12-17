const http = require("http");
const {
  getAllItems,
  createItem,
  getOneItem,
  updateItem,
  deleteItem,
} = require("./item_functions.js");

const HOSTNAME = "localhost";
const PORT = 4000;

// Route handler
function reqHandler(req, res) {
  if (req.url === "/item" && req.method === "POST") {
    createItem(req, res);
  } else if (req.url === "/items" && req.method === "GET") {
    getAllItems(req, res);
  } else if (req.url === "/item" && req.method === "GET") {
    getOneItem(req, res);
  } else if (req.url === "/item" && req.method === "PUT") {
    updateItem(req, res);
  } else if (req.url === "/item" && req.method === "DELETE") {
    deleteItem(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "404 Not Found" }));
  }
}

// Start the server
const server = http.createServer(reqHandler);

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

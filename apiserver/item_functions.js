const fs = require("fs");
const path = require("path");

const itemsDbPath = path.join(__dirname, "db", "items.json");

// Function to get all items
function getAllItems(req, res) {
  fs.readFile(itemsDbPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading database:", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  });
}

// Function to create a new item
function createItem(req, res) {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    try {
      const parsedItem = Buffer.concat(body).toString();
      const newItem = JSON.parse(parsedItem);

      fs.readFile(itemsDbPath, "utf-8", (err, data) => {
        if (err) {
          console.error("Error reading database:", err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Internal Server Error" }));
          return;
        }

        const oldItems = JSON.parse(data);
        const lastItem = oldItems[oldItems.length - 1] || { id: 0 };
        newItem.id = lastItem.id + 1;

        const allItems = [...oldItems, newItem];

        fs.writeFile(itemsDbPath, JSON.stringify(allItems), (err) => {
          if (err) {
            console.error("Error writing to database:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Internal Server Error" }));
            return;
          }
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newItem));
        });
      });
    } catch (err) {
      // Handle JSON parsing errors
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid JSON format in request" }));
    }
  });
}

// Function to get one item by ID
function getOneItem(req, res) {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const parsedItem = Buffer.concat(body).toString();
    const detailsToFind = JSON.parse(parsedItem);
    const itemId = detailsToFind.id;

    fs.readFile(itemsDbPath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading database:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
        return;
      }

      const itemsObj = JSON.parse(data);
      const item = itemsObj.find((item) => item.id === itemId);

      if (!item) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Item not found" }));
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(item));
    });
  });
}

// function to update a single item

function updateItem(req, res) {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    try {
      const parsedItem = Buffer.concat(body).toString();
      const detailsToUpdate = JSON.parse(parsedItem);
      const itemId = detailsToUpdate.id;

      fs.readFile(itemsDbPath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading database:", err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Internal Server Error" }));
          return;
        }

        const itemsObj = JSON.parse(data);
        const itemIndex = itemsObj.findIndex((item) => item.id === itemId);

        if (itemIndex === -1) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ message: "Item with specified id not found" })
          );
          return;
        }
        itemsObj[itemIndex] = { ...itemsObj[itemIndex], ...detailsToUpdate };

        fs.writeFile(itemsDbPath, JSON.stringify(itemsObj, null, 2), (err) => {
          if (err) {
            console.error("Error writing to database:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                message: "Internal Server Error. Could not update item.",
              })
            );
            return;
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "Update successfully done",
              updatedItem: itemsObj[itemIndex],
            })
          );
        });
      });
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid JSON format in request" }));
    }
  });
}

function deleteItem(req, res) {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    try {
      const parsedItem = Buffer.concat(body).toString();
      const detailsToUpdate = JSON.parse(parsedItem);
      const itemId = detailsToUpdate.id;

      fs.readFile(itemsDbPath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading database:", err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Internal Server Error" }));
          return;
        }

        const itemsObj = JSON.parse(data);
        const itemIndex = itemsObj.findIndex((item) => item.id === itemId);

        if (itemIndex === -1) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ message: "Item with specified id not found" })
          );
          return;
        }
        const deletedItem = itemsObj[itemIndex];
        itemsObj.splice(itemIndex, 1);

        fs.writeFile(itemsDbPath, JSON.stringify(itemsObj, null, 2), (err) => {
          if (err) {
            console.error("Error writing to database:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                message: "Internal Server Error. Could not delete item.",
              })
            );
            return;
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "Item successfully deleted",
              deletedItem,
            })
          );
        });
      });
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid JSON format in request" }));
    }
  });
}

module.exports = {
  getAllItems,
  createItem,
  getOneItem,
  updateItem,
  deleteItem,
};

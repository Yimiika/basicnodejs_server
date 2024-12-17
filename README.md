This project consists of two parts:

1. **API Server:** A Node.js server for managing items stored in a JSON-based database, supporting CRUD operations.
2. **Web Server:** A Node.js server that renders an HTML page.

## Prerequisites
- NodeJS installed
- A JSON file `items.json` in the `api-server/db` directory for the API server.

---

## File Structure

```plaintext
/
├── apiserver/
│   ├── db/
│   │   └── items.json       # Database file
│   ├── item_functions.js    # Core business logic
│   └── item_server.js       # API server entry point
├── webserver/
│   ├── index.html           # HTML webpage
│   └── html.js              # Web server entry point


Overview of API server

This API allows users to manage items stored in a JSON-based database. It supports CRUD operations to create, read, update, and delete items. The API is implemented using Node.js with a simple HTTP server.

Features:

Create item
Get all items
Get one item
Update item
Delete item

Running the API

Clone the repository.

Install dependencies (if any).

Start the server:

node server.js

The server will run at http://localhost:4000/.

Endpoints

1. Get All Items

GET /items

Fetches all items in the database.

Response:

200 OK: Returns an array of all items.

500 Internal Server Error: If there's an issue reading the database.

Example:

[
  {
    "Name": "Red shirt",
    "Price": "$90",
    "Size": "Large(l)",
    "id": 1
  },
  ...
]

2. Get one Item

GET /item

Fetches one item by its ID.

Request Body:

{
  "id": 1
}

Response:

200 OK: Returns the requested item.

404 Not Found: If the item does not exist.

500 Internal Server Error: If there's an issue reading the database.

Example:

{
  "Name": "Red shirt",
  "Price": "$90",
  "Size": "Large(l)",
  "id": 1
}

3. Create Item

POST /item

Creates an item and assigns it a unique ID.

Request Body:

{
  "Name": "Green Pants",
  "Price": "$70",
  "Size": "Medium(m)"
}

Response:

201 Created: Returns the created item.

400 Bad Request: If the request body is invalid.

500 Internal Server Error: If there's an issue reading or writing to the database.

Example:

{
  "Name": "Green Pants",
  "Price": "$70",
  "Size": "Medium(m)",
  "id": 12
}

4. Update Item

PUT /item

Updates an existing item by ID.

Request Body:

{
  "Price": "$100",
  "Size": "Medium(m)",
  "id": 1
}

Response:

200 OK: Returns a success message and the updated item.

404 Not Found: If the item does not exist.

400 Bad Request: If the request body is invalid.

500 Internal Server Error: If there's an issue reading or writing to the database.

Example:

{
  "message": "Update successfully done",
  "updatedItem": {
    "Name": "Red shirt",
    "Price": "$100",
    "Size": "Large(l)",
    "id": 1
  }
}

5. Delete an Item

DELETE /item

Deletes an item by ID.

Request Body:

{
  "id": 1
}

Response:

200 OK: Returns a success message and the deleted item.

404 Not Found: If the item does not exist.

400 Bad Request: If the request body is invalid.

500 Internal Server Error: If there's an issue reading or writing to the database.

Example:

{
  "message": "Item successfully deleted",
  "deletedItem": {
    "Name": "Red shirt",
    "Price": "$90",
    "Size": "Large(l)",
    "id": 1
  }
}

Overview of web server

The web server renders a static HTML webpage located at webserver/index.html. The server renders the index.html webpage for requests to ../index.html for example (http://localhost:4000/index.html). 
Requests to any other URL will return a 404 Not Found response.

Error handling:
500 Internal Server Error: For issues loading the HTML file.
404 Not Found: For unsupported routes.

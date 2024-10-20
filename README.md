# Product API

This is a simple HTTP server API for managing a product catalog. The API supports CRUD operations (Create, Read, Update, Delete) for product management. It is built using Node.js and serves data from a JSON file.

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
  - [GET /](#get-)
  - [GET /products](#get-products)
  - [GET /products?id=<id>](#get-product-by-id)
  - [POST /products](#post-products)
  - [PUT /products](#put-products)
  - [DELETE /products?id=<id>](#delete-product)
- [Error Handling](#error-handling)
- [License](#license)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
2. Install dependencies:
    ```bash
    npm install

3. Set up your environment variables in a .env file:
    ```bash
    PORT=8000

4. Start the server:
    ```bash
    node index.js

5. Access the API at http://localhost:8000.

## Environment Variables
  The server requires a .env file with the following variable:

  - PORT: The port on which the server will run (default is 8000).

## Endpoints
### GET /
Returns the home page (index.html).

**Response:**
  - Status: 200 OK
  - Content-Type: text/html
  
### GET /products
Fetches all products.

**Response:**
  - Status: 200 OK
  - Content-Type: application/json
  - Body: Array of products

### GET /products?id=<id>
Fetches a single product by its ID.

**Response:**
  - Status: 200 OK (if found)
  - Status: 404 Not Found (if not found)
  - Content-Type: application/json
  - Body: Product object or error message

### POST /products
Adds a new product.

**Request Body:**
  - Must be a JSON object representing the product.

**Response:**
  - Status: 201 Created (if successful)
  - Status: 400 Bad Request (if input is invalid)
  - Content-Type: application/json
  - Body: New product object or error message
    
### PUT /products
Updates an existing product.

**Request Body:**
  - Must be a JSON object representing the updated product.
    
**Response:**

  - Status: 200 OK (if successful)
  - Status: 404 Not Found (if product does not exist)
  - Status: 400 Bad Request (if input is invalid)
  - Content-Type: application/json
  - Body: Updated product object or error message
    
### DELETE /products?id=<id>
Deletes a product by its ID.

**Response:**

  - Status: 200 OK (if successful)
  - Status: 404 Not Found (if product does not exist)
  - Content-Type: application/json
  - Body: Success or error message

### Error Handling
The API handles errors gracefully by returning appropriate status codes and messages. If an unexpected error occurs, a 500 Internal Server Error response will be returned.


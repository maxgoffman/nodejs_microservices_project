const express = require("express");
const router = express.Router();
const connection = require("../models/product");

// Create a new product
router.post("/", (req, res) => {
  console.log("getting all products");
  const { name, price, description } = req.body;
  console.log(`Request body ${Object.entries(req.body)}`);
  const query =
    "INSERT INTO products (name, price, description) VALUES (?, ?, ?)";

  connection.query(query, [name, price, description], (error, results) => {
    if (error) throw error;
    res.status(201).json({ id: results.insertId, name, price, description });
  });
});

// Read all products
router.get("/", (req, res) => {
  console.log("getting all products");
  connection.query("SELECT * FROM products", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Read a single product by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    }
  );
});

// Update a product by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  console.log("" + Object.entries(req.body));
  const query =
    "UPDATE products SET " +
    Object.entries(req.body)
      .map((element) => {
        return `${element[0]} = ${
          typeof element[1] == "string" ? `'${element[1]}'` : element[1]
        }`;
      })
      .join(", ") +
    " WHERE id = ?";
  connection.query(query, [id], (error) => {
    if (error) throw error;
    res.json({ id, name, price, description });
  });
});

// Delete a product by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM products WHERE id = ?", [id], (error) => {
    if (error) throw error;
    res.status(204).send();
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");
const { getDb } = require("../models/connection");
const removeNullUndefined = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));

// Create a new supplier
router.post("/", (req, res) => {
  const db = getDb();
  const { name, contact } = req.body;

  db.collection("suppliers").insertOne({ name, contact }, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to create supplier" });
      return;
    }
    res.status(201).json(result);
  });
});

// Read all suppliers
router.get("/", (req, res) => {
  const db = getDb();
  db.collection("suppliers")
    .find()
    .toArray((err, items) => {
      if (err) {
        res.status(500).json({ error: "Failed to retrieve suppliers" });
        return;
      }
      res.json(items);
    });
});

// Read a single supplier by ID
router.get("/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  db.collection("suppliers").findOne({ _id: new ObjectID(id) }, (err, item) => {
    if (err) {
      res.status(500).json({ error: "Failed to retrieve supplier" });
      return;
    }
    if (!item) {
      res.status(404).json({ error: "Supplier not found" });
      return;
    }
    res.json(item);
  });
});

// Update a supplier by ID
router.put("/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { name, contact } = req.body;
  db.collection("suppliers").updateOne(
    { _id: new ObjectID(id) },
    { $set: removeNullUndefined({ name, contact }) },
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Failed to update supplier" });
        return;
      }
      res.json(result); // Return the full result object
    }
  );
});

// Delete a supplier by ID
router.delete("/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;

  db.collection("suppliers").deleteOne(
    { _id: new ObjectID(id) },
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Failed to delete supplier" });
        return;
      }
      res.status(204).send();
    }
  );
});

module.exports = router;

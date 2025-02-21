const express = require("express");
const router = express.Router();
const { dynamodb } = require("../models/connection");
const config = require("../config");
const crypto = require("crypto");
const mapValidKeysToString = (obj) =>
  Object.keys(obj)
    .map((key) => `${key === "name" ? `#${key}` : key} = :${key}`)
    .join(", ");

// Create a new client
router.post("/", (req, res) => {
  const { name, email } = req.body;
  const id = `ID|${crypto.randomUUID()}`;
  const params = {
    TableName: config.dynamodb.tableName,
    Item: { id, name, email },
  };

  dynamodb.put(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to create client" });
      return;
    }
    res.status(201).json(params.Item);
  });
});

// Read all clients
router.get("/", (req, res) => {
  const params = {
    TableName: config.dynamodb.tableName,
  };

  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to retrieve clients" });
      return;
    }
    res.json(data.Items);
  });
});

// Read a single client by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const params = {
    TableName: config.dynamodb.tableName,
    Key: { id },
  };

  dynamodb.get(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to retrieve client" });
      return;
    }
    if (!data.Item) {
      res.status(404).json({ error: "Client not found" });
      return;
    }
    res.json(data.Item);
  });
});

// Update a client by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const params = {
    TableName: config.dynamodb.tableName,
    Key: { id },
    UpdateExpression: `set ${mapValidKeysToString(req.body)}`,
    ExpressionAttributeNames: { "#name": "name" },
    ExpressionAttributeValues: { ":name": name, ":email": email },
    ReturnValues: "ALL_NEW",
  };
  console.log(`update params are ${JSON.stringify(params)}`);
  dynamodb.update(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to update client" });
      return;
    }
    res.json(data.Attributes);
  });
});

// Delete a client by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const params = {
    TableName: config.dynamodb.tableName,
    Key: { id },
  };

  dynamodb.delete(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to delete client" });
      return;
    }
    res.status(204).send();
  });
});

module.exports = router;

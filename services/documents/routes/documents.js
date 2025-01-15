const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const multer = require("multer");
const config = require("../config");

const s3 = new AWS.S3({
  ...config.s3,
  s3ForcePathStyle: true,
});

const upload = multer({ storage: multer.memoryStorage() });

// Upload a document
router.post("/", upload.single("file"), (req, res) => {
  const params = {
    Bucket: config.s3.bucketName,
    Key: req.file.originalname,
    Body: req.file.buffer,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to upload document" });
      return;
    }
    res.status(201).json(data);
  });
});

// Read all documents
router.get("/", (req, res) => {
  const params = {
    Bucket: config.s3.bucketName,
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to retrieve documents" });
      return;
    }
    res.json(data.Contents);
  });
});

// Read a single document by key
router.get("/:key", (req, res) => {
  const { key } = req.params;
  const params = {
    Bucket: config.s3.bucketName,
    Key: key,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to retrieve document" });
      return;
    }
    res.send(data.Body);
  });
});

// Delete a document by key
router.delete("/:key", (req, res) => {
  const { key } = req.params;
  const params = {
    Bucket: config.s3.bucketName,
    Key: key,
  };

  s3.deleteObject(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to delete document" });
      return;
    }
    res.status(204).send();
  });
});

module.exports = router;

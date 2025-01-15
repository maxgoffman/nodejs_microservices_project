const { MongoClient } = require("mongodb");
const config = require("../config");

const client = new MongoClient(config.mongodb.url, {
  useUnifiedTopology: true,
});

let db;

client.connect((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
  db = client.db(config.mongodb.databaseName);
  console.log("Connected to MongoDB");
});

module.exports = {
  getDb: () => db,
};

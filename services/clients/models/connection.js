const AWS = require("aws-sdk");
const config = require("../config");

console.log(`Dynamo DB config ${JSON.stringify(config.dynamodb)}`);
AWS.config.update(config.dynamodb);

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = {
  dynamodb,
};

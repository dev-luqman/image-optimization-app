'use strict';
// import * as AWS from 'aws-sdk';
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
const table_name = process.env.IMAGE_TABLE;

const createImageHandler = async (todoItem) => {
  await docClient
    .put({
      TableName: table_name,
      Item: todoItem,
    })
    .promise();
  return todoItem;
};

module.exports = { createImageHandler };

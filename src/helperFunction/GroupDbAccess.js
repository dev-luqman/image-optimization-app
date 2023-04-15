'use strict';
// import * as AWS from 'aws-sdk';
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
const table_name = process.env.GROUP_TABLE;

const createGroupHandler = async (groupItem) => {
  await docClient
    .put({
      TableName: table_name,
      Item: groupItem,
    })
    .promise();
  return groupItem;
};

module.exports = { createGroupHandler };

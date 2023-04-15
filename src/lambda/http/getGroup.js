'use strict';
// import * as AWS from 'aws-sdk';
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
const table_name = process.env.GROUP_TABLE;

module.exports.handler = async (event) => {
  console.log('Start Processing Group Collection...', event);

  const result = await docClient
    .scan({
      TableName: table_name,
    })
    .promise();

  const items = result.Items;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'GET ALL GROUP',
      items,
    }),
  };
};

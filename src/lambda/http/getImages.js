'use strict';
// import * as AWS from 'aws-sdk';
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
const table_name = process.env.IMAGE_TABLE;

module.exports.handler = async (event) => {
  console.log('Start Processing Image Collection...', event);

  const result = await docClient
    .scan({
      TableName: table_name,
    })
    .promise();

  console.log(result);

  const items = result.Items;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'GET ALL IMAGES',
      items,
    }),
  };
};

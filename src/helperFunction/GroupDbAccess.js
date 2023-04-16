'use strict';
// import * as AWS from 'aws-sdk';
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
const table_name = process.env.GROUP_TABLE;
const image_name = process.env.IMAGES_TABLE;

const createGroupHandler = async (groupItem) => {
  await docClient
    .put({
      TableName: table_name,
      Item: groupItem,
    })
    .promise();
  return groupItem;
};

const createImagesHandler = async (imageItem) => {
  console.log('create Table', imageItem);
  await docClient
    .put({
      TableName: image_name,
      Item: imageItem,
    })
    .promise();
  return imageItem;
};

module.exports = { createGroupHandler, createImagesHandler };

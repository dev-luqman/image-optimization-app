'use strict';
// import * as AWS from 'aws-sdk';
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
const index_images_table = process.env.IMAGE_ID_INDEX;
const images_table = process.env.IMAGES_TABLE;

module.exports.handler = async (event) => {
  console.log('Start Processing Each Image Collection...', event);

  const imageId = event.pathParameters.imageId;

  const result = await getEachImageHandler(imageId);

  if (result.Count > 0) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'GET EACH IMAGE',
        items: result.Items,
      }),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      error: 'ImageId does not exist',
    }),
  };
};

const getEachImageHandler = async (imageId) => {
  const result = await docClient
    .query({
      TableName: images_table,
      IndexName: index_images_table,
      KeyConditionExpression: 'imageId = :imageId',
      ExpressionAttributeValues: {
        ':imageId': imageId,
      },
      ScanIndexForward: false,
    })
    .promise();

  return result;
};

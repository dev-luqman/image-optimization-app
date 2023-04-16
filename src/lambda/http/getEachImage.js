'use strict';
// import * as AWS from 'aws-sdk';
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
const index_images_table = process.env.IMAGE_ID_INDEX;

module.exports.handler = async (event) => {
  console.log('Start Processing Each Image Collection...', event);

  const imageId = event.pathParameters.imageId;

  const result = await getEachImageHandler(imageId);

  console.log(result);

  if (result.Item.length > 0) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'GET EACH IMAGE',
        items: result.Item,
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
  console.log('imageId', imageId);
  const result = await docClient
    .query({
      TableName: index_images_table,
      KeyConditionExpression: 'imageId = :imageId',
      ExpressionAttributeValues: {
        ':imageId': imageId,
      },
      ScanIndexForward: false,
    })
    .promise();
  console.log('result', result);

  return result;
};

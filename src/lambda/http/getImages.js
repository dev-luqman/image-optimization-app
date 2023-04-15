'use strict';
// import * as AWS from 'aws-sdk';
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
const images_table = process.env.IMAGES_TABLE;
const group_table = process.env.GROUP_TABLE;

module.exports.handler = async (event) => {
  console.log('Start Processing Images Collection...', event);

  const groupId = event.pathParameters.groupId;

  const validGroupId = await groupExit(groupId);
  console.log('valid Group id', validGroupId);

  if (!validGroupId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'GroupId does not exist',
      }),
    };
  }

  //Fetch images
  const images = getImagesPerGroup(groupId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'GET ALL IMAGE',
      items: images,
    }),
  };
};

const groupExit = async (groupId) => {
  const result = await docClient
    .get({
      TableName: group_table,
      Key: {
        id: groupId,
      },
    })
    .promise();

  console.log('result', result);

  return !!result.Item;
};

const getImagesPerGroup = async (groupId) => {
  const result = await docClient
    .query({
      TableName: images_table,
      KeyConditionExpression: 'groupId = :groupId',
      ExpressionAttributeValues: {
        ':groupId': groupId,
      },
      ScanIndexForward: false,
    })
    .promise();

  return result;
};

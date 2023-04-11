'use strict';
// import * as AWS from 'aws-sdk';
// const AWS = require('aws-sdk');

// const docClient = new AWS.DynamoDB.DocumentClient();
// const table_name = process.env.IMAGE_TABLE;

import { createImageHandler } from '../../helperFunction/imageDbAccess';

module.exports.handler = async (event) => {
  console.log('Start Creating Image Collection...', event);

  let image = JSON.parse(event.body);

  let ImageItems = {
    image: image.imageUrl,
    createdAt: new Date().toISOString(),
  };

  const result = await createImageHandler(ImageItems);

  // const result = await docClient
  //   .put({
  //     TableName: table_name,
  //     Item: ImageItems,
  //   })
  //   .promise();

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

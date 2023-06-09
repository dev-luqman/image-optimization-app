'use strict';

const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
const { uuid } = require('uuidv4');

const GroupDbAccess = require('../../helperFunction/GroupDbAccess.js');
const {
  S3BucketImageUpload,
} = require('../../helperFunction/attachmentUtil.js');

const group_table = process.env.GROUP_TABLE;

module.exports.handler = async (event) => {
  console.log('Start Creating Image Collection...', event);

  let imageData = JSON.parse(event.body);
  const groupId = event.pathParameters.groupId;

  // check if groupId exit
  const validGroupId = await groupExit(groupId);

  console.log('validGroupId', validGroupId);

  if (!validGroupId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'GroupId does not exist',
      }),
    };
  }

  let imageId = uuid();

  const s3BucketUrl = S3BucketImageUpload(imageId);
  let ImageItems = {
    groupId: groupId,
    imageUrl: s3BucketUrl.uploadUrl,
    imageId: imageId,
    timestamp: new Date().toISOString(),
  };

  const result = await GroupDbAccess.createImagesHandler(ImageItems);

  console.log(result);
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Create Image successfully',
      item: result,
      uploadedUrl: s3BucketUrl.s3SignedUrl,
    }),
  };
};

const groupExit = async (groupId) => {
  console.log('groupExit', groupId);

  const result = await docClient
    .get({
      TableName: group_table,
      Key: {
        id: groupId,
      },
    })
    .promise();

  return !!result.Item;
};

'use strict';

const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const connectionsTable = process.env.CONNECTIONS_TABLE;
const stage = process.env.STAGE;
const apiId = process.env.API_ID;

const connectionParams = {
  apiVersion: '2018-11-29',
  endpoint: `${apiId}.execute-api.us-east-1.amazonaws.com/${stage}`,
};

const apiGateway = new AWS.ApiGatewayManagementApi(connectionParams);
module.exports.handler = async (event) => {
  console.log('Start Printing S3 Collection...', event);
  for (const record of event.Records) {
    const key = record.s3.object.key;
    console.log('Processing S3 event', key);

    //Scan for all connection in connectionTable
    const connections = await docClient
      .scan({
        TableName: connectionsTable,
      })
      .promise();

    const payload = {
      imageId: key,
    };

    for (const connection of connections.Items) {
      const connectionId = connection.id;
      await sendMessageToClient(connectionId, payload);
    }
  }
};

async function sendMessageToClient(connectionId, payload) {
  try {
    console.log('Sending message to a connection', connectionId);

    await apiGateway
      .postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify(payload),
      })
      .promise();
  } catch (e) {
    console.log('Failed to send message', JSON.stringify(e));
    if (e.statusCode === 410) {
      console.log('Stale connection');

      await docClient
        .delete({
          TableName: connectionsTable,
          Key: {
            id: connectionId,
          },
        })
        .promise();
    }
  }
}

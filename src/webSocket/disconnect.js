const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const connectionsTable = process.env.CONNECTIONS_TABLE;

module.exports.handler = async (event) => {
  console.log('Websocket disconnect', event);

  const connectionId = event.requestContext.connectionId;
  const key = {
    id: connectionId,
  };

  console.log('Removing item with key: ', key);

  await docClient
    .delete({
      TableName: connectionsTable,
      Key: key,
    })
    .promise();

  return {
    statusCode: 200,
    body: '',
  };
};

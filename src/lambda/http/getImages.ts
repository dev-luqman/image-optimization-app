// import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
export const handler = () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      images: 'Fetch Images',
    }),
  };
};

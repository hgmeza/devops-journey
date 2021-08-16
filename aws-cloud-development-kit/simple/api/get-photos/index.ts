import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

const getPhotos = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {
  return {
    statusCode: 200,
    body: "Hello World"
  }
};

export { getPhotos };
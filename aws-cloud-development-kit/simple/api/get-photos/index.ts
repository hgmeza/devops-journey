import { APIGatewayProxyEventV2 } from "aws-lambda";

import { S3 } from "aws-sdk";

const s3 = new S3();

const createUrl = async (asset: S3.Object) => {
  const url = await s3.getSignedUrlPromise("getObject", {
    Bucket: process.env.PHOTO_BUCKET_NAME!,
    Key: asset.Key,
    Expires: 24 * 60 * 60,
  });

  return {
    filename: asset.Key,
    url,
  };
};

const getPhotos = async (event: APIGatewayProxyEventV2) => {
  try {
    const { Contents } = await s3
      .listObjectsV2({ Bucket: process.env.PHOTO_BUCKET_NAME! })
      .promise();
    const photos = await Promise.all(Contents!.map(res => createUrl(res)));
    return {
      statusCode: 200,
      body: JSON.stringify({ photos }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "something bad happened" }),
    };
  }
};

export { getPhotos };

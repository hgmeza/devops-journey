import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import * as lambda from "@aws-cdk/aws-lambda-nodejs"
import { Runtime } from '@aws-cdk/aws-lambda';
import path from "path";

export class SimpleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucket = new Bucket(this, 'MyFirstCDKBucket', {
      encryption: BucketEncryption.S3_MANAGED
    });

    const getPhotos = new lambda.NodejsFunction(this, "MyFirstCDKLambda", {
      runtime: Runtime.NODEJS_14_X,
      entry: path.join(__dirname, "../api/get-photos/index.ts"),
      handler: "getPhotos",
    });

    new cdk.CfnOutput(this, "MyFirstCDKBucketExport", {
      value: bucket.bucketName,
      exportName: "MyFirstCDKBucketName"
    })
  }
}

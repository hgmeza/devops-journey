import { Bucket, BucketEncryption } from "@aws-cdk/aws-s3";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda-nodejs";
import { Runtime } from "@aws-cdk/aws-lambda";
import path from "path";
import { BucketDeployment, Source } from "@aws-cdk/aws-s3-deployment";
import { PolicyStatement } from "@aws-cdk/aws-iam";
import { CorsHttpMethod, HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { CloudFrontWebDistribution } from "@aws-cdk/aws-cloudfront";
export class SimpleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucket = new Bucket(this, "MyFirstCDKBucket", {
      encryption: BucketEncryption.S3_MANAGED,
    });

    new BucketDeployment(this, "MyFirstAppPhotos", {
      sources: [Source.asset(path.join(__dirname, "../photos"))],
      destinationBucket: bucket,
    });

    const bucketPermissions = new PolicyStatement();
    bucketPermissions.addResources(bucket.bucketArn);
    bucketPermissions.addActions("s3:ListBucket");

    const bucketPolicy = new PolicyStatement();
    bucketPolicy.addResources(`${bucket.bucketArn}/*`);
    bucketPolicy.addActions("s3:GetObject", "s3:PutObject");

    const websiteBucket = new Bucket(this, "MyFirstWebsiteBucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
    });

    const cloudfront = new CloudFrontWebDistribution(this, "MyFirstCDN", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: websiteBucket,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });

    new BucketDeployment(this, "MyFirstWebsiteBucketDeployment", {
      sources: [Source.asset(path.join(__dirname, "../frontend/build"))],
      destinationBucket: websiteBucket,
      distribution: cloudfront,
    });

    const getPhotos = new lambda.NodejsFunction(this, "MyFirstCDKLambda", {
      runtime: Runtime.NODEJS_14_X,
      entry: path.join(__dirname, "../api/get-photos/index.ts"),
      handler: "getPhotos",
      environment: {
        PHOTO_BUCKET_NAME: bucket.bucketName,
      },
    });

    getPhotos.addToRolePolicy(bucketPermissions);
    getPhotos.addToRolePolicy(bucketPolicy);

    const httpApi = new HttpApi(this, "MyFirstCDKApi", {
      corsPreflight: {
        allowOrigins: ["*"],
        allowMethods: [CorsHttpMethod.GET],
      },
      apiName: "photo-api",
      createDefaultStage: true,
    });

    const lambdaIntegration = new LambdaProxyIntegration({
      handler: getPhotos,
    });

    httpApi.addRoutes({
      path: "/get-photos",
      methods: [HttpMethod.GET],
      integration: lambdaIntegration,
    });

    new cdk.CfnOutput(this, "MyFirstCDKBucketOutput", {
      value: bucket.bucketName,
      exportName: "MyFirstCDKBucketName",
    });

    new cdk.CfnOutput(this, "MyFirstCDKApiOutput", {
      value: httpApi.url!,
      exportName: "MyFirstCDKApiEndpoint",
    });

    new cdk.CfnOutput(this, "MyFirstCDKWebsiteBucketOutput", {
      value: websiteBucket.bucketName,
      exportName: "MyFirstCDKWebsiteBucketName",
    });

    new cdk.CfnOutput(this, "MyFirstCDKCDNOutput", {
      value: cloudfront.distributionDomainName,
      exportName: "MyFirstCDKCDNUrl",
    });
  }
}

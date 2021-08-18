import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as Simple from "../lib/simple-stack";
import "@aws-cdk/assert/jest";

test("Simple Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Simple.SimpleStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {
          MyFirstCDKBucketC899BE56: {
            Type: "AWS::S3::Bucket",
            Properties: {
              BucketEncryption: {
                ServerSideEncryptionConfiguration: [
                  {
                    ServerSideEncryptionByDefault: {
                      SSEAlgorithm: "AES256",
                    },
                  },
                ],
              },
            },
            UpdateReplacePolicy: "Retain",
            DeletionPolicy: "Retain",
          },
        },
        Outputs: {
          MyFirstCDKBucketExport: {
            Value: {
              Ref: "MyFirstCDKBucketC899BE56",
            },
            Export: {
              Name: "MyFirstCDKBucketName",
            },
          },
        },
      },
      MatchStyle.EXACT,
    ),
  );
});

test("Creating a s3 bucket", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Simple.SimpleStack(app, "MyTestStack");
  // THEN
  expect(stack).toHaveResource("AWS::S3::Bucket");
});

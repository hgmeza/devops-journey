# Simple CDK App

Simple App that deploys a small api, and a client, that displays Mario pictures (I love playing Super Mario Maker 2, btw).

Deployed project viewable [here](https://d31end5humsiwl.cloudfront.net/)

NOTE: This is a monorepo architecture for simplicity purposes for this project.

## Frontend

created with CRA.
create an `.env` file and add:

- `SKIP_PREFLIGHT_CHECK=true` (this is because there is conflict with Jest on this monorepo)
- `REACT_APP_API_URL={your-cdk-api-output}`

## Backend

Nodejs function

## Resources

This CDK project creates:

- S3 Bucket that stores images (and upload images upon deployment)
- IAM policies so that it can list and get objects from images bucket
- S3 Bucket that hosts the frontend
- Lambda Function with the Nodejs code
- API Gateway /GET that targets the lambda function
- CloudFormation CDN that targets the website url from the frontend bucket

## Key Takeaway

- Always, but _always_ make sure that your cdk related packages have the same version, otherwise unexpected behaviours/bugs will arise.
- Always, but _always_ make sure that your cdk related packages have the same version, otherwise unexpected behaviours/bugs will arise.
- When in doubt, just run command

```bash
cdk doc
```

- Always, but _always_ make sure that your cdk related packages have the same version, otherwise unexpected behaviours/bugs will arise.

## Deploying Full Stack App

- `yarn build` on the `frontend` folder (make sure to have the envs)
- go back to root
- `cdk deploy`

## Testing

### Method 1

- Create a folder named `templates`
- run:

```bash
cdk synthesize --output=./templates
```

- copy/paste template (Resources and Outputs) into test file
- remove any Metadata

### Method 2

Just use `Jest` from `"@aws-cdk/assert/jest"` and write a readable test like

```javascript
expect(stack).toHaveResource("AWS::S3::Bucket");
```

## Favorite Commands

- `cdk diff`
- `cdk deploy`
- `cdk synth`
- `npm install @aws-cdk/whatever-you-need@SAME.VERSION`

<img src="./photos/Bowser.png" />

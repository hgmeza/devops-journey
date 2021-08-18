# Simple CDK App

Documenting learnings using AWS CDK

## Key Takeaway

- Always, but _always_ make sure that your cdk related packages have the same version, otherwise unexpected behaviours/bugs will arise.
- Always, but _always_ make sure that your cdk related packages have the same version, otherwise unexpected behaviours/bugs will arise.
- When in doubt, just run command

```bash
cdk doc
```

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

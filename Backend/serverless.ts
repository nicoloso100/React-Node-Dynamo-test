import { createEmail } from "@functions/email";
import {
  createRecord,
  getAllRecords,
  updateRecord,
  deleteRecord,
} from "@functions/records";
import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  org: "nicoloso100",
  app: "lite-thinking-test",
  service: "backend-lite-thinking",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
            ],
            Resource: "arn:aws:dynamodb:us-east-1:*:table/RecordsTable",
          },
          {
            Effect: "Allow",
            Action: [
              "sqs:SendMessage",
              "sqs:ReceiveMessage",
              "sqs:DeleteMessage",
              "sqs:GetQueueAttributes",
            ],
            Resource: "arn:aws:sqs:us-east-1:895386959211:lite-thinking-email",
          },
          {
            Effect: "Allow",
            Action: ["ses:SendEmail"],
            Resource:
              "arn:aws:ses:us-east-1:895386959211:identity/nicolas.angaritao@unilibrebog.edu.co",
          },
          {
            Effect: "Allow",
            Action: ["ses:SendEmail"],
            Resource:
              "arn:aws:ses:us-east-1:895386959211:identity/nico.las0315@hotmail.com",
          },
        ],
      },
    },
  },
  functions: {
    createRecord,
    getAllRecords,
    updateRecord,
    deleteRecord,
    createEmail,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev",
    },
  },
  resources: {
    Resources: {
      TodosTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "RecordsTable",
          AttributeDefinitions: [
            {
              AttributeName: "business_id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "business_id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
};
module.exports = serverlessConfiguration;

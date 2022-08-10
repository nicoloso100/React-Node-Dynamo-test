import { SQS } from "aws-sdk";

const sqs = new SQS();

export default class SQSService {
  async sendSqsMessage(body: string) {
    const queueUrl: string = `https://sqs.us-east-1.amazonaws.com/895386959211/lite-thinking-email`;

    await sqs
      .sendMessage({
        QueueUrl: queueUrl,
        MessageBody: body,
      })
      .promise();
  }
}

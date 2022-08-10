import SESService from "./ses-sender.service";
import SQSService from "./sqs-sender.service";

export const sqsService = new SQSService();

export const sesService = new SESService();

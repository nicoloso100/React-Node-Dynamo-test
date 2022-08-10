import { formatJSONError, formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";

import recordsService from "src/service/records";
import Record from "src/model/record";
import { sqsService } from "src/service/email";

export const getAllRecords = middyfy(
  async (): Promise<APIGatewayProxyResult> => {
    try {
      const records = await recordsService.getAllRecords();
      return formatJSONResponse(records);
    } catch (e) {
      return formatJSONError(e);
    }
  }
);

export const createRecord = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = v4();
    try {
      const record = await recordsService.createRecord({
        business_id: id,
        name: event.body["name"],
        address: event.body["address"],
        nit: event.body["nit"],
        phone_number: event.body["phone_number"],
      });
      await sqsService.sendSqsMessage(JSON.stringify(record));
      return formatJSONResponse(record);
    } catch (e) {
      return formatJSONError(e);
    }
  }
);

export const updateRecord = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const body: Record = {
        business_id: id,
        name: event.body["name"],
        address: event.body["address"],
        nit: event.body["nit"],
        phone_number: event.body["phone_number"],
      };
      const record = await recordsService.updateRecord(id, body);
      return formatJSONResponse({
        record,
        id,
      });
    } catch (e) {
      return formatJSONError(e);
    }
  }
);

export const deleteRecord = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      await recordsService.deleteRecord(id);
      return formatJSONResponse({
        id,
      });
    } catch (e) {
      return formatJSONError(e);
    }
  }
);

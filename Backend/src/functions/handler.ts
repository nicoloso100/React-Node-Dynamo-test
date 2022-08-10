import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";

import recordsService from "src/service";

export const getAllRecords = middyfy(
  async (): Promise<APIGatewayProxyResult> => {
    const records = await recordsService.getAllRecords();

    return formatJSONResponse({
      records,
    });
  }
);

export const createRecord = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const id = v4();
      const record = await recordsService.createRecord({
        business_id: id,
        name: event.body["name"],
        address: event.body["address"],
        nit: event.body["nit"],
        phone_number: event.body["phone_number"],
      });
      return formatJSONResponse({
        record,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

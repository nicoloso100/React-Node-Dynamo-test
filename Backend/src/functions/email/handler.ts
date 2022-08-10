import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Record from "src/model/record";
import { sesService } from "src/service/email";

export const createEmail = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const body = event["Records"][0].body;
    const json = JSON.parse(body) as Record;
    await sesService.sendSesMessage(json.name);
    return formatJSONResponse({
      event,
    });
  }
);

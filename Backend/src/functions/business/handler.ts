import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyResult } from "aws-lambda";

export const getTest = middyfy(async (): Promise<APIGatewayProxyResult> => {
  return formatJSONResponse({
    response: "Hola",
  });
});

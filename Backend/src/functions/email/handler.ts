import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent } from "aws-lambda";

export const createEmail = middyfy(
  async (event: APIGatewayProxyEvent): Promise<void> => {
    console.log(event.body);
  }
);

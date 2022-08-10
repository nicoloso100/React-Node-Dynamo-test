import { handlerPath } from "@libs/handler-resolver";
import { createRecordSchema } from "./schema";

export const getAllRecords = {
  handler: `${handlerPath(__dirname)}/handler.getAllRecords`,
  events: [
    {
      http: {
        method: "get",
        path: "get-all-records/",
      },
    },
  ],
};

export const createRecord = {
  handler: `${handlerPath(__dirname)}/handler.createRecord`,
  events: [
    {
      http: {
        method: "post",
        path: "create-record/",
        request: {
          schemas: {
            "application/json": createRecordSchema,
          },
        },
      },
    },
  ],
};

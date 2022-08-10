import { handlerPath } from "@libs/handler-resolver";
import { createRecordSchema } from "./schema";

export const getAllRecords = {
  handler: `${handlerPath(__dirname)}/handler.getAllRecords`,
  events: [
    {
      http: {
        method: "get",
        path: "records/get-all-records/",
        cors: true,
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
        path: "records/create-record/",
        cors: true,
        request: {
          schemas: {
            "application/json": createRecordSchema,
          },
        },
      },
    },
  ],
};

export const updateRecord = {
  handler: `${handlerPath(__dirname)}/handler.updateRecord`,
  events: [
    {
      http: {
        method: "put",
        path: "records/update-record/{id}",
        cors: true,
        request: {
          schemas: {
            "application/json": createRecordSchema,
          },
        },
      },
    },
  ],
};

export const deleteRecord = {
  handler: `${handlerPath(__dirname)}/handler.deleteRecord`,
  events: [
    {
      http: {
        method: "delete",
        path: "records/delete-record/{id}",
        cors: true,
      },
    },
  ],
};

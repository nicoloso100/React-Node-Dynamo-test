import { handlerPath } from "@libs/handler-resolver";
import { createEmailSchema } from "./schema";

export const createEmail = {
  handler: `${handlerPath(__dirname)}/handler.createEmail`,
  events: [
    {
      http: {
        method: "post",
        path: "email/create-email/",
        cors: true,
        request: {
          schemas: {
            "application/json": createEmailSchema,
          },
        },
      },
    },
  ],
};

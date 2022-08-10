import { handlerPath } from "../../libs/handler-resolver";

export const getTest = {
  handler: `${handlerPath(__dirname)}/handler.getTest`,
  events: [
    {
      http: {
        method: "get",
        path: "test/",
      },
    },
  ],
};

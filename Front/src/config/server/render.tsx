import { APIGatewayEvent } from "aws-lambda";
import * as React from "react";
import { renderToString } from "react-dom/server";
import ConfigContext from "src/state/ConfigContext";

import App from "../../App";
import config from "./config";
import html from "./html";
import { Stats } from "./types";

export default async function render(_event: APIGatewayEvent): Promise<string> {
  const stats = (await import("../../../dist/stats.json")) as unknown as Stats;
  const content = renderToString(
    <ConfigContext.Provider value={config}>
      <App />
    </ConfigContext.Provider>,
  );
  return html({ stats, content, config });
}

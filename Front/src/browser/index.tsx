import "core-js/stable";
import "regenerator-runtime/runtime";

import "./index.css";

import * as React from "react";
import { hydrate } from "react-dom";

import ConfigContext from "../components/ConfigContext";
import { Config } from "../server/config";
import App from "../App";

const config = (window as any).__CONFIG__ as Config;
delete (window as any).__CONFIG__;

const render = () => {
  hydrate(
    <>
      <ConfigContext.Provider value={config}>
        <App />
      </ConfigContext.Provider>
    </>,
    document.getElementById("root"),
  );
};

render();

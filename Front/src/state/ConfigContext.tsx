import { createContext } from "react";

import { Config } from "../config/server/config";

const ConfigContext = createContext<Config | undefined>(undefined);

export default ConfigContext;

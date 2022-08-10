import { useContext } from "react";

import { Config } from "../config/server/config";
import ConfigContext from "./ConfigContext";

export default function useConfig(): Config {
  const config = useContext(ConfigContext);
  if (!config) {
    throw new Error("Configuration context not initialized!");
  }
  return config;
}

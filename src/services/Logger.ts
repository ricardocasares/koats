import pino, { LoggerOptions } from "pino";
import { isTest } from "@/lib/env";

export const Logger = pino({
  name: "csa",
  enabled: !isTest(),
  level: "info"
});

export default Logger;

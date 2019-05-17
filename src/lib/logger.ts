import pino from "pino";
import { isTest } from "./env";

export const logger = pino({
  name: "csa",
  enabled: !isTest()
});

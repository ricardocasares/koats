import pino from "koa-pino-logger";
import helmet from "koa-helmet";
import { Dependencies } from "@/models";
import router from "@/router";
import errors from "@/middleware/errors";
import Logger from "@/services/Logger";
import Koa from "koa";
import { App } from "@/models";

export const createApp = (deps: Dependencies) => {
  const app: App = new Koa();
  // set dependencies
  app.context.di = deps;

  // add middleware
  return app
    .use(helmet())
    .use(errors)
    .use(pino({ logger: Logger }))
    .use(router.routes());
};

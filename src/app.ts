import pino from "koa-pino-logger";
import helmet from "koa-helmet";

import { app } from "@/koa";
import { logger } from "@/lib/logger";
import { Dependencies } from "@/models";
import router from "@/router";
import errors from "@/middleware/errors";

export const createApp = (deps: Dependencies) => {
  // set dependencies
  app.context.dc = deps;
  // add middleware
  return app
    .use(helmet())
    .use(errors)
    .use(pino({ logger: logger }))
    .use(router.routes());
};

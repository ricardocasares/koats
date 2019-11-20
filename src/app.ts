import kh from "koa-helmet";
import pino from "koa-pino-logger";

import { app } from "@/koa";
import { logger } from "@/lib/logger";
import { router } from "@/router";
import { errors } from "@/middleware/errors";
import { tracer } from "@/middleware/tracer";
import { Dependencies } from "@/models";

export const createApp = (deps: Dependencies) => {
  // set dependencies
  app.context.dc = deps;
  // add middleware
  return app
    .use(kh())
    .use(
      tracer({
        config: {
          serviceName: "koats",
          sampler: {
            type: "const",
            param: 1.0
          }
        },
        options: { logger, tags: { version: "1.0.0" } }
      })
    )
    .use(errors)
    .use(pino({ logger }))
    .use(router.routes());
};

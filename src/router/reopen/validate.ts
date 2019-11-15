import { Middleware } from "koa";

export const validate: Middleware = async (ctx, next) => {
  ctx.log.info("validating input parameters");
  ctx.assert(ctx.params.id, 400, "Bad request");

  await next();
};

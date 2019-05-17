import { Middleware } from "@/models";

export const validate: Middleware = async (ctx, next) => {
  ctx.assert(ctx.params.id, 400, "Bad request");

  await next();
};

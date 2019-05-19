import { Middleware } from "@/models";

export const response: Middleware = async (ctx, next) => {
  ctx.body = { ...ctx.state.account };

  await next();
};

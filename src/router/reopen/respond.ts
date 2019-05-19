import { Middleware } from "@/models";

export const respond: Middleware = async (ctx, next) => {
  ctx.body = { ...ctx.state.account };

  await next();
};

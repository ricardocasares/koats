import { Middleware } from "@/models";

export const getAccountById: Middleware = async (ctx, next) => {
  ctx.log.info(`finding user by id: #${ctx.params.id}`);
  ctx.state.account = await ctx.dc.users.id(Number(ctx.params.id));

  await next();
};

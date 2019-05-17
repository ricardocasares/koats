import { Middleware } from "@/models";

export const getAccountByEmail: Middleware = async (ctx, next) => {
  ctx.log.info(`finding user by email: #${ctx.params.id}`);
  ctx.state.account = await ctx.dc.users.email(ctx.params.id);

  await next();
};

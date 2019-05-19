import { Middleware } from "@/models";

export const unlockAccount: Middleware = async (ctx, next) => {
  ctx.log.info(`unlocking user account: #${ctx.state.account.id}`);
  ctx.state.account = await ctx.dc.users.unlock(Number(ctx.params.id));

  await next();
};

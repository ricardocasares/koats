import { Middleware } from "@/models";

const user: Middleware = async (ctx, next) => {
  try {
    ctx.di.log.info(`unlocking user account: #${ctx.state.account.id}`);
    ctx.state.account = await ctx.di.users.unlock(Number(ctx.params.id));

    await next();
  } catch (err) {
    ctx.throw(401, { message: "Unable to unlock the account" });
  }
};

export default user;

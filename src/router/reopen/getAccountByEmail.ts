import { Middleware } from "@/models";

const user: Middleware = async (ctx, next) => {
  ctx.di.log.info(`finding user by email: #${ctx.params.id}`);
  ctx.state.account = await ctx.di.users.email(ctx.params.id);

  await next();
};

export default user;

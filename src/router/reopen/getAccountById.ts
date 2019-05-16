import { Middleware } from "@/models";

const user: Middleware = async (ctx, next) => {
  try {
    ctx.di.log.info(`finding user by id: #${ctx.params.id}`);
    ctx.state.account = await ctx.di.users.id(Number(ctx.params.id));
  } catch (err) {
    ctx.di.log.error(err.message);
  }

  await next();
};

export default user;

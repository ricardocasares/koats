import { Middleware } from "@/models";

const email: Middleware = async (ctx, next) => {
  const email = await ctx.di.email.send(ctx.state.account.email);
  ctx.state.email = email;
  await next();
};

export default email;

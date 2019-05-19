import { Middleware } from "@/models";

export const sendEmail: Middleware = async (ctx, next) => {
  ctx.state.email = await ctx.dc.emails.send(ctx.state.account.email);

  await next();
};

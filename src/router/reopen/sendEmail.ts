import { Middleware } from "@/models";

export const sendEmail: Middleware = async (ctx, next) => {
  const email = await ctx.dc.emails.send(ctx.state.account.email);
  ctx.state.email = email;
  await next();
};

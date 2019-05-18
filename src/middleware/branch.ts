import { Middleware, Context } from "@/models";

export interface Predicate {
  (ctx: Context): boolean;
}

export const branch = (mw: Middleware) => (p: Predicate): Middleware => async (
  ctx,
  next
) => {
  p(ctx) ? await mw(ctx, next) : await next();
};

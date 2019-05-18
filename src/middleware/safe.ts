import { Middleware } from "@/models";

export const safe = (a: Middleware) => (b: Middleware): Middleware => async (
  ctx,
  next
) => {
  try {
    await a(ctx, next);
  } catch (err) {
    ctx.err = err;
    await b(ctx, next);
  }
};

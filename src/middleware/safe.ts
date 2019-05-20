import { Middleware } from "@/models";

export const safe = (a: Middleware) => (b: Middleware): Middleware => async (
  ctx,
  next
) => {
  let flag = false;

  const nextFn = async () => {
    flag = true;
    await next();
  };

  try {
    await a(ctx, nextFn);
  } catch (err) {
    ctx.err = err;

    if (flag) {
      throw err;
    }

    await b(ctx, next);
  }
};

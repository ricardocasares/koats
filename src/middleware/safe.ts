import { Middleware } from "@/models";

export const safe = (a: Middleware) => (b: Middleware): Middleware => async (
  ctx,
  next
) => {
  let flag = false;
  const call = async () => {
    flag = true;
    await next();
  };

  try {
    await a(ctx, call);
  } catch (err) {
    ctx.err = err;

    if (!flag) {
      await b(ctx, next);
    } else {
      throw err;
    }
  }
};

import { Middleware } from "koa";

export const measure = (mw: Middleware): Middleware => async (ctx, next) => {
  const time = Date.now();
  ctx.log.info("measuring...");

  const nextFn = async () => {
    const diff = Date.now() - time;
    ctx.log.info(
      { responseTime: diff },
      `${mw.name}: execution took ${diff}ms`
    );

    await next();
  };

  await mw(ctx, nextFn);
};

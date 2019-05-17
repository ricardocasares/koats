import { Middleware } from "@/models";

export const errors: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.type = "json";
    ctx.body = { status: err.status, message: err.message, state: ctx.state };
  }
};

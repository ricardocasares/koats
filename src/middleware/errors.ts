import { Middleware } from "@/models";

export const errors: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.type = "json";
    ctx.body = { status: err.status, message: err.message, state: ctx.state };

    // since we handled this manually we'll
    // want to delegate to the regular app
    // level error handling as well so that
    // centralized still functions correctly.
    // ctx.app.emit("error", err, ctx);
  }
};
export default errors;

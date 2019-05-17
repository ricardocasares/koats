import { Middleware } from "@/models";

export const sendResponse: Middleware = async (ctx, next) => {
  ctx.body = { message: "response sent", state: ctx.state };

  await next();
};

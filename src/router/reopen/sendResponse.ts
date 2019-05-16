import { Middleware } from "@/models";

const send: Middleware = async (ctx, next) => {
  ctx.body = { message: "response sent", state: ctx.state };

  await next();
};

export default send;

import compose from "koa-compose";
import { validate } from "./validate";
import { getAccount } from "./getAccount";
import { unlock } from "./unlock";
import { respond } from "./respond";
import { email } from "./email";
import { Middleware } from "@/models";

const mw: Middleware = async (ctx, next) => {
  ctx.log.info(ctx.data, "DATA");
  ctx.data = { fun: "tastic" };

  await next();
};

export const reopen = compose([
  mw,
  validate,
  getAccount,
  unlock,
  email,
  respond
]);

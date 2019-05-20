import compose from "koa-compose";
import { safe } from "@/middleware/safe";
import { branch } from "@/middleware/branch";
import { measure } from "@/middleware/measure";
import { getAccountById } from "@/middleware/getAccountById";
import { getAccountByEmail } from "@/middleware/getAccountByEmail";

const getAccountOrNext = safe(measure(getAccountById))(async (ctx, next) => {
  ctx.log.warn(ctx.err, "Failover to get by email");

  await next();
});

const safeGetAccountByEmail = safe(getAccountByEmail)(async ctx => {
  ctx.log.error(ctx.err, "Failed to get an account");
  ctx.throw(404, "Account not found");
});

const getAccountOr404 = branch(safeGetAccountByEmail);

export const getAccount = compose([
  getAccountOrNext,
  getAccountOr404(ctx => !ctx.state.account)
]);

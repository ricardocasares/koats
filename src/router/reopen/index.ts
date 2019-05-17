import { safe } from "@/middleware/safe";
import { branch } from "@/middleware/branch";
import { validate } from "./validate";
import { getAccountById } from "./getAccountById";
import { getAccountByEmail } from "./getAccountByEmail";
import { unlockAccount } from "./unlockAccount";
import { sendEmail } from "./sendEmail";
import { sendResponse } from "./sendResponse";

// @todo: next line should match a more specific error
const safeGetAccount = safe(async (ctx, next, err) => next());
const ifNoAccount = branch(ctx => !ctx.state.account);
const accountNotFound = safe(ctx => ctx.throw(404, "Account not found"));

export default [
  validate,
  safeGetAccount(getAccountById),
  ifNoAccount(accountNotFound(getAccountByEmail)),
  unlockAccount,
  sendEmail,
  sendResponse
];

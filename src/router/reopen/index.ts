import { safe } from "@/middleware/safe";
import { validate } from "./validate";
import { getAccountById } from "./getAccountById";
import { getAccountByEmail } from "./getAccountByEmail";
import { unlockAccount } from "./unlockAccount";
import { sendEmail } from "./sendEmail";
import { sendResponse } from "./sendResponse";

const getAccountOr = safe(getAccountById);
const accountNotFound = safe(getAccountByEmail)(ctx =>
  // @todo: this line should match a more specific error
  ctx.throw(404, "Account not found")
);

export const reopen = [
  validate,
  getAccountOr(accountNotFound),
  unlockAccount,
  sendEmail,
  sendResponse
];

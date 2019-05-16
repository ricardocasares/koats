import branch from "@/middleware/branch";
import getAccountById from "./getAccountById";
import getAccountByEmail from "./getAccountByEmail";
import unlockAccount from "./unlockAccount";
import sendEmail from "./sendEmail";
import sendResponse from "./sendResponse";

const accountNotFound = branch(ctx => !ctx.state.account);

export default [
  getAccountById,
  accountNotFound(getAccountByEmail),
  unlockAccount,
  sendEmail,
  sendResponse
];

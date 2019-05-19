import { safe } from "@/middleware/safe";
import { getAccountById } from "@/middleware/getAccountById";
import { getAccountByEmail } from "@/middleware/getAccountByEmail";

const getAccountOr = safe(getAccountById);
const accountNotFound = safe(getAccountByEmail)(ctx =>
  // @todo: this line should match a more specific error
  ctx.throw(404, "Account not found")
);

export const getAccount = getAccountOr(accountNotFound);

import { safe } from "@/middleware/safe";
import { unlockAccount } from "@/middleware/unlockAccount";

const safeUnlock = safe(unlockAccount);

export const unlock = safeUnlock(async ctx => {
  ctx.log.error(ctx.err, "Cannot unlock the account");
  ctx.throw(403, "Cannot unlock this account");
});

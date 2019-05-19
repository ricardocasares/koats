import { safe } from "@/middleware/safe";
import { unlockAccount } from "@/middleware/unlockAccount";

const safeUnlock = safe(unlockAccount);

export const unlock = safeUnlock(async (ctx, next) => {
  ctx.throw(403, "Cannot unlock this account");

  await next();
});

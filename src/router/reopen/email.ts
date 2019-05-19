import { safe } from "@/middleware/safe";
import { sendEmail } from "@/middleware/sendEmail";

const safeEmail = safe(sendEmail);

export const email = safeEmail(async (ctx, next) => {
  ctx.log.error(ctx.err, "Failed to send email");
  ctx.throw(500, "Email not sent");
  await next();
});

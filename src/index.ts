import { createApp } from "@/app";
import { logger } from "@/lib/logger";
import { UserService, EmailService } from "@/services";

export const app = createApp({
  users: new UserService(),
  emails: new EmailService()
})
  .listen(3000)
  .on("close", () => logger.info("close"))
  .on("error", err => logger.error(err))
  .on("connection", () => logger.info("connection"))
  .on("listening", () => logger.info("server started http://localhost:3000/"));

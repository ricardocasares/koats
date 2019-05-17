import { createApp } from "@/app";
import { logger } from "@/lib/logger";
import { UserService, EmailService } from "@/services";

export const app = createApp({
  users: new UserService(),
  emails: new EmailService()
})
  .listen(3000)
  .on("close", () => logger.info("close"))
  .on("error", () => logger.error("error"))
  .on("connection", () => logger.info("connection"))
  .on("listening", () => logger.info("server started http://localhost:3000/"));

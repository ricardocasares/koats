import compose from "koa-compose";
import { validate } from "./validate";
import { getAccount } from "./getAccount";
import { unlock } from "./unlock";
import { respond } from "./respond";
import { email } from "./email";
import { makeSpan } from "@/middleware/span";

const span = makeSpan({ env: "dev", region: "local" });

export const reopen = span(
  "GET.reopen",
  compose([
    span("validate", validate),
    span("getAccount", getAccount),
    span("unlockAccount", unlock),
    span("sendEmail", email),
    span("respond", respond)
  ])
);

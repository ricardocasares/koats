import compose from "koa-compose";
import { validate } from "./validate";
import { getAccount } from "./getAccount";
import { unlock } from "./unlock";
import { respond } from "./respond";
import { email } from "./email";

export const reopen = compose([validate, getAccount, unlock, email, respond]);

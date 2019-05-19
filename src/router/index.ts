import { router as KoaRouter } from "@/koa";
import { reopen } from "./reopen";

export const router = KoaRouter.get("/reopen/:id", reopen);

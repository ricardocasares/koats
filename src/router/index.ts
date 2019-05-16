import { router } from "@/koa";
import reopen from "./reopen";

export default router.get("/reopen/:id", ...reopen);

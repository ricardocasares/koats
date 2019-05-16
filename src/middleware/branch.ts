import { Middleware, Context } from "@/models";

export interface Condition {
  (ctx: Context): boolean;
}

export default function(condition: Condition) {
  return (middleware: Middleware): Middleware => {
    const mw: Middleware = async (ctx, next) => {
      if (condition(ctx)) {
        await middleware(ctx, next);
      } else {
        await next();
      }
    };

    return mw;
  };
}

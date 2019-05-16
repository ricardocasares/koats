import { Middleware } from "@/models";

export interface Condition {
  (err: Error): boolean;
}

export default function(condition: Condition) {
  return (middleware: Middleware): Middleware => {
    const mw: Middleware = async (ctx, next) => {
      try {
        await middleware(ctx, next);
      } catch (err) {
        if (condition(err)) {
          await next();
        } else {
          throw err;
        }
      }
    };

    return mw;
  };
}

import { Middleware, Context } from "@/models";

export interface Handler {
  (ctx: Context, next: () => Promise<any>, err: Error): void;
}

export const safe = (handler: Handler) => (
  middleware: Middleware
): Middleware => async (ctx, next) => {
  try {
    await middleware(ctx, next);
  } catch (err) {
    await handler(ctx, next, err);
  }
};

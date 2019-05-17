import { safe } from "./safe";
import { Context, Middleware } from "@/models";
import { createContext } from "@/test/utils";

describe("safe middleware", () => {
  let ctx: Context;
  let next: jest.Mock;

  beforeEach(() => {
    ctx = createContext({ called: false });
    next = jest.fn();
  });

  it("should not throw", async () => {
    const mw: Middleware = (ctx, next) => {
      throw new Error();
    };

    const safely = safe(async (ctx, next, err) => next());

    await safely(mw)(ctx, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should allow to throw", async () => {
    const mw: Middleware = (ctx, next) => {
      throw new Error("Not fun");
    };

    const safely = safe((ctx, err) => {
      throw new Error("Fun");
    });

    await expect(safely(mw)(ctx, next)).rejects.toThrow(/Fun/);
    expect(next).toHaveBeenCalledTimes(0);
  });

  it("should work when no errors are thrown", async () => {
    await safe(ctx => ctx.called)(async (ctx, next) => next())(ctx, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});

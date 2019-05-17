import { safe } from "./safe";
import { Context } from "@/models";
import { createContext } from "@/test/utils";

describe("safe middleware", () => {
  let ctx: Context;

  beforeEach(() => {
    ctx = createContext({ called: false });
  });

  it("should work", async () => {
    const next = jest.fn();
    const mw = (ctx: any, next: any) => {
      ctx.called = true;
      throw new Error();
    };

    const safely = safe((ctx, err) => !!err);

    await safely(mw)(ctx, next);
    expect(ctx.called).toBe(true);
    expect(next).toHaveBeenCalledTimes(0);
  });

  it("should fail if condition is not met", async () => {
    const next = jest.fn();
    const mw = (ctx: any, next: any) => {
      ctx.called = true;
      throw new Error();
    };

    const safely = safe((ctx, err) => !err);

    try {
      await safely(mw)(ctx, next);
      expect(next).toHaveBeenCalledTimes(0);
    } catch (err) {
      expect(ctx.called).toBe(true);
      expect(next).toHaveBeenCalledTimes(0);
    }
  });

  it("should work when no errors are thrown", async () => {
    const next = jest.fn();
    const mw = async (ctx: any, next: any) => {
      ctx.called = true;
      await next();
    };

    const safely = safe(ctx => ctx.called);
    await safely(mw)(ctx, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});

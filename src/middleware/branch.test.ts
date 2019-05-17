import { branch } from "./branch";
import { Context } from "@/models";
import { createContext } from "@/test/utils";

describe("branch middleware", () => {
  let ctx: Context;

  beforeEach(() => {
    ctx = createContext({ called: false });
  });

  it("should work", async () => {
    const next = jest.fn();
    const mw = async (ctx: any, next: any) => {
      ctx.called = true;
      await next();
    };
    const conditionally = branch(ctx => !ctx.called);

    await conditionally(mw)(ctx, next);
    expect(ctx.called).toBe(true);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should honor condition", async () => {
    const next = jest.fn();
    const mw = async (ctx: any, next: any) => {
      ctx.called = true;
      await next();
    };
    const conditionally = branch(ctx => ctx.called);

    await conditionally(mw)(ctx, next);
    expect(ctx.called).toBe(false);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should also fail", async () => {
    const next = jest.fn();
    const mw = async (ctx: any, next: any) => {
      ctx.called = true;
      throw new Error();
    };

    const conditionally = branch(ctx => !ctx.called);

    try {
      await conditionally(mw)(ctx, next);
      expect(ctx.called).toBe(false);
    } catch (err) {
      expect(ctx.called).toBe(true);
      expect(next).toHaveBeenCalledTimes(0);
    }
  });
});

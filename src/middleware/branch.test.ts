import { branch } from "./branch";
import { Context, Middleware } from "@/models";
import { createContext } from "@/test/utils";

const mw: Middleware = async (ctx, next) => {
  ctx.called = true;
  await next();
};

describe("branch middleware", () => {
  let ctx: Context;
  let next: jest.Mock;

  beforeEach(() => {
    ctx = createContext({ called: false });
    next = jest.fn();
  });

  it("should run the middleware when predicate is true", async () => {
    await branch(ctx => !ctx.called)(mw)(ctx, next);
    expect(ctx.called).toBe(true);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should not run the middleware when predicate is false", async () => {
    await branch(ctx => ctx.called)(mw)(ctx, next);
    expect(ctx.called).toBe(false);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should throw", async () => {
    const fails: Middleware = ctx => {
      throw new Error("Whoa!");
    };

    await expect(branch(ctx => !ctx.called)(fails)(ctx, next)).rejects.toThrow(
      /Whoa/
    );
    expect(next).toHaveBeenCalledTimes(0);
  });
});

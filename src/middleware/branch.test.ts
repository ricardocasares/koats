import { branch } from "./branch";
import { AppContext } from "@/models";
import { createContext } from "@/test/utils";

describe("branch middleware", () => {
  let ctx: AppContext;
  let mdw: jest.Mock;

  beforeEach(() => {
    ctx = createContext({ called: false });
    mdw = jest.fn();
  });

  it("should call the predicate with context", async () => {
    const p = jest.fn();
    const mock = jest.fn();

    await branch(p)(mock)(ctx, jest.fn());
    expect(mock).toHaveBeenCalledWith(ctx);
  });

  it("should call the middleware with ctx and next when true", async () => {
    const next = jest.fn();

    await branch(mdw)(() => true)(ctx, next);
    expect(mdw).toHaveBeenCalledWith(ctx, next);
  });

  it("should not call the middleware when false", async () => {
    await branch(mdw)(() => false)(ctx, jest.fn());
    expect(mdw).toHaveBeenCalledTimes(0);
  });
});

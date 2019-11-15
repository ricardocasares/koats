import compose from "koa-compose";
import { Context, Middleware } from "koa";
import { safe } from "./safe";
import { createContext } from "@/test/utils";

describe("safe middleware", () => {
  let ctx: Context;
  let next: jest.Mock;

  beforeEach(() => {
    ctx = createContext({ called: false });
    next = jest.fn();
  });

  it("should call the middleware", async () => {
    const handler = jest.fn();
    const middleware = jest.fn().mockResolvedValue(undefined);
    await expect(safe(middleware)(handler)(ctx, next)).resolves.toBeUndefined();
    expect(middleware).toHaveBeenCalled();
  });

  it("should call next", async () => {
    const handler = jest.fn();
    const middleware: Middleware = (_, n) => n();
    await expect(safe(middleware)(handler)(ctx, next)).resolves.toBeUndefined();
    expect(next).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledTimes(0);
  });

  it("should call the handler", async () => {
    const error = new Error();
    const handler = jest.fn();
    const middleware = jest.fn().mockRejectedValue(error);

    await expect(safe(middleware)(handler)(ctx, next)).resolves.toBeUndefined();
    expect(handler).toHaveBeenCalledWith(ctx, next);
    expect(middleware).toHaveBeenCalled();
  });

  it("should not call handler if next has already been called", async () => {
    const error = new Error();
    const handler = jest.fn();
    const middleware: Middleware = (_, n) => n();
    const nextMiddleware: Middleware = (_, n) => {
      throw error;
    };

    const composed = compose([safe(middleware)(handler), nextMiddleware]);

    await expect(composed(ctx, next)).rejects.toThrow(error);
    expect(handler).toHaveBeenCalledTimes(0);
  });
});

import { safe } from "./safe";
import { Context } from "@/models";
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
    await expect(safe(handler)(middleware)(ctx, next)).resolves.toBeUndefined();
    expect(middleware).toHaveBeenCalledWith(ctx, next);
  });

  it("should call the handler", async () => {
    const error = new Error();
    const handler = jest.fn();
    const middleware = jest.fn().mockRejectedValue(error);

    await expect(safe(handler)(middleware)(ctx, next)).resolves.toBeUndefined();
    expect(handler).toHaveBeenCalledWith(ctx, next, error);
  });

  it("should throw inside handler when needed", async () => {
    const error = jest.fn().mockRejectedValue(new Error("Fun"));

    await expect(safe(error)(error)(ctx, next)).rejects.toThrow(/Fun/);
    expect(error).toHaveBeenCalledTimes(2);
  });
});

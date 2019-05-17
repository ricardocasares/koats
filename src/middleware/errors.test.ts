import { errors } from "./errors";
import { Context } from "@/models";
import { createContext } from "@/test/utils";

describe("branch middleware", () => {
  let ctx: Context;
  let next: jest.Mock;

  beforeEach(() => {
    ctx = createContext({ called: false });
    next = jest.fn();
  });

  it("should call next", async () => {
    await errors(ctx, next);
    expect(next).toHaveBeenCalledWith();
  });

  it("should populate context when next errors", async () => {
    const fails = jest.fn().mockRejectedValue(new Error());
    await errors(ctx, fails);
    expect(ctx).toHaveProperty("type");
    expect(ctx.type).toBe("json");
    expect(ctx).toHaveProperty("body");
    expect(ctx.body).toHaveProperty("state");
    expect(ctx.body).toHaveProperty("status");
    expect(ctx.body).toHaveProperty("message");
    expect(ctx).toHaveProperty("status");
    expect(ctx.status).toBe(500);
  });

  it("should use props from the error", async () => {
    class AppError extends Error {
      status: number = 401;
    }

    const error = new AppError("Not Fun");
    const fails = jest.fn().mockRejectedValue(error);
    await errors(ctx, fails);

    expect(ctx).toHaveProperty("body");
    expect(ctx.body).toHaveProperty("status");
    expect(ctx.body).toHaveProperty("message");
    expect(ctx.body.status).toBe(401);
    expect(ctx.body.message).toBe("Not Fun");
  });
});

import { measure } from "./measure";
import { Context, Middleware } from "koa";
import { createContext } from "@/test/utils";

describe("safe middleware", () => {
  let ctx: Context;
  let next: jest.Mock;
  let info: jest.Mock;

  beforeEach(() => {
    info = jest.fn();
    // @ts-ignore
    ctx = createContext({ called: false, log: { info } });
    next = jest.fn();
  });

  it("should call next and logger", async () => {
    const middleware: Middleware = (_, n) => n();
    await expect(measure(middleware)(ctx, next)).resolves.toBeUndefined();
    expect(next).toHaveBeenCalled();
    expect(info).toHaveBeenCalledTimes(2);
  });

  it("should call logger with times", async () => {
    const middleware: Middleware = (_, n) => n();
    const date = jest
      .spyOn(Date, "now")
      .mockReturnValueOnce(2)
      .mockReturnValueOnce(4);

    await expect(measure(middleware)(ctx, next)).resolves.toBeUndefined();
    expect(date).toHaveBeenCalledTimes(2);
    expect(info).toHaveBeenNthCalledWith(1, "measuring...");
    expect(info).toHaveBeenNthCalledWith(
      2,
      { responseTime: 2 },
      "middleware: execution took 2ms"
    );
  });
});

import { measure } from "./measure";
import { AppContext, Middleware } from "@/models";
import { createContext } from "@/test/utils";

describe("safe middleware", () => {
  let ctx: AppContext;
  let next: jest.Mock;
  let info: jest.Mock;

  beforeEach(() => {
    info = jest.fn();
    ctx = createContext({ called: false, log: { info } });
    next = jest.fn();
  });

  it("should call next and logger", async () => {
    const middleware: Middleware = (c, n) => n();
    await expect(measure(middleware)(ctx, next)).resolves.toBeUndefined();
    expect(next).toHaveBeenCalled();
    expect(info).toHaveBeenCalledTimes(2);
  });

  it("should call logger with times", async () => {
    const middleware: Middleware = (c, n) => n();
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
      "execution took 2ms"
    );
  });
});

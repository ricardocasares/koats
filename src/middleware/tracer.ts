import { Middleware } from "koa";
import { initTracer, TracingConfig, TracingOptions } from "jaeger-client";

export type TracerOptions = {
  config: TracingConfig;
  options: TracingOptions;
};

export const tracer = ({ config, options }: TracerOptions): Middleware => {
  const tracer = initTracer(config, options);

  return async (ctx, next) => {
    ctx.tracer = tracer;
    await next();
  };
};

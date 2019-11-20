import { Middleware, Context } from "koa";
import { Tags, FORMAT_HTTP_HEADERS } from "opentracing";

export const makeSpan = (tags: Record<string, string>) => (
  operation: string,
  middleware: Middleware
): Middleware => async (ctx, next) => {
  const childOf = getParentContext(ctx);
  const current = ctx.tracer.startSpan(operation, { tags, childOf });

  ctx.span = current;

  let called = false;
  async function finish() {
    called = true;
    current.finish();
    await next();
  }

  try {
    await middleware(ctx, finish);
  } catch (err) {
    if (!called) {
      current.setTag(Tags.ERROR, true).log(err);
      current.finish();
    }

    throw err;
  }
};

function getParentContext(ctx: Context) {
  if (ctx.span) {
    return ctx.span.context();
  }

  return (
    ctx.tracer.extract(FORMAT_HTTP_HEADERS, ctx.request.headers) || undefined
  );
}

import { Middleware, Context } from "koa";
import { Tags, FORMAT_HTTP_HEADERS } from "opentracing";

export const makeSpan = (tags: Record<string, string>) => (
  op: string,
  mw: Middleware
): Middleware => async (ctx, next) => {
  ctx.spans = ctx.spans || [];
  const { spans = [], tracer } = ctx;
  const childOf = getParentContext(ctx);
  const current = tracer.startSpan(op, { childOf, tags });

  spans.push(current);

  let called = false;
  async function finish() {
    called = true;
    current.finish();
    await next();
  }

  try {
    await mw(ctx, finish);
  } catch (err) {
    if (!called) {
      current.setTag(Tags.ERROR, true).log(err);
      current.finish();
    }

    throw err;
  }
};

function getParentContext(ctx: Context) {
  const span = ctx.spans.pop();

  if (span) {
    return span.context();
  }

  return (
    ctx.tracer.extract(FORMAT_HTTP_HEADERS, ctx.request.headers) || undefined
  );
}

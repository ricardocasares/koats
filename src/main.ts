import Koa from "koa";
// @ts-ignore
const safe = a => b => async (ctx, next) => {
  let called = false;
  const fake = () => {
    called = true;
    return next();
  };

  try {
    await a(ctx, fake);
  } catch (err) {
    ctx.err = err;

    if (!called) {
      await b(ctx, next);
    } else {
      throw err;
    }
  }
};

new Koa()
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.log("Errored", err);
      ctx.body = { message: "Global error" };
    }
  })
  .use(
    // @ts-ignore
    safe(async (ctx, next) => {
      console.log("first");
      throw new Error("test");
      ctx.state = { first: "1" };
      await next();
      // @ts-ignore
    })(async (ctx, next) => {
      if (ctx.err.message === "test") {
        console.log("err");
        await next();
      } else {
        throw ctx.err;
      }
    })
  )

  .use(async (ctx, next) => {
    console.log("second");

    ctx.state = { ...ctx.state, second: "2" };
    await next();
  })
  .use(async (ctx, next) => {
    console.log("third");
    // throw new Error("Test");
    ctx.state = { ...ctx.state, third: "3" };
    await next();
  })
  .use(async (ctx, next) => {
    console.log("response");
    console.log(next);
    // ctx.throw(401, "Nope");
    ctx.body = ctx.state;
    await next();
  })
  .listen(4000);

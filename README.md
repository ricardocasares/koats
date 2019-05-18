# koats

Experimenting with Koa and TypeScript

## Stack

- Koa
- Koa router
- TypeScript
- Jest

## Getting started

### Running the app

- `npm install`
- `npm start dev`

### Testing

- `npm run test`
- `npm run test -- --watchAll`
- `npm run test -- --coverage`

### Debugging

There's a `launch.json` available to use from `VSCode`, simply start the debugger and add breakpoints to the code.

## Concepts

### Dependencies

Dependencies are injected to the `Context` when the application starts.

Inside the `context` object you'll find a dependency container `dc` where all your services/dependencies will be instantiated.

### Middleware

I've tried to keep middleware as simple as possible, without handling any errors or conditional logic in the main body, this makes them highly reusable between different routes or apps.

Instead, error handling and branching is achieved by composition of other middleware.

#### safe

Decouples error handling logic from middleware.

This runs your middleware code in the `catch` block of another middleware that has previously `throw`'ed.

This way we keep the "happy path" and the "error path" separated.

```ts
const safe = (a: Middleware) => (b: Middleware): Middleware => async (
  ctx,
  next
) => {
  try {
    await a(ctx, next);
  } catch (err) {
    ctx.err = err;
    await b(ctx, next);
  }
};
```

##### Example

```ts
import { safe } from "@/middleware/safe";
import { Middleware } from "@/models";

// Your heart tells you to keep it simple
const heart: Middleware = (ctx, next) => {
  throw new Error("But things can go wrong");
};

// Then you can fix it
const withYourMind: Middleware = (ctx, next) => {
  if (ctx.err.message.includes("wrong")) {
    // Our app keeps running
    return next();
  }
  // Sometimes there's nothing we can do about it!
  throw err;
};

const saveYourHeart = safe(heart);

// Combine them into one
app.use(saveYourHeart(withYourMind)).use((ctx, next) => {
  // To keep doing what you need
  return next();
});
```

#### branch

Decouples conditional logic from other middleware.

The middleware you pass in will only run when the predicate function returns `true`.

```ts
const branch = (p: Predicate) => (mw: Middleware): Middleware => async (
  ctx,
  next
) => {
  p(ctx) ? await mw(ctx, next) : await next();
};
```

##### Example

```ts
import { branch } from "@/middleware/branch";
import { Middleware } from "@/models";

const html: Middleware = async (ctx, next) => {
  ctx.type = "html";
  ctx.body = "<h1>Hello world</h1>";
  await next();
};

const json: Middleware = async (ctx, next) => {
  ctx.type = "json";
  ctx.body = { hello: "world" };
  await next();
};

const htmlIf = branch(html);
const jsonIf = branch(json);

app
  .use(htmlIf(ctx => !!ctx.accepts("html"))
  .use(jsonIf(ctx => !!ctx.accepts("json"));
```

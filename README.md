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

I've tried to keep middlewares as simple as possible, without handling any errors in the main body of the middleware.

In turn, error handling is achieved by composition of other middleware.

#### safe

Decouples error handling logic from middleware.

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

This middleware allows to run code in the `catch` block of a middleware that has throwed.

This way we have a `happy path` and the `error path`.

```ts
import { safe } from "@/middleware/safe";
import { Middleware } from "@/models";

// Your heart tells you to do things
const heart: Middleware = (ctx, next) => {
  throw new Error("But things can go wrong");
};

// So you can fix it
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

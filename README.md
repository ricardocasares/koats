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

This middleware allows to run code in the `catch` block of a middleware that has throwed.

```ts
async function callService(ctx, next) {
  // This might throw
  await ctx.dc.someService.get();
  await next();
}

// here you will handle the error
const safeMiddleware = safe((ctx, next, err) => {
  if (err.name === "SomeError") {
    // this error is safe enough to continue
    return await next();
  }

  // we die if not
  throw err;
});

const safeCallService = safeMiddleware(callService);
```

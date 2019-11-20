export const sleep = (n: number) =>
  new Promise(resolve => setTimeout(resolve, n));

export const { NODE_ENV: env } = process.env;

export const isDev = () => env === "development";
export const isProd = () => env === "production";
export const isTest = () => env === "TEST";

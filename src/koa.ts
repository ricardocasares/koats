import Koa from "koa";
import KoaRouter from "koa-router";
import { App, Router } from "@/models";

export const app: App = new Koa();
export const router: Router = new KoaRouter();

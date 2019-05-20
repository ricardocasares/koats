import Koa from "koa";
import KoaRouter from "koa-router";
import { State, Context } from "@/models";

export const app = new Koa<State, Context>();
export const router = new KoaRouter<State, Context>();

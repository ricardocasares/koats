import Koa from "koa";
import KoaRouter from "koa-router";
import { Logger } from "pino";
import { Users, IUser, Email, IEmail } from "@/services";

export interface State {
  email: IEmail;
  account: IUser;
}

export class Dependencies {
  constructor(public users: Users, public email: Email, public log: Logger) {}
}

export interface Context {
  di: Dependencies;
  state: State;
}

export interface App extends Koa<State, Context> {}
export interface Router extends KoaRouter<State, Context> {}
export interface Middleware extends Koa.Middleware<State, Context> {}

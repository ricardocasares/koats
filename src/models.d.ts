import Koa, { ParameterizedContext } from "koa";
import KoaRouter from "koa-router";
import { UserService, EmailService } from "@/services";

export interface User {
  id: number;
  email: string;
  locked: boolean;
}

export interface Email {
  id: number;
  to: string;
  sent: boolean;
}

export interface Dependencies {
  readonly users: UserService;
  readonly emails: EmailService;
}

export interface State {
  email: Email;
  account: User;
}

export interface Context {
  dc: Dependencies;
}

export interface App extends Koa<State, Context> {}
export interface Router extends KoaRouter<State, Context> {}
export interface Middleware extends Koa.Middleware<State, Context> {}
export interface AppContext extends ParameterizedContext<State, Context> {}

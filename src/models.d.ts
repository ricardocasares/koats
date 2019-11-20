import { UserService, EmailService } from "@/services";
import { Span, Tracer } from "opentracing";

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

declare module "koa" {
  interface ExtendableContext {
    dc: Dependencies;
    spans: Span[];
    tracer: Tracer;
  }
}

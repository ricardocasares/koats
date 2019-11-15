import { Context } from "koa";
import { Request } from "superagent";

export const createContext = (props: Partial<Context>) => {
  const ctx: Partial<Context> = { ...props };
  return ctx as Context;
};

export const snapshot = ({
  // @ts-ignore
  body,
  // @ts-ignore
  status,
  // @ts-ignore
  headers: { date, ...headers }
}: Request) => expect({ status, body, headers }).toMatchSnapshot();

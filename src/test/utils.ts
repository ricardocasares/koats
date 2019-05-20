import { AppContext } from "@/models";
import { Request } from "superagent";

export const createContext = (props: Partial<AppContext>) => {
  const ctx: Partial<AppContext> = { ...props };
  return ctx as AppContext;
};

export const snapshot = ({
  // @ts-ignore
  body,
  // @ts-ignore
  status,
  // @ts-ignore
  headers: { date, ...headers }
}: Request) => expect({ status, body, headers }).toMatchSnapshot();

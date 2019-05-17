import { Context } from "@/models";

export const createContext = (props: Partial<Context>) => {
  const ctx: Partial<Context> = { ...props };
  return ctx as Context;
};

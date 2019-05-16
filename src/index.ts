import { createApp } from "@/app";
import { Dependencies } from "@/models";
import { Users, Email, Logger } from "@/services";

createApp(new Dependencies(new Users(), new Email(), Logger)).listen(3000, () =>
  Logger.info("server started http://localhost:3000/")
);

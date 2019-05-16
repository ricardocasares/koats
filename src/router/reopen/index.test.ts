import request from "supertest";
import { createApp } from "@/app";
import { Users, Email, Logger } from "@/services";
import { Dependencies } from "@/models";

const deps = new Dependencies(new Users(), new Email(), Logger);

describe("/reopen", () => {
  it("should reopen an given account", async () => {
    const app = createApp(deps);

    await request(app)
      .get("/reopen/1")
      .expect(res => expect(res.text).toMatchSnapshot())
      .expect(200);
  });
});

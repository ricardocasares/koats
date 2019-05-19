import request from "supertest";
import { createApp } from "@/app";
import { UserService as User, EmailService as Email } from "@/services";
import { snapshot } from "@/test/utils";

// dependencies
const users = new User();
const emails = new Email();

// mocked data
const user = { id: 1, email: "me@app.io", locked: true };
const email = { id: 1, to: "me@app.io", sent: true };

// init application
const app = createApp({ users, emails }).callback();

describe("/reopen", () => {
  it("should reopen a given account", async () => {
    jest.spyOn<User, "id">(users, "id").mockResolvedValue(user);
    jest
      .spyOn<User, "unlock">(users, "unlock")
      .mockResolvedValue({ ...user, locked: false });
    jest.spyOn<Email, "send">(emails, "send").mockResolvedValue(email);

    await request(app)
      .get("/reopen/1")
      .expect(snapshot);
  });

  it("should find an account by email as failover", async () => {
    jest.spyOn<User, "id">(users, "id").mockRejectedValue(new Error());
    jest.spyOn<User, "email">(users, "email").mockResolvedValue(user);
    jest
      .spyOn<User, "unlock">(users, "unlock")
      .mockResolvedValue({ ...user, locked: false });
    jest.spyOn<Email, "send">(emails, "send").mockResolvedValue(email);

    await request(app)
      .get("/reopen/1")
      .expect(snapshot);
  });

  it("should fail when no account is found", async () => {
    jest.spyOn<User, "id">(users, "id").mockRejectedValue(new Error());
    jest.spyOn<User, "email">(users, "email").mockRejectedValue(new Error());

    await request(app)
      .get("/reopen/1")
      .expect(snapshot);
  });

  it("should fail when unlock is not possible", async () => {
    jest.spyOn<User, "id">(users, "id").mockResolvedValue(user);
    jest.spyOn<User, "unlock">(users, "unlock").mockRejectedValue(new Error());

    await request(app)
      .get("/reopen/1")
      .expect(snapshot);
  });

  it("should fail when email not send", async () => {
    jest.spyOn<User, "id">(users, "id").mockResolvedValue(user);
    jest
      .spyOn<User, "unlock">(users, "unlock")
      .mockResolvedValue({ ...user, locked: false });
    jest.spyOn<Email, "send">(emails, "send").mockRejectedValue(new Error());

    await request(app)
      .get("/reopen/1")
      .expect(snapshot);
  });
});

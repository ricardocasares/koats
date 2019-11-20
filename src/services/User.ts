import { User } from "@/models";
import { sleep } from "@/lib/utils";

export class UserService {
  async id(id: number): Promise<User> {
    await sleep(Math.random());
    return Promise.resolve({ id, email: "meas@app.io", locked: true });
  }

  async email(email: string): Promise<User> {
    await sleep(Math.random());
    return Promise.resolve({ id: 1, email, locked: true });
  }

  async unlock(id: number): Promise<User> {
    await sleep(Math.random());
    return Promise.resolve({ id, email: "measd@app.io", locked: false });
  }
}

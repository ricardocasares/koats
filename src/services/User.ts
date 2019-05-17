import { User } from "@/models";

export class UserService {
  id(id: number): Promise<User> {
    return Promise.resolve({ id, email: "meas@app.io", locked: true });
  }

  email(email: string): Promise<User> {
    return Promise.resolve({ id: 1, email: "pete", locked: true });
  }

  unlock(id: number): Promise<User> {
    return Promise.resolve({ id, email: "measd@app.io", locked: false });
  }
}

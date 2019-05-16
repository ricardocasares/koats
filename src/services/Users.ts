export type IUser = {
  id: number;
  email: string;
  locked: boolean;
};

export class Users {
  id(id: number): Promise<IUser> {
    return Promise.resolve({ id, email: "me@app.io", locked: true });
  }

  email(email: string): Promise<IUser> {
    return Promise.resolve({ id: 1, email, locked: true });
  }

  unlock(id: number): Promise<IUser> {
    return Promise.resolve({ id, email: "me@app.io", locked: false });
  }
}

export type IEmail = {
  id: number;
  to: string;
  sent: boolean;
};

export class Email {
  send(name: string): Promise<IEmail> {
    return Promise.resolve({ id: 1, to: name, sent: true });
  }
}

import { Email } from "@/models";

export class EmailService {
  send(name: string): Promise<Email> {
    return Promise.resolve({ id: 1, to: name, sent: true });
  }
}

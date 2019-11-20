import { Email } from "@/models";
import { sleep } from "@/lib/utils";

export class EmailService {
  async send(name: string): Promise<Email> {
    await sleep(Math.random());
    return Promise.resolve({ id: 1, to: name, sent: true });
  }
}

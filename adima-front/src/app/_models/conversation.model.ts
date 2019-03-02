import {Company, Message} from './index';

export class Conversation {
  company: Company;
  messages: Array<Message> = new Array<Message>();

  constructor(company: Company) {
    this.company = company;
  }
}

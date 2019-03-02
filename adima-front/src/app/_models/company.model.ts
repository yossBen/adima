export class Company {
  name: String;
  address: String;
  phone: String;
  chatJid: String;

  constructor(name: String, chatJid: String) {
    this.chatJid = chatJid;
    this.name = name;
  }
}

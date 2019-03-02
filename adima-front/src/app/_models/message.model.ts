export class Message {
  date: Date;
  value: String;
  isMe: boolean;

  constructor(value: String, date: Date, isMe?:boolean) {
    this.value = value;
    this.date = date;
    this.isMe = isMe;
  }
}

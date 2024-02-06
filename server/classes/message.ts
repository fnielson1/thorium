import {BaseClass} from "~classes/baseClass";

export default class Message extends BaseClass<Message> {
  destination: string;
  sender: string;
  timestamp: string;
  content: string;

  constructor(params: Partial<Message> = {}) {
    super(params, "Message");
    this.type = this.class;
    this.simulatorId = params.simulatorId || null;
    this.destination = params.destination ? params.destination.trim() : null;
    this.sender = params.sender ? params.sender.trim() : null;
    this.timestamp = new Date().toString();
    this.content = params.content || null;
  }
}

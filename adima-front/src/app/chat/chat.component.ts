///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
/* site for chat example : http://embed.plnkr.co/EhQHDsYpDhrECmaaIlZO/*/

import {Component, OnInit} from '@angular/core';
import {$msg, $pres, Strophe} from 'strophe.js';
import {environment} from '../../environments/environment';
import {Company, Conversation, Message, User} from "../_models/index";

@Component({templateUrl: 'chat.component.html'})
export class ChatComponent implements OnInit {
  private connection: any;
  private chatJid: any;
  activeChatJid: String;
  private user: User;
  private conversations: Map<String, Conversation> = new Map<String, Conversation>();

  constructor() {
  }

  ngOnInit(): void {
    this.connection = new Strophe.Connection(environment.CHAT_WEBSOCKET, {'keepalive': true});
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.chatJid = this.user.email.replace("@", "_") + "@" + environment.CHAT_HOST;
    this.login();
  }

  login(): void {
    if (this.connection) {
      this.connection.connect(this.chatJid, this.user.password, this.onConnect.bind(this));
      this.connection.addHandler(this.onMessage.bind(this), null, "message");
    }
  }

  logOut(): void {
    if (this.connection) {
      this.connection.options.sync = true;
      this.connection.flush();
      this.connection.disconnect("logout");
      this.connection = null;
    }
  }

  /**
   *  XMPP message Handler
   * @param {string} msg Message received
   */
  private onMessage(msg: Element): boolean {
    var from = null;
    var bodyText = null;

    try {
      let type = msg.getAttribute('type');
      from = msg.getAttribute('from');

      // substring befor last "/"
      from = Strophe.getBareJidFromJid(from);
      let elems = msg.getElementsByTagName('body');
      if (type == "chat" && elems.length > 0) {
        var body = elems[0];
        bodyText = body.innerHTML;
      }
      console.log("New Message from " + from + ": " + bodyText);
    } catch (e) {
      Strophe.error(e);
    }

    if (bodyText && from) {
      if (!this.activeChatJid) {
        this.activeChatJid = from;
      }
      this.displayMessage(from, bodyText);
    }
    return true;
  }

  sendMessage(msg: String) {
    var stanza = $msg({"to": this.activeChatJid, "from": this.chatJid, type: 'chat'});
    if (msg) {
      stanza
      //.c('html', {xmlns: Strophe.NS.XHTML_IM})
        .c('body', {xmlns: Strophe.NS.XHTML})
        .h(msg);

      this.connection.send(stanza);
      this.displayMessage(this.activeChatJid, msg, true);
    }
  }

  sendMultiMessages(msg: String) {
    const jids: Array<String> = ["rachid" + "@" + environment.CHAT_HOST, "toto" + "@" + environment.CHAT_HOST, "admin" + "@" + environment.CHAT_HOST];

    var stanza = $msg({"to": environment.CHAT_HOST, "from": this.chatJid, type: 'chat'});
    if (msg) {
      stanza
      //.c('html', {xmlns: Strophe.NS.XHTML_IM})
        .c('body', {xmlns: Strophe.NS.XHTML})
        .h(msg);

      stanza = stanza.up().c("addresses", {xmlns: 'http://jabber.org/protocol/address'});

      jids.forEach((jid, index) => {
        if (index > 0) {
          stanza = stanza.up();
        }
        stanza.c("address", {
          "type": "cc",
          "jid": jid
        });
      });
      this.connection.send(stanza);
      this.displayMessage(this.activeChatJid, msg, true);
    }
  }

  displayMessage(from: String, value: String, isMe ?: boolean) {
    let conver = this.conversations.get(from);
    if (!conver) {
      let company = new Company(from, from);
      conver = new Conversation(company);
      this.conversations.set(from, conver);
    }
    let message = new Message(value, new Date(), isMe);
    conver.messages.push(message);
  }

  /**
   * connection Handler
   * @param {any} status connection result
   */
  private onConnect(status: any): void {
    switch (status) {
      case
      Strophe.Status.CONNECTING :
        console.log("Connecting to eJabberd...");
        break;
      case
      Strophe.Status.CONNFAIL :
        console.log("eJabberd connection failed!");
        break;
      case
      Strophe.Status.DISCONNECTING :
        console.log("Disconnecting from eJabberd...");
        break;
      case
      Strophe.Status.DISCONNECTED :
        console.log("Disconnected from eJabberd");
        break;
      case
      Strophe.Status.CONNECTED :
        this.connection.send($pres().tree());
        console.log("eJabberd connected!");
        break;
      case
      Strophe.Status.AUTHENTICATING :
        console.log("eJabberd authenticating...");
        break;
      case
      Strophe.Status.AUTHFAIL :
        console.log("eJabberd authentication failed!");
        break;
      case
      Strophe.Status.ERROR :
        console.log("eJabberd generic connection error!");
        break;
      case
      Strophe.Status.ATTACHED :
        console.log("eJabberd connection attached!");
        break;
      case
      Strophe.Status.REDIRECT :
        console.log("eJabberd connection redirected!");
        break;
      case
      Strophe.Status.CONNTIMEOUT :
        console.log("eJabberd connection timeout!");
        break;
      default:
        console.log("eJabberd: Unknow connection status");
    }
  }
}

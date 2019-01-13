///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {$pres, Strophe} from 'strophe.js';
import Connection = Strophe.Connection;

@Component({templateUrl: 'chat.component.html'})
export class ChatComponent implements OnInit {
  static connection: any;

  ngOnInit(): void {
    ChatComponent.connection = new Strophe.Connection("ws://localhost:7070/ws/",{'keepalive': true});
     ChatComponent.connection.connect("toto@192.168.100.155", "Toto1", this.onConnect);
  }

  /*  onConnectionStatus(status) {
      console.log(status);
      if (status === 5) {
        this.connection.sendPresence($pres());
      }
    }*/
  /**
   * Disconnect from eJabberd
   */

/*
  login(jid: string, password: string): void {
    if (!this.connection) {
      this.connection = new Strophe.Connection("ws://localhost:7070/ws/", {'keepalive': true});


    this.connection.connect(jid + '@' + EJABBERD.host, password, this._onConnect);
  }
*/

/*
  logOut(): void {
    if (this.connection) {
      this.connection.options.sync = true;
      this.connection.flush();
      this.connection.disconnect("logout");
      this.connection = null;
    }
  }
*/

  /**
   * eJabberd XMPP message Handler
   * @param {string} msg Message received
   */
  private _onMessage(msg: string): boolean {
    console.log("eJabber Msg: " + msg);
    return true;
  }

  /**
   * eJabberd connection Handler
   * @param {any} status connection result
   */
  private onConnect(status: any): void {
    switch (status) {
      case Strophe.Status.CONNECTING:
        console.log("Connecting to eJabberd...");
        break;
      case Strophe.Status.CONNFAIL:
        console.log("eJabberd connection failed!");
        break;
      case Strophe.Status.DISCONNECTING:
        console.log("Disconnecting from eJabberd...");
        break;
      case Strophe.Status.DISCONNECTED:
        console.log("Disconnected from eJabberd");
        break;
      case Strophe.Status.CONNECTED:
        ChatComponent.connection.send($pres().tree());
        /*
          //handler function  [ onMessage() ]  will be called when the user recieves a new message
          chatPanelServiceInstance._xmppConnection.addHandler(chatPanelServiceInstance._onMessage, null, 'message');

          //Setting our presence in the server. so that everyone can know that we are online
          chatPanelServiceInstance._xmppConnection.send($pres().tree());
        */
        console.log("eJabberd connected!");
        break;
      case Strophe.Status.AUTHENTICATING:
        console.log("eJabberd authenticating...");
        break;
      case Strophe.Status.AUTHFAIL:
        console.log("eJabberd authentication failed!");
        break;
      case Strophe.Status.ERROR:
        console.log("eJabberd generic connection error!");
        break;
      case Strophe.Status.ATTACHED:
        console.log("eJabberd connection attached!");
        break;
      case Strophe.Status.REDIRECT:
        console.log("eJabberd connection redirected!");
        break;
      case Strophe.Status.CONNTIMEOUT:
        console.log("eJabberd connection timeout!");
        break;
      default:
        console.log("eJabberd: Unknow connection status");
    }
  }
}

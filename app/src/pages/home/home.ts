import { ChatRoomPage } from '../chat-room/chat-room';
import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nickname = '';

  constructor(public navCtrl: NavController,
     private chatProvider: ChatProvider,
     public menuCtrl: MenuController) {
      this.menuCtrl.enable(false, 'sideMenu');
     }

  joinChat() {
    this.chatProvider.joinChat(this.nickname);
    this.navCtrl.setRoot(ChatRoomPage, { nickname: this.nickname });
  }
}

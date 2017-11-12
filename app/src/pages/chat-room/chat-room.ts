import { ChatProvider } from '../../providers/chat/chat';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
  messages = [];
  nickname = '';
  message = '';

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private chatProvider: ChatProvider,
    public menuCtrl: MenuController,
    private nativeStorage: NativeStorage) {
      
    this.menuCtrl.enable(true, 'sideMenu');
    this.nickname = this.navParams.get('nickname');

    this.chatProvider.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.chatProvider.getUsers().subscribe((data: any) => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        if (user != this.nickname)
          this.showToast('User joined: ' + user);
      }
    });
  }

  sendMessage() {
    this.chatProvider.sendMessage(this.message);
    this.message = '';
  }

  logout(){
    this.chatProvider.disconnect();
    this.nativeStorage.clear();
    this.navCtrl.setRoot(HomePage);
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }



}

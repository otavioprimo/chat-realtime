import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class ChatProvider {

  public onesignal_id: any;
  constructor(public socket: Socket,private nativeStorage: NativeStorage) {

  }

  setOnesignal(id: string) {
    this.onesignal_id = id;
  }

  joinChat(nickname: string) {
    this.nativeStorage.setItem('usuario',nickname);
    let data = {
      nickname: nickname,
      onesignal: this.onesignal_id
    }
    this.socket.connect();
    this.socket.emit('set-nickname', data);
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  sendMessage(message: string) {
    this.socket.emit('add-message', { text: message });
  }

  disconnect() {
    this.socket.disconnect();
  }

}

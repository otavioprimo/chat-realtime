import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../pages/home/home';
import { ChatRoomPage } from '../pages/chat-room/chat-room';
import { ChatProvider } from '../providers/chat/chat';
import { OneSignal } from '@ionic-native/onesignal';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  showRoot = false;

  users: any = [];

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private chatProvider: ChatProvider,
    private oneSignal: OneSignal,
    private nativeStorage: NativeStorage) {
    platform.ready().then(() => {

      if (!platform.is('mobileweb')) {
        //ONESIGNAL
        this.oneSignal.startInit('df224e1b-ba25-4b55-86f4-a384234401ef', '30473154287');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
        this.oneSignal.handleNotificationOpened()
          .subscribe(data => {

          });

        this.oneSignal.getIds()
          .then((data: any) => {
            this.chatProvider.setOnesignal(data.userId);
          }, error => {

          });
        this.oneSignal.endInit();

        this.nativeStorage.getItem('usuario')
          .then(data => {
            chatProvider.joinChat(data);
            this.rootPage = ChatRoomPage;
            this.showRoot = true;
            setTimeout(() => {
              splashScreen.hide();
            }, 600);
          }, error => {
            this.showRoot = true;
            setTimeout(() => {
              splashScreen.hide();
            }, 600);
          });
      }

      chatProvider.getUsers().subscribe((data: any) => {
        this.users = data.users_online;
      });

      statusBar.styleDefault();
    });
  }

}


import { ChatRoomPage } from '../pages/chat-room/chat-room';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { OneSignal } from '@ionic-native/onesignal';
import { NativeStorage } from '@ionic-native/native-storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { ChatProvider } from '../providers/chat/chat';
const config: SocketIoConfig = { url: 'https://chat-ionic2.herokuapp.com/', options: {} }; //DEPLOY ON HEROKU
// const config: SocketIoConfig = { url: 'localhost:3001/', options: {} }; //LOCALHOST

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatRoomPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChatRoomPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ChatProvider,
    OneSignal,
    NativeStorage
  ]
})
export class AppModule { }

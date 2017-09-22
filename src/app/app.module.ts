import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { Complaint } from '../pages/complaint/complaint';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { Gallery } from '../pages/gallery/gallery';
import { Setting } from '../pages/setting/setting';
import { EditProfile } from '../pages/edit-profile/edit-profile';
import { LangSetting } from '../pages/lang-setting/lang-setting';
import { Suggestion } from '../pages/suggestion/suggestion';
import { ComplaintInfo } from '../pages/complaint-info/complaint-info';
import { ComplaintRef } from '../pages/complaint-ref/complaint-ref';
import { Constituency } from '../pages/constituency/constituency';
import { ViewSuggestion } from '../pages/view-suggestion/view-suggestion';
import { AboutUs } from '../pages/about-us/about-us';
import { ChangePhone } from '../pages/change-phone/change-phone';
import { HttpModule, Http} from '@angular/http';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { ImagePicker } from '@ionic-native/image-picker';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';

import { StatusBar} from '@ionic-native/status-bar';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OneSignal } from '@ionic-native/onesignal';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Complaint,
    Suggestion,
    ComplaintInfo,
    Gallery,
    ComplaintRef,
    Login,
    Signup,
    Setting,
    LangSetting,
    EditProfile,
    Constituency,
    ViewSuggestion,
    AboutUs,
    ChangePhone

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Complaint,
    Suggestion,
    ComplaintInfo,
    Gallery,
    ComplaintRef,
    Login,
    Signup,
    Setting,
    LangSetting,
    EditProfile,
    Constituency,
    ViewSuggestion,
    AboutUs,
    ChangePhone
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    MediaCapture,
    ImagePicker,
    Device,
    Sim,
    Toast,
    InAppBrowser,
    OneSignal,
    Facebook,
    NativeStorage,
    SQLite,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

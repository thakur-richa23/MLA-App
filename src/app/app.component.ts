import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar} from '@ionic-native/status-bar';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { Complaint } from '../pages/complaint/complaint';
import { Suggestion } from '../pages/suggestion/suggestion';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { EditProfile } from '../pages/edit-profile/edit-profile';
import { Network } from '@ionic-native/network';
import { ComplaintInfo } from '../pages/complaint-info/complaint-info';


declare var window: any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;
  uniqueid:any;
  tokenId:any;
  userId:any;
  db:any;
  pages: Array<{title: string, component: any}>;
  language:any;
  titles:any =[];
  english: any =[];
  punjabi: any =[];

  constructor(public platform: Platform, private network: Network, private sqlite: SQLite, private oneSignal: OneSignal, private storage: Storage, public statusBar: StatusBar, public splashScreen: SplashScreen, private device: Device) {
    
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage }
    ];

    this.storage.get('Uid').then((Uid) => {
      this.userId = Uid;
      if(!this.userId){
          this.rootPage = Login;
      }
      else if(this.userId) {
          this.rootPage = HomePage;
      }
});
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      var uniq_id = this.device.uuid;
      this.storage.set('unique_no', uniq_id);
      this.storage.get('unique_no').then((unique_no) => {
      this.uniqueid = unique_no;
    });
    
    // one signal notification
    this.oneSignal.startInit('c0c6e79e-0535-4dce-81ee-1dbee730dfe6', '267186828659');
    
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
    this.oneSignal.handleNotificationReceived().subscribe(() => {
     // do something when notification is received
    });
    this.oneSignal.getIds().then((dviceid)=>{   
        this.storage.set('token_id', dviceid.userId); 
        this.storage.get('token_id').then((token_id) => {
          this.tokenId= token_id; 
      });  
   })
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
      this.storage.get('Uid').then((Uid) => {
        this.userId = Uid;
        if(this.userId){
          this.nav.setRoot(ComplaintInfo);
        }
      })


    });
    this.oneSignal.endInit(); // ends here

    //default language english set here
    this.storage.set("lang", "english");
    this.storage.get('lang').then((lang) => {
      this.language= lang;
      if(this.language == 'punjabi' ){
        this.titles = this.punjabi;   
      }else{
        this.titles = this.english;
      }
    })//ends here
    
      //--------------Internet connection----------//  
      this.network.onDisconnect().subscribe(() => {
        this.platform.ready().then(() => {
          window.plugins.toast.show("You are offline", "long", "center");
        });
    
    });
    this.network.onConnect().subscribe(()=> {
       this.platform.ready().then(() => {
          window.plugins.toast.show("You are online", "long", "center");
        });
    });//-----------end here-----------//
    });  
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

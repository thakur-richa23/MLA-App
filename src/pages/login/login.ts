import { Component } from '@angular/core';
import { NavParams, Platform, NavController, LoadingController, ActionSheetController, ToastController, AlertController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Toast } from '@ionic-native/toast';
import { Signup } from '../signup/signup';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { EditProfile } from '../edit-profile/edit-profile';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
FB_APP_ID: number = 1323177091144812;data:any;loginData:any;
usrid:any;
loginphone:any;userOtp:any;y:any;otpmsg:any;
language:any;titles:any =[];english: any =[];punjabi: any =[];
apiurl:any;
  constructor(public navCtrl: NavController,public fb: Facebook, private loadingCtrl: LoadingController, public alertCtrl: AlertController, public nativeStorage: NativeStorage, private storage: Storage, public navParams: NavParams, public http:Http, private toast:Toast) {
    this.data = [];
    this.apiurl="http://isp.mediaoncloud.com/MLA/";
    this.data.mobile = '';
    this.data.pass = '';
    this.fb.browserInit(this.FB_APP_ID, "v2.8");
    this.english= { mob: 'Mobile', submit: 'Submit'};
    this.punjabi = { mob: 'ਮੋਬਾਈਲ', submit: 'ਜਮ੍ਹਾਂ ਕਰੋ'};
    this.storage.get('lang').then((lang) => {
      this.language= lang;
      if(this.language == 'english'){
        this.titles = this.english;   

      }else{
        this.titles = this.punjabi;
      }
    })
  }

  submit(mobile){
    this.storage.set('otp','');
    this.y = Math.floor((Math.random() * 10000) + 100);
    this.http.get('https://2factor.in/API/V1/882ceda6-9df5-11e7-94da-0200cd936042/SMS/'+ mobile +'/' + this.y).map(res => res.json()).subscribe(data => {
    if(data.Status == 'Success'){
    this.storage.set('otp', this.y);
    }
    
      this.storage.get('otp').then((otp) => {
       this.userOtp = otp;
          let alertpopup = this.alertCtrl.create({
            title: 'Enter Your OTP',
            cssClass: 'abtn',
            inputs: [
              {
                name: 'otp',
                placeholder: 'OTP',
                value: this.otpmsg
              }
            ],
            buttons: [
              {
                text: 'Submit',
                handler: data => {
                  if(this.userOtp == data.otp){
                      this.http.get(this.apiurl+"login?phone=" +mobile).map(res => res.json()).subscribe(data => {                    
                        this.loginData = data;
                        this.loginphone = data.phone;
                        this.storage.set('Uid', this.loginData.id); 
                        this.storage.set('ph_no', this.loginphone);                                      
                          if(this.loginData.status != 'Failed'){
                            //alert("You are logged in successfully");  
                            this.toast.show(`You are logged in successfully`, 'long', 'center').subscribe(
                              toast => {
                                console.log(toast);
                              });
                              this.navCtrl.setRoot(HomePage);
                              //loadingPopup.dismiss();  
                          }
                        else{
                            //alert("Invalid Details");
                            this.toast.show(`Invalid Details`, 'long', 'center').subscribe(
                              toast => {
                              
                            });
                          }
                    
                      })
                  }else{
                    //alert("Your OTP not matched. Fill it again");
                    this.toast.show(`Your OTP not matched. Fill it again`, 'long', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      });
                  }
                }
              }
            ]
          });

          alertpopup.present();
        })
      });

  }
  signup(){
    this.navCtrl.push(Signup);
  }

  fblogin(){
    let permissions = new Array<string>();
    let nav = this.navCtrl;
	  let env = this;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

    this.fb.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      env.fb.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        env.nativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture,
          usrid: userId
        })
        .then(function(){
          nav.setRoot(HomePage,{
            type: 'facebook',
            name: user.name,
            picture: user.picture,
            email: user.email,
            usrid: userId
          });
        }, function (error) {
          console.log(error);
        })
      })
    }, function(error){
      console.log(error);
    });
  }

}

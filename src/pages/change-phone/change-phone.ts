import { Component } from '@angular/core';
import { NavParams, Platform, NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { Login } from '../login/login';

@Component({
  selector: 'page-change-phone',
  templateUrl: 'change-phone.html',
})
export class ChangePhone {
data:any;
user_phn:any;
usrphn:any;
language:any;
titles:any =[];
english: any =[];
punjabi: any =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, private storage: Storage, private toast:Toast) {
this.data = {};
this.data.phone = '';

this.english= { title: 'Change Phone Number', para: 'Enter Your 10 Digit mobile Number', mob:'New Mobile Number', sub: 'Submit'};
this.punjabi = { title: 'ਫੋਨ ਨੰਬਰ ਬਦਲੋ', para: 'ਆਪਣਾ 10 ਅੰਕਾਂ ਵਾਲਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਾਖਲ ਕਰੋ', mob:'ਨਵਾਂ ਮੋਬਾਈਲ ਨੰਬਰ', sub: 'ਜਮ੍ਹਾਂ ਕਰੋ'};
this.storage.get('lang').then((lang) => {
  this.language= lang;
  if(this.language == 'english'){
    this.titles = this.english;   
  }else{
    this.titles = this.punjabi;
  }
  console.log(this.titles);
})
}

submit(phone){
  this.storage.get('ph_no').then((ph_no) => {
  this.user_phn = ph_no;
  this.http.get("http://kailash.mediaoncloud.com/MLA/changePhone?phone=" +phone+ '&oldphone=' +this.user_phn).map(res => res.json()).subscribe(data => {
    this.usrphn = data;
    if(this.usrphn.status != 'Failed'){
      this.toast.show(`Your Phone number changed successfully`, 'long', 'center').subscribe(
          toast => {
            console.log(toast);
          });
          this.navCtrl.push(Login);
    }else{
      this.toast.show(`Invalid phone number`, 'long', 'center').subscribe(
        toast => {
          console.log(toast);
        });
    }
})
  })
}

}

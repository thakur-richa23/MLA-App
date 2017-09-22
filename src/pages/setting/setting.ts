import { Component } from '@angular/core';
import { NavParams, Platform, NavController} from 'ionic-angular';
import { LangSetting } from '../lang-setting/lang-setting';
import { EditProfile } from '../edit-profile/edit-profile';
import { Storage } from '@ionic/storage';
import { Login } from '../login/login';
import { ChangePhone } from '../change-phone/change-phone';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class Setting {
  language:any;
  titles:any =[];
  english: any =[];
  punjabi: any =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {
    this.english= { langset: 'Language setting', editprof: 'Edit Profile', chphno: 'Change Phone Number', logout: 'Logout', setting:'Setting'};
    this.punjabi = { langset: 'ਭਾਸ਼ਾ ਸੈਟਿੰਗ', editprof: 'ਸੋਧ ਪ੍ਰੋਫ਼ਾਈਲ', chphno: 'ਫੋਨ ਨੰਬਰ ਬਦਲੋ', logout: 'ਬਾਹਰ ਆਉਣਾ', setting:'ਸੈਟਿੰਗ'};
    this.storage.get('lang').then((lang) => {
    this.language= lang;
    if(this.language == 'english'){
      this.titles = this.english;   
      }
      else{
        this.titles = this.punjabi;
      }
    })
  }

  languagesett(){
    this.navCtrl.push(LangSetting);
  }
  profile(){
    this.navCtrl.push(EditProfile);
  }
  logout(){
    this.storage.set('Uid' , '');
    this.navCtrl.push(Login);
  }
  chn_num(){
    this.navCtrl.push(ChangePhone);
  }
}

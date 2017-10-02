import { Component } from '@angular/core';
import { NavParams, Platform, NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-lang-setting',
  templateUrl: 'lang-setting.html',
})
export class LangSetting {
  first:any;second:any;language:any;titles:any =[];title:any;relationship:any;englishleng: any =[];punjabi: any =[];gender:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {
    this.englishleng= { title: 'Language Setting', title1: 'English', title2: 'Punjabi', setlang: 'Set Language'};
    this.punjabi = { title: 'ਭਾਸ਼ਾ ਸੈਟਿੰਗ', title1: 'English', title2: 'ਪੰਜਾਬੀ', setlang: 'ਭਾਸ਼ਾ ਸੈੱਟ ਕਰੋ'};
    this.storage.get('lang').then((lang) => {
      this.language= lang;
      if(this.language == 'punjabi'){
        this.titles = this.punjabi;   
        this.relationship = 'punjabi';
      }else{
        this.titles = this.englishleng;
        this.relationship = 'english';
      }
    })
  }

  langset(a){
  this.storage.set("lang", a);
  this.storage.get('lang').then((lang) => {
  this.language= lang;
  this.navCtrl.setRoot(HomePage);
  })
}

}

import { Component } from '@angular/core';
import { NavParams, Platform, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUs {
  language:any;
  titles:any =[];
  english: any =[];
  punjabi: any =[];
  styleCustom:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
// this.message = "  ਡਾ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ ਜੀ  13 ਮਾਰਚ 1946 ਵਿਚ ਪਿੰਡ ,ਸ਼ੇਰੋਂ ਤਿਹਸੀਲ ਅਤੇ ਜ਼ਿਲਾ ਤਾਰਨ,ਪੰਜਾਬ ਵਿਚ ਪੈਦਾ ਹੋਏ ਸੀ . ਓਹਨਾ ਦੇ ਪਿਤਾ ਦਾ ਨਾਮ  ਸ਼੍ਰੀਮਾਨ  ਮਾਧੋ ਰਾਮ ਹੈ  ਅਤੇ ਮਾਤਾ ਦਾ ਨਾਮ ਸ਼੍ਰੀਮਤੀ ਰਾਵਾਲੀ ਦੇਵੀ ਹੈ. ਓਹਨਾ ਨੇ ਆਪਣੀ ਗ੍ਰੈਜੂਏਸ਼ਨ 1974 ਵਿਚ  ਟਿੱਬਿਆਂ ਕਾਲਜ, ਨਵੀਂ ਦਿੱਲੀ  ਤੋਂ ਕੀਤੀ .  ਡਾ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ ਨੂੰ ਬਹੁਤ ਹੀ ਈਮਾਨਦਾਰ ਅਤੇ ਧਰਤੀ ਹੇਠਲੇ ਆਗੂ ਵਜੋਂ ਜਾਣਿਆ ਜਾਂਦਾ ਹੈ.";
// this.message1=" ਉਹ ਮਾਨਵਤਾ ਦੀ ਸੇਵਾ ਡਾਕਟਰ ਦੇ ਅਮੀਰ ਪੇਸ਼ੇ ਨਾਲ ਕਰਦੇ ਹਨ . ਉਹ ਪੰਜਾਬ ਦੇ ਸਾਬਕਾ ਮੁੱਖ ਮੰਤਰੀ ਕੈਪਟਨ ਅਮਰਿੰਦਰ  ਸਿੰਘ ਦੇ ਬਹੁਤ ਨਜ਼ਦੀਕੀ ਸਮਝੇ ਜਾਂਦੇ ਹਨ.";

this.english= { title: 'Dr. Dharambir Agnihotri', Designation: 'MLA of Tarn Taran', pagetitle:'About MLA', message: 'He was born on 1946, March 13 at village Sheron, Tehsil & Distt Taran Taran, Punjab. His father’s name is Sh. Madho Ram and mother’s name is Shrimati Ravail Devi. He completed his graduation from Tibbia college, New Delhi. In 1974, He married to Kiran Agnihotri. Dr. dharambir agnihotri is known as a very honest and down to earth leader. He is popular among every one for his simple and soft spoken nature . He is serving the humanity with the noble profession of doctor. He is considered very close to former chief minister of Punjab Capt. Amarinder singh.'};
this.punjabi = { title: 'ਡਾਕਟਰ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ', Designation: 'ਐੱਮ ਐੱਲ ਐ (ਤਰਨ ਤਾਰਨ)', pagetitle:'ਵਿਧਾਇਕ ਬਾਰੇ', message: 'ਡਾ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ ਜੀ  13 ਮਾਰਚ 1946 ਵਿਚ ਪਿੰਡ ਸ਼ੇਰੋਂ, ਤਹਿਸੀਲ ਅਤੇ ਜ਼ਿਲਾ ਤਰਨ ਤਾਰਨ, ਪੰਜਾਬ ਵਿਚ ਪੈਦਾ ਹੋਏ ਸੀ . ਓਹਨਾ ਦੇ ਪਿਤਾ ਦਾ ਨਾਮ  ਸ਼੍ਰੀਮਾਨ  ਮਾਧੋ ਰਾਮ ਹੈ  ਅਤੇ ਮਾਤਾ ਦਾ ਨਾਮ ਸ਼੍ਰੀਮਤੀ ਰਾਵਾਲੀ ਦੇਵੀ ਹੈ. ਓਹਨਾ ਨੇ ਆਪਣੀ ਗ੍ਰੈਜਏਸ਼ਨ 1974 ਵਿਚ  ਟਿੱਬਿਆਂ ਕਾਲਜ, ਨਵੀਂ ਦਿੱਲੀ  ਤੋਂ ਕੀਤੀ .  ਡਾ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ ਨੂੰ ਬਹੁਤ ਹੀ ਈਮਾਨਦਾਰ ਅਤੇ ਮਿੱਟੀ ਨਾਲ ਜੁੜੇ ਹੋਏ ਆਗੂ ਵਜੋਂ ਜਾਣਿਆ ਜਾਂਦਾ ਹੈ. ਉਹ ਮਾਨਵਤਾ ਦੀ ਸੇਵਾ ਡਾਕਟਰ ਦੇ ਅਮੀਰ ਪੇਸ਼ੇ ਨਾਲ ਕਰਦੇ ਹਨ . ਉਹ ਪੰਜਾਬ ਦੇ ਮੁੱਖ ਮੰਤਰੀ ਕੈਪਟਨ ਅਮਰਿੰਦਰ  ਸਿੰਘ ਦੇ ਬਹੁਤ ਨਜ਼ਦੀਕੀ ਸਮਝੇ ਜਾਂਦੇ ਹਨ.'};
this.storage.get('lang').then((lang) => {
  this.language= lang;
  if(this.language == 'english'){
    this.titles = this.english;   
    this.styleCustom = "parah-1";
  }else{
    this.titles = this.punjabi;
    this.styleCustom = "parah-1 custom-FontPunjabi";
  }
})

  }
  
}

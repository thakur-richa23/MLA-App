import { Component } from '@angular/core';
import { NavParams, Platform, NavController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-view-suggestion',
  templateUrl: 'view-suggestion.html',
})
export class ViewSuggestion {
  apiurl:any;
  suggview:any = [];cssData: any = [];language:any;titles:any =[];titless:any =[];english: any =[];punjabi: any =[];
  userphne:any;userId:any;sugid:any;message:any;message1:any;
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, public navParams: NavParams, public http:Http, private storage: Storage) {
    this.apiurl="http://isp.mediaoncloud.com/MLA/";
    
    this.english= {title: 'View Suggestion', name: 'Name', sugg: 'Suggestion', mobile:'Phone Number'};
    this.punjabi = {title: 'ਸੁਝਾਅ ਦੇਖੋ', name: 'ਨਾਮ', sugg: 'ਸਲਾਹ', mobile:'ਮੋਬਾਈਲ'};
    this.storage.get('lang').then((lang) => {
    this.language= lang;
      if(this.language == 'english'){
        this.titles = this.english;   

      }else{
        this.titles = this.punjabi;
      }
      console.log(this.titles);
    })
    this.storage.get('Uid').then((Uid) => {
      this.userId = Uid;
      //alert(this.userId);
      let loadingPopup = this.loadingCtrl.create({
        content: '',
      });
      loadingPopup.present()
    this.http.get(this.apiurl+"sugessionView?userid="+ this.userId).map(res => res.json()).subscribe(data => {
      setTimeout(() => {
        if(data.status != 'Failed'){
          this.suggview= data; 
          loadingPopup.dismiss();
        }else{
          this.english= { message2: "There is no Suggestion"};
          this.punjabi = { message2: "ਕੋਈ ਸੁਝਾਅ ਨਹੀਂ ਹੈ"};
          this.storage.get('lang').then((lang) => {
          this.language= lang;
            if(this.language == 'english'){
              this.titless = this.english;   
            }else{
              this.titless = this.punjabi;
            }
        })
          loadingPopup.dismiss();
        }
      }, 1000); 
  })
})

  }
}

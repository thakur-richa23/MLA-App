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
  buttonClicked: boolean = false;
  suggview:any = [];cssData: any = [];language:any;titles:any =[];titless:any =[];english: any =[];punjabi: any =[];
  userphne:any;userId:any;sugid:any;message:any;message1:any;suggid:any;cssDataColor : any = [];sugrply:any =[];
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, public navParams: NavParams, public http:Http, private storage: Storage) {
    this.apiurl="http://isp.mediaoncloud.com/MLA/";
    
    this.english= {title: 'View Suggestion', name: 'Name', sugg: 'Suggestion', mobile:'Phone Number', area: 'Area', ward: 'Ward', village: 'Village', reply: 'Reply'};
    this.punjabi = {title: 'ਸੁਝਾਅ ਦੇਖੋ', name: 'ਨਾਮ', sugg: 'ਸਲਾਹ', mobile:'ਮੋਬਾਈਲ',area: 'ਖੇਤਰ', ward: 'ਵਾਰਡ', village: 'ਪਿੰਡ', reply: 'ਜਵਾਬ ਦਿਉ'};
    this.storage.get('lang').then((lang) => {
    this.language= lang;
      if(this.language == 'english'){
        this.titles = this.english;   

      }else{
        this.titles = this.punjabi;
      }
    })

    this.storage.get('Uid').then((Uid) => {
      this.userId = Uid;
      let loadingPopup = this.loadingCtrl.create({
        content: '',
      });
      loadingPopup.present()
    this.http.get(this.apiurl+"sugessionView?userid="+ this.userId).map(res => res.json()).subscribe(data => {
      setTimeout(() => {
        if(data.status != 'Failed'){
          this.suggview= data;
          for (let i = 0; i < this.suggview.length; i++) {
            this.cssData.push({
              class: 'custom-hide',
              classInner: 'custom-hide'
            });
           
            if(i%2==0){
            this.cssDataColor.push({
              class: 'custom-even',
            });
            }else{
            this.cssDataColor.push({
              class: 'custom-odd',
            });
            }
          } 
          this.suggid = data.id;
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

infocl(sug_id,index){
  for(let i = 0; i < this.cssData.length; i++){
    if(i === index)
      {
        if(this.cssData[index].class == 'custom-show'){
          this.cssData[index].class = 'custom-hide';
        }else{
          this.cssData[index].class = 'custom-show';
        }
      }
      else{
          this.cssData[i].class = 'custom-hide';
      }
    } 
  this.http.get(this.apiurl+"sugession_replyview?sugession_id="+ sug_id).map(res => res.json()).subscribe(data => {
   
    this.sugrply = data;
    
  })
}

}

import { Component } from '@angular/core';
import { NavParams, Platform, NavController, LoadingController, ActionSheetController, ToastController} from 'ionic-angular';
import { Complaint } from '../complaint/complaint';
import { Suggestion } from '../suggestion/suggestion';
import { Gallery } from '../gallery/gallery';
import { ComplaintInfo } from '../complaint-info/complaint-info';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Constituency } from '../constituency/constituency';
import { AboutUs } from '../about-us/about-us';
import { ViewSuggestion } from '../view-suggestion/view-suggestion';
import { Setting } from '../setting/setting';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tokenRec:any;
  UserId:any;
  fbresponse:any;
  tokenid:any;language:any;titles:any =[];english: any =[];punjabi: any =[];
  fbtype:any;
  fbName:any;
  fbuid:any;
  fbusId:any;
  typefb:any;
  constructor(public navCtrl: NavController, public platform:Platform, public http:Http, public navParams: NavParams, public storage: Storage) {  
    this.english= { title: 'Dr. Dharambir', lastname: 'Agnihotri', Designation: 'MLA of Tarn Taran', complaint: 'Complaints', view: 'View', comp: 'Complaint', sugges: 'Suggestion', viewsug: 'View Suggestion', gallery: 'Gallery', constituency: 'Constituency' };
    this.punjabi = { title: 'ਡਾਕਟਰ ਧਰਮਵੀਰ ', lastname: 'ਅਗਨੀਹੋਤਰੀ', Designation: 'ਐਮ ਐਲ ਏ (ਤਰਨ ਤਾਰਨ)', complaint: 'ਸਕਾਇਤ', view: 'ਦੇਖੋ ',comp: 'ਸਕਾਇਤ', sugges: 'ਸਲਾਹ', viewsug: 'ਸਲਾਹ ਦੇਖੋ', gallery: 'ਤਸਵੀਰਾਂ', constituency: 'ਚੋਣ ਖੇਤਰ'  };
    this.storage.get('lang').then((lang) => {
      this.language= lang;
      if(this.language == 'english'){
        this.titles = this.english;   
      }else{
        this.titles = this.punjabi;
      }
      console.log(this.titles);
    })


    this.fbtype = this.navParams.get('type');
    this.fbName = this.navParams.get('name');
    this.fbuid = this.navParams.get('usrid');
    if(this.fbtype){
      this.http.get("http://kailash.mediaoncloud.com/MLA/fblogin?fbusername=" + this.fbName + '&fbuserid=' + this.fbuid + '&type=' +this.fbtype).map(res =>res.json()).subscribe(data =>{
        this.fbresponse = data;
        this.storage.set('Uid', this.fbresponse.id); 
        this.storage.set('username', this.fbresponse.fbusername);
        this.storage.set('facebooktype', this.fbresponse.type);  
       })
    }
    

     this.storage.get('Uid').then((Uid) => {
      this.UserId = Uid;
      this.storage.get('token_id').then((token_id) => {
      this.tokenid= token_id;
      this.http.get("http://kailash.mediaoncloud.com/MLA/saveToken?user_id=" + this.UserId + '&token=' +this.tokenid).map(res =>res.json()).subscribe(data =>{
      this.tokenRec = data;
      })
    }); 
  });
}


  comp(){
    this.navCtrl.push(Complaint);
   
  }
  sugges(){
    this.navCtrl.push(Suggestion);
    
  }
  gallery(){
    this.navCtrl.push(Gallery);
  }
  compinfo(){
    this.navCtrl.push(ComplaintInfo);
  }
  constituent(){
    this.navCtrl.push(Constituency);
  }
  about(){
    this.navCtrl.push(AboutUs);
  }
  view_sugg(){
    this.navCtrl.push(ViewSuggestion)
  }
  setting(){
    this.navCtrl.push(Setting);
  }
}

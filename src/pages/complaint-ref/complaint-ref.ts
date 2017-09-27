import { Component } from '@angular/core';
import { NavParams, Platform, NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-complaint-ref',
  templateUrl: 'complaint-ref.html',
})
export class ComplaintRef {
  apiurl:any;
  private search: any;searchItem: any;allvalue: any = [];cssData: any = [];complaintname: any;complnt: any;p_image: any;refrenceno:any;
  videos: any;image: any;video: any;message: any;buttonClicked: boolean = false;buttonClick: boolean = false;uniqueid: any;allImage: any = [];reply: any = [];
  replymsg: any = [];replyimage: any = [];replyimages: any = [];replyvideo: any;reply_video: any;IsHidden: any = true;searchTerm: any;
  searchdata: any;allvalues1: any;language:any;titles:any =[];english: any =[];punjabi: any =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage) {
    this.apiurl="http://isp.mediaoncloud.com/MLA/";    
    
    this.english= { resp: 'Response'};
    this.punjabi = { resp: 'ਜਵਾਬ'};
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

  viewrefdetail(a) {
    this.buttonClick = !this.buttonClick;
      this.http.get(this.apiurl+"replyview?ref_num=" + a).map(res => res.json()).subscribe(data => {
        this.reply = data;
        this.replymsg = data[0].message;
        this.replyimage = data[0].images;
        this.replyvideo = data[0].video;
        this.replyimages = this.replyimage.split(",");
      });
  }

  onInput(searchTerm) {
    if (searchTerm.length >= 6) {
      this.buttonClicked = !this.buttonClicked;
      this.http.get(this.apiurl+'complaintviewref?ref_num=' + searchTerm).map(res => res.json()).subscribe(data => {
        this.complaintname = data[0].name;
        this.complnt = data[0].complaint;
        this.p_image = data[0].profile_img;
        this.refrenceno = data[0].ref_num;
        this.allImage = this.p_image.split(",");
        this.reply_video = data[0].video;
      });
    }
  }
}

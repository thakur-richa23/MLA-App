import { Component } from '@angular/core';
import { NavParams, Platform, NavController, LoadingController, AlertController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class Gallery {
  apiurl:any;
  slideData:any =[];slideData1:any =[];fb_res:any =[];fb_res1:any=[];items =[];allImages = [];imagesoffset : any;item=[];load:any;
  newmoviesoffset:any;moviesOffset:any;language:any;titles:any =[];english: any =[];punjabi: any =[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,private iab: InAppBrowser, public http: Http,public alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.apiurl="http://isp.mediaoncloud.com/MLA/";
    this.fb_api();
      this.fb_pagination();
      this.english= {gallery: 'Gallery'};
      this.punjabi = {gallery: 'ਤਸਵੀਰਾਂ'};
      this.storage.get('lang').then((lang) => {
        this.language= lang;
        if(this.language == 'english'){
          this.titles = this.english;   
        }else{
          this.titles = this.punjabi;
        }
        console.log(this.titles);
      })

    this.http.get(this.apiurl+"fbApiShowAll").map(res =>res.json()).subscribe(data =>{
    this.fb_res = 60 / 10;
  })
  }

  fb_api(){
    this.http.get(this.apiurl+"fbApi").map(res =>res.json()).subscribe(data =>{
      this.fb_res = data;
     })
  }
 
  fb_pagination(){
    var offsetlimit = 1;
    this.imagesoffset = offsetlimit;
     let loadingPopup = this.loadingCtrl.create({
        content: '',
      });
      loadingPopup.present()
    this.http.get(this.apiurl+"fbApi?page=" + offsetlimit).map(res =>res.json()).subscribe(data =>{
      setTimeout(() => {
        this.items = data;
        loadingPopup.dismiss();
      }, 1000); 
      if (data.length == 0) {
        let alert = this.alertCtrl.create({
          title: 'Images!',
          subTitle: 'No More Images available',
          buttons: ['Ok']
        });
        alert.present();
      } else {
        for (let i = 0; i < data.length; i++) {
          this.allImages.push(data[i]);
        }
      }   
     })
  }

  doInfinite(infiniteScroll,tset) {
    this.moviesOffset = tset; 
    
    this.newmoviesoffset = Number(this.moviesOffset) + 1;
    this.imagesoffset = this.newmoviesoffset;
    if(this.imagesoffset != 'blank'){
      let loadingPopup = this.loadingCtrl.create({
        content: '',
      });
      loadingPopup.present()
      this.http.get(this.apiurl+"fbApi?page=" + this.newmoviesoffset).map(res =>res.json()).subscribe(data =>{
        if(data.status != 'Failed')
          {
              this.item = data;
              if(this.item.length != 0 && this.moviesOffset < this.fb_res && data.status != 'Failed'){
            setTimeout(() => {
              this.load='';
                for (let i = 0; i < this.item.length; i++) {
                  this.allImages.push(this.item[i]);
                }
                loadingPopup.dismiss();      
                infiniteScroll.complete();     
                
            }, 1000);      
        }
        else{
            setTimeout(() => {
                this.load='No more images available...'
                infiniteScroll.complete();
            },1000);
        }
  }else{
    this.imagesoffset = 'blank';
    setTimeout(() => {
      this.load='No more images available...';
      loadingPopup.dismiss();      
      infiniteScroll.complete();
      
  },1000);
  }
    })
       loadingPopup.dismiss();  
    }
  }

openImage(image){
  var browser = this.iab.create(image);
  }
}

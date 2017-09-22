import { Component } from '@angular/core';
import { NavParams, Platform, NavController, LoadingController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ComplaintRef } from '../complaint-ref/complaint-ref';
import { Network } from '@ionic-native/network';

declare var window: any;

@Component({
  selector: 'page-complaint-info',
  templateUrl: 'complaint-info.html',
})
export class ComplaintInfo {
  allData: any = [];
  cssData: any = [];
  cssDataColor : any = [];
  displaycls:any;
  complaintname:any;
  complaintdate:any;
  complnt:any;
  p_image:any;
  videos:any;
  image: any;
  refnum: any;
  video: any;
  message: any;
  message1:any;
  buttonClicked: boolean = false;
  uniqueid: any;
  allImage: any = [];
  reply: any =[];
  replymsg: any =[];
  replyimage: any = [];
  allImages:any=[];
  allImages1:any=[];
  allvideo1:any =[];
  video1:any = [];
  allImages2:any=[];
  replyimages: any = [];
  replyvideo: any;
  IsHidden: any = true;
  searchTerm: any;
  searchdata: any;
  language:any;
  titles:any =[];
  titless:any =[];
  english: any =[];
  punjabi: any =[];
  userId:any;
  refrenceno:any;
  reply_video:any;
  buttonClick: boolean = false;
  buttonClickedd: boolean = false;
  serachreply:any =[];
  serachreplymsg:any =[];
  searchreplyimage:any =[];
  searchreplyvideo:any;
  searchreplyimages:any =[];
  splitimages:any = [];
  splitimg:any = [];
  enableIn:any;
  vol:any;
  status:any;
  videoshow:any;
  constructor(public navCtrl: NavController,private loadingCtrl: LoadingController, private network: Network, public navParams: NavParams, private storage: Storage, public http: Http, public platform:Platform) {
   
   this.enableIn = true;
   this.status='playimg';
   this.vol='mute';
    //--------------Internet connection----------//  
  this.network.onDisconnect().subscribe(() => {
    this.platform.ready().then(() => {
      window.plugins.toast.show("You are offline", "long", "center");
    });
});
this.network.onConnect().subscribe(()=> {
   this.platform.ready().then(() => {
      window.plugins.toast.show("You are online", "long", "center");
    });
});//-----------end here-----------//

    this.english= { viewdetail: 'View Detail', resp: 'Response', viewcomplaint:'View Complaint'};
    this.punjabi = { viewdetail: 'ਵੇਰਵੇ ਦੇਖੋ', resp: 'ਜਵਾਬ',viewcomplaint:'ਸਕਾਇਤ  ਦੇਖੋ'};
    this.storage.get('lang').then((lang) => {
    this.language= lang;
      if(this.language == 'english'){
        this.titles = this.english;   
      }else{
        this.titles = this.punjabi;
      }
     console.log(this.titles);
  })

    this.searchTerm = '';
    this.storage.get('Uid').then((Uid) => {
    this.userId = Uid;
    let loadingPopup = this.loadingCtrl.create({
      content: '',
    });
      loadingPopup.present()
        this.http.get("http://kailash.mediaoncloud.com/MLA/complaintview?userid=" +this.userId).map(res => res.json()).subscribe(data => {
         setTimeout(() => {
            if(data.status != 'Failed')
              {
                this.allData = data;
                loadingPopup.dismiss();
                this.videoshow = "custom-show";
                for (let i = 0; i < this.allData.length; i++) {
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
                  let img = this.allData[i].profile_img.split(",");
                 
                  this.allImages1.push({img});
                  let video = this.allData[i].video;
                  this.allvideo1.push({video});
                }
              }else{
                
                this.english= { message2: "There is no Complaints"};
                this.punjabi = { message2: "ਕੋਈ ਸ਼ਿਕਾਇਤ ਨਹੀਂ ਹੈ"};
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
       },1000); 

          })
    })
  }

  view_detail(index,b) {
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
      this.http.get("http://kailash.mediaoncloud.com/MLA/replyview?ref_num=" +b).map(res => res.json()).subscribe(data => {
        this.reply = data;
       // alert(JSON.stringify(this.reply));
       this.splitimages= [];
       for(let i = 0; i < data.length; i++){
         if(data[i].images != ''){
          let img = data[i].images.split(","); 
           this.splitimages.push({img});
         }
       }
        for(let i = 0; i < this.cssData.length; i++){
          if(i === index)
            {
              if(this.cssData[index].classInner == 'custom-show'){
                this.cssData[index].classInner = 'custom-hide';
              }else{
                this.cssData[index].classInner = 'custom-show';
              }
            }
            else{
                this.cssData[i].classInner = 'custom-hide';
            }
          } 
        });
  }

  searchBtn() {
   this.buttonClicked = !this.buttonClicked;
  }

  onInput(searchTerm) {
    if (searchTerm.length >= 6) {
      this.enableIn = 'false';
      this.http.get('http://kailash.mediaoncloud.com/MLA/complaintviewref?ref_num=' + searchTerm).map(res => res.json()).subscribe(data => {
        this.complaintname = data[0].name;
        this.complaintdate = data[0].date;
        this.complnt = data[0].complaint;
        this.p_image = data[0].profile_img;
        this.refrenceno = data[0].ref_num;
        this.allImage = this.p_image.split(",");
        this.reply_video = data[0].video;
      
      this.http.get("http://kailash.mediaoncloud.com/MLA/replyview?ref_num=" + this.refrenceno).map(res => res.json()).subscribe(data => {
        this.serachreply = data;
        for(let i = 0; i < data.length; i++){
          if(data[i].images != ''){
           let imgg = data[i].images.split(","); 
            this.splitimg.push({imgg});
          }
        }
      });
    });
    }

  }

  volume(){
    this.video=document.getElementById('video1');
 
    if (!this.video.muted) {
         this.video.muted = true;
         this.vol='mute';
 
     } else {
         this.video.muted = false;
         this.vol='unmute';
 
     }
 }
   play(){
     
     this.video=document.getElementById('video1');
     if(this.video.paused===false){
         this.status='playimg';
         this.video.pause();
       }
       else{
            this.status='pauseimg';
           this.video.play();        
       }
   }

   rewind(){
    this.video=document.getElementById('video1');
    this.video.currentTime-=10; 
  }
  
  forward(){
    this.video=document.getElementById('video1');
    this.video.currentTime+=10; 
  }

}

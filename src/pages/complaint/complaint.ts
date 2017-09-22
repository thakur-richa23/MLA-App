import { Component, ViewChild, NgZone } from '@angular/core';
import { NavParams, Platform, NavController, LoadingController, ActionSheetController, ToastController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { ImagePicker } from '@ionic-native/image-picker';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { Setting } from '../setting/setting';
import { LangSetting } from '../lang-setting/lang-setting';

declare var cordova: any;

@Component({
  selector: 'page-complaint',
  templateUrl: 'complaint.html',
})
export class Complaint {
  data:any;mulImages:any = [];uniqueid:any;response:any;lastImage:any;loading:any;usrid:any;fileTransfer:any;videourl:any;
  @ViewChild('myvideo') myVideo: any;videoUrl:any;videoUrlPath : any;postResponse:any =[];videosec:any;imageUrl:any =[];imageUrlpath : any = [];imageUrlTest : any =[];
  targetPath:any;url:any;filename:any;urlImage:any;images:any;videos:any;postRes:any=[];wardCategory:any =[];priority:any=[];issuetype:any =[];
  areatype:any=[];villagetype:any=[];buttonClicked: boolean = false;enableIn:any;show:any;value:any;value1:any;wardcat:any=[];priorityvalue:any;
  videoshow:any;language:any;titles:any =[];english: any =[];punjabi: any =[];phone_no:any;profile:any;p_no:any;addvalue:any;Areaa:any;
  catward:any;areavill:any;Email:any;userId:any;uid:any;comfac_type:any;fid:any;vol:any;status:any;video:any;
  constructor(public navCtrl: NavController, private toast: Toast, private storage: Storage, private imagePicker: ImagePicker, private mediaCapture: MediaCapture, public zone: NgZone, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public platform: Platform,public navParams: NavParams,public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController) {
    this.status='playimg';
    this.vol='mute';
    
    this.data = [];
    this.data.name = '';
    this.data.area = '';
    this.data.ward = '';
    this.data.Vill ='';
    this.data.address = '';
    this.data.complainAgainst = '';
    this.data.complaint = '';
    this.data.mobile = '';
    this.data.email = '';
    this.videoshow = "custom-hide";

    this.english= { name: 'Name', area: 'Select Area', ward: 'Select Ward', village: 'Select Village', address: 'Address', complainagainst: 'Complaint against', complaint: 'Complaint', mobile: 'Mobile', email: 'Email', submit: 'Submit'};
    this.punjabi = { name: 'ਨਾਮ', area: 'ਖੇਤਰ ਚੁਣੋ', ward: 'ਚੁਣੋ ਵਾਰਡ', village: 'ਪਿੰਡ ਚੁਣੋ', address: 'ਪਤਾ', complainagainst: 'ਸ਼ਿਕਾਇਤ ਵਿਰੁੱਧ ', complaint: 'ਸ਼ਿਕਾਇਤ', mobile: 'ਮੋਬਾਈਲ', email: 'ਈ - ਮੇਲ', submit: 'ਜਮ੍ਹਾਂ ਕਰੋ'};
    this.storage.get('lang').then((lang) => {
      this.language= lang;
      if(this.language == 'english'){
        this.titles = this.english;   

      }else{
        this.titles = this.punjabi;
      }
      console.log(this.titles);
    })


    this.storage.get('facebooktype').then((facebooktype) => {
    this.comfac_type = facebooktype;
    if(this.comfac_type != 'facebook'){
      this.storage.get('ph_no').then((ph_no) => {
        this.phone_no = ph_no;
        this.http.get("http://kailash.mediaoncloud.com/MLA/get_profile?user_id=" + this.phone_no).map(res => res.json()).subscribe(data => {
        this.profile = data.name;
        this.p_no = data.phone;
        this.addvalue = data.address;
        this.Areaa = data.area;
        this.catward = data.ward;
        this.areavill = data.village;
        this.Email = data.email;
        })
      })
    }
    if(this.comfac_type == 'facebook'){
        this.storage.get('Uid').then((Uid) => {
        this.fid = Uid;
        this.http.get("http://kailash.mediaoncloud.com/MLA/fblogin_profile?fbuserid=" + this.fid).map(res => res.json()).subscribe(data => {
        this.profile = data.name;
        this.p_no = data.phone;
        this.addvalue = data.address;
        this.Areaa = data.area;
        this.catward = data.ward;
        this.areavill = data.village;
        this.Email = data.email;
        })
      })
    }
   
})

    this.http.get("http://kailash.mediaoncloud.com/MLA/wardview").map(res => res.json()).subscribe(data => {
      this.wardCategory= data;   
  })

    this.http.get("http://kailash.mediaoncloud.com/MLA/issueType").map(res => res.json()).subscribe(data => {
      this.issuetype= data;
  })

  this.http.get("http://kailash.mediaoncloud.com/MLA/selectArea").map(res => res.json()).subscribe(data => {
    this.areatype= data;
    console.log(this.areatype);
  })

  this.http.get("http://kailash.mediaoncloud.com/MLA/selectVillage").map(res => res.json()).subscribe(data => {
    this.villagetype= data;
  })  


}
  areacategory(x){
    if (x == 'Tarn Taran City') {
      this.value = 'ward'; 
      this.value1 = '';
    } else if (x == 'Tarn Taran Village'){
      this.value = '';
      this.value1 = 'village'; 
    }
  } 

  selstate(y){
  if(y == 'Other'){
    this.enableIn = 'anyOther';
  }
  }

  wardcategory(a){
    this.http.get("http://kailash.mediaoncloud.com/MLA/wardview").map(res => res.json()).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
       if(data[i].id == a){
         console.log(data[i].priority);
         this.priorityvalue = data[i].priority;
       }    
    }  
  })
  }

  villagecat(b){

  }

  backbtn(){
    this.navCtrl.push(HomePage);
  }
 
  selectmulImage() {
    let actionSheet = this.actionSheetCtrl.create({
      //  title: 'Select Image Source',
      buttons: [{
        text: 'Upload Picture',
        cssClass: 'upload',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          //  this.uploadImage();
        }
      },
      {
        text: 'Use Camera',
        cssClass: 'camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
          //  this.uploadImage();
        }
      },
      {
        text: 'Cancel',
        cssClass: 'cancel',
        role: 'cancel'
      }]
    });
    actionSheet.present();
  }
// function for multiple images 
public takePicture(sourceType){
  const options: CameraOptions = {
    quality: 100,
    allowEdit: true,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true,
    destinationType: this.camera.DestinationType.FILE_URI
  }
  this.camera.getPicture(options).then((imageData) => {
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
    this.imagePicker.getPictures({maximumImagesCount: 10,
      quality: 75}).then((results) => {
      for (var i = 0; i < results.length; i++) {
        var imagePath = results[i].substr(0, results[i].lastIndexOf('/') + 1);
        var imageName = results[i].substr(results[i].lastIndexOf('/') + 1);
        var d = new Date(),
        n = d.getTime(),
        newFileName =  n + ".jpg";       
        this.copyFileToLocalDirMul(imagePath, imageName, newFileName,i);
      }
    }, (err) => { alert(err); });
  }else{
    var imagePath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
    var imageName = imageData.substr(imageData.lastIndexOf('/') + 1);
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";       
    this.copyFileToLocalDir(imagePath, imageName, newFileName);
  }
  }, (err) => {  
  });
}
// Copy the multiple image to a local folder
private copyFileToLocalDirMul(imagePath, imageName, newFileName,i) {
  this.file.copyFile(imagePath, imageName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
    var url = "http://kailash.mediaoncloud.com/MLA/saveImage";
     // File for Upload
     var targetPath = this.pathForImage(this.lastImage);
     // File name only
     let filename = this.lastImage;
     var options = {
       fileKey: "profile_img[]",
       fileName: filename,
       chunkedMode: false,
       mimeType: "multipart/form-data",
       params : {'fileName': filename}
     };
     this.fileTransfer= this.transfer.create();
     this.loading = this.loadingCtrl.create({
       content: 'Uploading...',
     });
     this.loading.present();
     // Use the FileTransfer to upload the image
     this.fileTransfer.upload(targetPath, url, options).then(data => { 
       let newImg;
       let newImgPath;
       newImg = 'http://kailash.mediaoncloud.com/MLAfiles/'+ filename;
       newImgPath = filename;
      this.imageUrl.push(newImg);
      this.imageUrlpath.push(newImgPath);
      this.loading.dismissAll();
       this.presentToast('Image succesful uploaded.');
     }, err => {
       this.loading.dismissAll()
       this.presentToast('Error while uploading file.');
     });
  }, error => {
    this.presentToast('Error while storing file.');
  });
}

// copy single image to localDir
private copyFileToLocalDir(imagePath, imageName, newFileName) {
   this.file.copyFile(imagePath, imageName, cordova.file.dataDirectory, newFileName).then(success => {
     this.lastImage = newFileName;
     var url = "http://kailash.mediaoncloud.com/MLA/saveImage";
      // File for Upload
      var targetPath = this.pathForImage(this.lastImage);
      // File name only
      let filename = this.lastImage;
      var options = {
        fileKey: "profile_img[]",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': filename}
      };
      this.fileTransfer= this.transfer.create();
      this.loading = this.loadingCtrl.create({
        content: 'Uploading...',
      });
      this.loading.present();
      // Use the FileTransfer to upload the image
      this.fileTransfer.upload(targetPath, url, options).then(data => { 
        let newImg;
        let newImgPath;
        newImg = 'http://kailash.mediaoncloud.com/MLAfiles/'+ filename;
        newImgPath = filename;
       this.imageUrl.push(newImg);
       this.imageUrlpath.push(newImgPath);
       this.loading.dismissAll();
        this.presentToast('Image succesful uploaded.');
      }, err => {
        this.loading.dismissAll()
        this.presentToast('Error while uploading file.');
      });
   }, error => {
     this.presentToast('Error while storing file.');
   });
 }

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
} 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

  SelectVideo() {
    let video = this.myVideo.nativeElement;
      return new Promise((resolve)=>{
      this.zone.run(()=>{
      var options = {
        quality : 95,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
        mediaType:this.camera.MediaType.VIDEO
      };
      this.camera.getPicture(options).then((data) => {
        video.src = data;
        var imagePath = video.src.substr(0, video.src.lastIndexOf('/') + 1);
        var imageName = video.src.substr(video.src.lastIndexOf('/') + 1);
        this.upload(imagePath, imageName, video);
      })
    })
  })
  }
    upload(correctPath, currentName,video) {
     var d = new Date(),
      n= d.getTime(),
      x= n + ".mp4";
      this.file.copyFile(correctPath, currentName, cordova.file.dataDirectory,x).then(success => {
        this.lastImage = x;
        var url = "http://kailash.mediaoncloud.com/MLA/saveVideo";
         // File for Upload
         var targetPath = this.pathForImage(this.lastImage);    
         // File name only
        // this.filename = this.lastImage;      
         var options = {
          fileKey: "video",
          fileName: x,
          chunkedMode: false,
          mimeType: "video/mp4"
        };
         this.fileTransfer= this.transfer.create();
         this.loading = this.loadingCtrl.create({
           content: 'Uploading...',
         });
         this.loading.present();
         // Use the FileTransfer to upload the image
         this.fileTransfer.upload(targetPath, url, options).then(data => {   
          this.videoUrl = 'http://kailash.mediaoncloud.com/MLAfiles/'+ x;
          this.videoUrlPath =  x;  
          this.loading.dismissAll();
         this.presentToast('video succesful uploaded.');
         this.videoshow = "custom-show";
         }, err => {
           this.loading.dismissAll()
           this.presentToast('Error while uploading file.');
         });
      }, error => {
        // alert(JSON.stringify(error));
        this.presentToast('Error while storing file.');
      });
  }

  submit(usrname,area,ward,Vill,address,complainAgainst,complaint,usrphone,email,priorityvalue){
    this.storage.get('Uid').then((Uid) => {
      this.userId = Uid;
      this.storage.get('unique_no').then((unique_no) => {
      this.uniqueid = unique_no;
      this.images = this.imageUrlpath.join();
      this.videos = this.videoUrlPath;
      var bodyString = 'id= &ref_num= &uuid=' +this.uniqueid + '&ip_addr= &name=' +usrname + '&userid=' +this.userId+  '&area=' + area+ '&address=' +address + '&ward=' +ward + '&village=' +Vill + '&complaint_against=' +complainAgainst + '&complaint=' +complaint + '&mobile=' + usrphone + '&email=' + email + '&profile_img=' +this.images+ '&video=' + this.videos + '&date= &priority='+priorityvalue+ '&status=';
      
      var headers = new Headers();
      headers.append("Accept", 'application/x-www-form-urlencoded');
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      // Create a request option
      let options = new RequestOptions({ headers: headers });
      if(usrname != '' && usrphone !='' && complaint !=''){
        this.http.post('http://kailash.mediaoncloud.com/MLA/complaint', bodyString, options).map(res => res.json()).subscribe(data => {
          this.postRes = data;
          this.postResponse = data.refference;
          this.storage.set('ref_no', this.postResponse);
          this.storage.get('ref_no').then((ref_no) => {
          this.usrid = ref_no;
        if(this.postRes.status == 'Success'){
          //alert("Your complaint has been sent successfully");
          this.toast.show(`Your complaint has been sent successfully`, 'long', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
          //this.navCtrl.setRoot(this.navCtrl.getActive().component);
          this.navCtrl.setRoot(HomePage);
        }else{
          //alert("Your Complaint not sent. Please try again");
          this.toast.show(`Your Complaint not sent. Please try again`, 'long', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        }
      });
      })
      }else{
       //alert("Some fields are required to be filled");
        this.toast.show(`Some fields are required to be filled`, 'long', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
  }); 
})
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


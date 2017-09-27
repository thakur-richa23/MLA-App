import { Component } from '@angular/core';
import { NavParams, Platform, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html',
})
export class Suggestion {
  data:any;
  apiurl:any;areasel:any;wardsel:any;villsel:any;addresss:any;
  ref:any;suggestionRes:any=[];suggestionid:any;uniqueid:any;wardCategory:any =[];areatype:any=[];villagetype:any=[];
  value:any;value1:any;priorityvalue:any;language:any;titles:any =[];english: any =[];punjabi: any =[];phone_no:any;
  profile:any;usrname:any;p_no:any;sugid:any;sugges: any;suggesname:any;suggesmobile:any;userId:any;uid:any;suggftype:any;s_fid:any;
  constructor(public navCtrl: NavController, private toast: Toast, public navParams: NavParams, private http: Http, private storage: Storage) {
    this.data = [];
    this.data.name = '';
    this.data.suggestion ='';
    this.data.mobile ='';
    this.apiurl="http://isp.mediaoncloud.com/MLA/";
    
    this.english= {name: 'Name',address:'Address', area: 'Select Area', ward: 'Select ward', village: 'Select village', sugg: 'Suggestion', mob:'Mobile', title: 'Dr. Dharambir Agnihotri', Designation: 'MLA of Tarn Taran', sub: 'Submit'};
    this.punjabi = { name: 'ਨਾਮ',address: 'ਪਤਾ', area: 'ਖੇਤਰ ਚੁਣੋ', ward: 'ਚੁਣੋ ਵਾਰਡ', village: 'ਪਿੰਡ ਚੁਣੋ', sugg: 'ਸਲਾਹ', mob:'ਮੋਬਾਈਲ', title: 'ਡਾਕਟਰ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ ', Designation: 'ਐਮ ਐਲ ਏ (ਤਰਨ ਤਾਰਨ)', sub: 'ਜਮ੍ਹਾਂ ਕਰੋ'};
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
    this.suggftype = facebooktype;
    if(this.suggftype != 'facebook'){
      this.storage.get('ph_no').then((ph_no) => {
        this.phone_no = ph_no;
        this.http.get(this.apiurl+"get_profile?user_id=" + this.phone_no).map(res => res.json()).subscribe(data => {
        this.profile = data.name;
        this.p_no = data.phone;
        this.addresss=data.address;
        this.areasel=data.area;
        this.wardsel=data.ward;
        this.villsel=data.village;
      })
    })
    }
    if(this.suggftype == 'facebook'){
      this.storage.get('Uid').then((Uid) => {
        this.s_fid = Uid;
        this.http.get(this.apiurl+"fblogin_profile?fbuserid=" + this.s_fid).map(res => res.json()).subscribe(data => {
        this.profile = data.name;
        this.p_no = data.phone;
      })
    })
    }
})

  this.http.get(this.apiurl+"wardview").map(res => res.json()).subscribe(data => {
    this.wardCategory= data;
   
})

this.http.get(this.apiurl+"selectArea").map(res => res.json()).subscribe(data => {
this.areatype= data;
console.log(this.areatype);
})

this.http.get(this.apiurl+"selectVillage").map(res => res.json()).subscribe(data => {
this.villagetype= data;

})  
}

areacategory(x){
  if (x == 'Tarn Taran City') {
    this.value = 'ward'; 
   // this.value1 = '';
  } else if (x == 'Tarn Taran Village'){
   // this.value = '';
  //  this.value1 = 'village'; 
  this.value = 'village';
  }
}

wardcategory(a){
  this.http.get(this.apiurl+"wardview").map(res => res.json()).subscribe(data => {
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

  submit(name,suggestion,mobile,area,ward,village,addres){
    this.storage.get('Uid').then((Uid) => {
      this.userId = Uid;
      this.storage.get('unique_no').then((unique_no) => {
        this.uniqueid = unique_no;
      var bodyString = 'id= &name=' +name + '&sugession=' + suggestion+ '&mobile=' +mobile + '&uuid=' +this.uniqueid + '&userid=' +this.userId+'&area='+area+'&address='+addres+'&ward='+ward+'&village='+village;
      // Set content type to JSON
      var headers = new Headers();
      headers.append("Accept", 'application/x-www-form-urlencoded');
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      // Create a request option
      let options = new RequestOptions({ headers: headers });
      this.http.post(this.apiurl+'sugession', bodyString, options).map(res => res.json()).subscribe(data => {
      this.suggestionRes = data;
      this.uid = data.userid;
      if(this.suggestionRes.status == 'Success'){
         //alert("Your Suggestion submitted successfully");
          this.toast.show(`Your suggestion submitted successfully`, 'long', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
          this.navCtrl.setRoot(HomePage);
      }else{
         //alert("Your Suggestion is not submitted. Please try again");
          this.toast.show(`Your suggetsion is not submitted. Please try again`, 'long', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
      }
      console.log(this.suggestionRes);
    })
  })
})
}
}

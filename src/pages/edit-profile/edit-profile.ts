import { Component } from '@angular/core';
import { NavParams, Platform, NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { Setting } from '../setting/setting';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfile {
  apiurl:any;
data:any;profile:any;fprof:any;phone_no:any;Email:any;catward:any;add:any;p_no:any;addvalue:any;areavill:any;saveprofile:any;Areaa:any;
language:any;titles:any =[];english: any =[];punjabi: any =[];usrname:any;wardCategory:any =[];priority:any=[];
issuetype:any =[];areatype:any=[];villagetype:any=[];value:any;value1:any;priorityvalue:any;f_type:any;facebookid:any;facid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast:Toast,public http: Http, private storage:Storage) {
    this.apiurl="http://isp.mediaoncloud.com/MLA/";    
    
    this.data = {};
   this.english= { name: 'Name', area: 'Area', ward: 'Ward', village: 'Village', address: 'Address', complainagainst: 'Complaint against', complaint: 'Complaint', mobile: 'Mobile', email: 'Email', submit: 'Submit', gender: 'Gender', selectGen: 'Select Gender', Female: 'Female', male: 'Male', optional:'Optional', saveprof:'Save profile', title: 'Dr. Dharambir Agnihotri', Designation: 'MLA of Tarn Taran'};
   this.punjabi = { name: 'ਨਾਮ', area: 'ਖੇਤਰ', ward: 'ਵਾਰਡ', village: 'ਪਿੰਡ', address: 'ਪਤਾ', complainagainst: 'ਸ਼ਿਕਾਇਤ ਵਿਰੁੱਧ ', complaint: 'ਸ਼ਿਕਾਇਤ', mobile: 'ਮੋਬਾਈਲ', email: 'ਈ - ਮੇਲ', submit: 'ਜਮ੍ਹਾਂ ਕਰੋ', gender: 'ਲਿੰਗ', selectGen: 'ਲਿੰਗ ਚੁਣੋ', Female: 'ਔਰਤ', male: 'ਮਰਦ', optional:'ਵਿਕਲਪਿਕ', saveprof:'Save profile', title: 'ਡਾਕਟਰ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ ', Designation: 'ਐਮ ਐਲ ਏ (ਤਰਨ ਤਾਰਨ)'};
   this.storage.get('lang').then((lang) => {
     this.language= lang;
     if(this.language == 'english'){
       this.titles = this.english;   
     }else{
       this.titles = this.punjabi;
     }
     console.log(this.titles);
   })

   this.http.get(this.apiurl+"wardview").map(res => res.json()).subscribe(data => {
    this.wardCategory= data;
   
})

this.http.get(this.apiurl+"issueType").map(res => res.json()).subscribe(data => {
  this.issuetype= data;
})


this.http.get(this.apiurl+"selectArea").map(res => res.json()).subscribe(data => {
this.areatype= data;
console.log(this.areatype);
})


this.http.get(this.apiurl+"selectVillage").map(res => res.json()).subscribe(data => {
this.villagetype= data;

})  

this.storage.get('facebooktype').then((facebooktype) => {
  this.f_type = facebooktype;
  if(this.f_type != 'facebook'){
    this.storage.get('ph_no').then((ph_no) => {
      this.phone_no = ph_no;
      this.http.get(this.apiurl+"get_profile?user_id=" + this.phone_no).map(res => res.json()).subscribe(data => {
       this.profile = data.name;
       this.storage.set("username", this.profile);
       this.storage.get('username').then((username) => {
      this.usrname = username;
       })
       this.p_no = data.phone;
       this.addvalue = data.address;
       this.Areaa = data.area;
       this.catward = data.ward;
       this.areavill = data.village;
       this.Email = data.email;
     })
   })
  }
  if(this.f_type == 'facebook'){
    this.storage.get('Uid').then((Uid) => {
      this.facebookid = Uid;
      this.http.get(this.apiurl+"fblogin_profile?fbuserid=" + this.facebookid).map(res => res.json()).subscribe(data => {
       this.fprof = data.name;
       this.storage.set("username", this.fprof);
       this.storage.get('username').then((username) => {
         this.usrname = username;
       })
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
}

areacategory(x){
  if (x == 'Tarn Taran City') {
    this.value = 'ward'; 
    
    //this.value1 = '';
  } else if (x == 'Tarn Taran Village'){
    this.value = 'village';
  //  this.value1 = 'village'; 
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

editprofile(){
  this.navCtrl.push(Setting);

}
  submit(profile,addvalue,Areaa,catward,areavill,Email,gender){
  this.storage.get('Uid').then((Uid) => {
    this.facid = Uid;
    this.http.get(this.apiurl+"update_profile?name=" +profile + '&address=' + addvalue + '&area=' +Areaa+  '&ward=' + catward + '&village=' + areavill +'&gender=' +gender + '&email=' +Email+ '&id=' +this.facid).map(res => res.json()).subscribe(data => {
      this.saveprofile = data;
      console.log(this.saveprofile);
      if(this.saveprofile.Status == 'Success') {
        //alert("Profile Updated Successfully");
        this.toast.show(`Profile Updated Successfully`, 'long', 'center').subscribe(
            toast => {
              console.log(toast);
        });
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
        this.navCtrl.setRoot(HomePage);
      }else{
        //alert("Profile Not Updated ");
        this.toast.show(`Profile Not Updated`, 'long', 'center').subscribe(
          toast => {
            console.log(toast);
          });
      }
  })
})
 
  }

  

}

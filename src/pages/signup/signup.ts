import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavParams, Platform, NavController, LoadingController, ActionSheetController, ToastController} from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { Login } from '../login/login';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {
  signupData:any;
  data:any;
  wardCategory:any =[];
  areatype:any=[];
  villagetype:any=[];
  value:any;
  value1:any;
  priorityvalue:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, private toast:Toast) {

    this.data = [];
    this.data.name = '';
    this.data.mobile = '';
    this.data.pass = '';
    this.data.area = '';
    this.data.ward = '';
    this.data.Vill = '';
    this.data.address = '';
    this.data.email = '';

    this.http.get("http://kailash.mediaoncloud.com/MLA/wardview").map(res => res.json()).subscribe(data => {
    this.wardCategory= data;     
  })

    this.http.get("http://kailash.mediaoncloud.com/MLA/selectArea").map(res => res.json()).subscribe(data => {
    this.areatype= data;
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
 
  wardcateg(a){
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

  submit(name,mobile,area,ward,Vill,address,email){
    if(this.data.name != '' && this.data.mobile !='' && this.data.address != ''){
      this.http.get("http://kailash.mediaoncloud.com/MLA/signup?id=&name=" +name+ '&phone=' +mobile+ '&area=' +area+ '&ward=' +ward+ '&village=' +Vill+ '&address=' +address+ '&email=' +email).map(res => res.json()).subscribe(data => {
        this.signupData = data;
        if(this.signupData.status != 'Failed'){
          //alert("You have registered successfully");
          this.toast.show(`You have registered successfully`, 'long', 'center').subscribe(
            toast => {
              console.log(toast);
            });
            this.navCtrl.push(Login);
        }else{
          //alert("Already Signed Up");
          this.toast.show(`Already Signed Up`, 'long', 'center').subscribe(
            toast => {
              console.log(toast);
            });  
        }
    })
    }else{
      //alert("Some fields are required to be filled");
      this.toast.show(`Some fields are required to be filled`, 'long', 'center').subscribe(
        toast => {
          console.log(toast);
        });
    }
    
  }
  

}

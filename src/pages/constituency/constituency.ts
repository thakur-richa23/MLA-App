import { Component } from '@angular/core';
import { NavParams, Platform, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-constituency',
  templateUrl: 'constituency.html',
})
export class Constituency {
msg:any;
msg1:any;
language:any;
titles:any =[];
english: any =[];
punjabi: any =[];
styleCustom:any;
constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
 
  this.english= { pagetitle:'Constituency', message: 'Tarn Taran constituency is one of the 117 seats of Punjab Vidhan Sabha and its constituency number is 21. Dr. Dharambir Agnihotri, who belongs to Congress, has won the last assembly elections and is the current MLA of Tarn Taran. He won the last assembly elections held in 2017 by defeating its nearest opponent Harmeet Singh Sandhu of SAD with a margin of 14629 votes.', message2: 'As per the voter list for 2017 assembly elections, the total number of voters in Tarn Taran constituency is 181901. During these elctions, the election commission established 203 polling stations, situated at 111 different locations across this assembly segment. During the 2017 elections, the total number of votes cast in this constituency was 132333 and the voting percentage was recorded at 72.75%, which was less than the state average of 77.4%.'};
  this.punjabi = { pagetitle:'ਚੋਣ ਖੇਤਰ', message: 'ਤਰਨ ਤਾਰਨ ਚੋਣ ਖੇਤਰ , ਪੰਜਾਬ ਵਿਧਾਨ ਸਭਾ ਦੀਆਂ 117 ਸੀਟਾਂ ਵਿੱਚੋ ਇੱਕ ਹੈ ਅਤੇ ਇਸਦੇ ਹਲਕੇ ਦਾ ਨੰਬਰ 21 ਹੈ . ਕਾਂਗਰਸ ਦੇ ਰਹਿਣ ਵਾਲੇ ਡਾ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ ਨੇ ਪਿਛਲੀਆਂ ਵਿਧਾਨ  ਸਭਾ ਚੋਣਾਂ ਵਿੱਚ ਜਿੱਤ ਪ੍ਰਾਪਤ  ਕੀਤੀ ਹੈ ਅਤੇ ਮੌਜੂਦਾ ਤਰਨ ਤਾਰਨ ਦੇ ਵਿਧਾਇਕ ਹਨ . ਓਨ੍ਨਾ ਨੇ 2017 ਵਿੱਚ ਹੋਈਆਂ ਪਿਛਲੀਆਂ ਵਿਧਾਨ ਸਭਾ ਚੋਣਾਂ ਵਿੱਚ ਅਕਾਲੀ ਦਲ ਦੇ ਨਜ਼ਦੀਕੀ ਵਿਰੋਧੀ ਹਰਮੀਤ ਵਿਧਾਨ  ਸਿੰਘ  ਸੰਧੂ ਨੂੰ 14629 ਵੋਟਾਂ ਦੇ ਨਾਲ ਹਰਾਇਆ.', message2: '2017 ਵਿਧਾਨ ਸਭਾ ਚੋਣਾਂ ਦੇ ਵੋਟਰ ਸੂਚੀ ਅਨੁਸਾਰ   ਤਾਰਨ ਹਲਕੇ  ਦੇ ਕੁਲ 181901 ਵੋਟਰ ਹਨ.  ਇਨ੍ਹਾਂ  ਚੋਂਣਾ ਵਿੱਚ  ਚੋਣ ਕਮਿਸ਼ਨ ਨੇ 203 ਪੋਲਿੰਗ ਸਟੇਸ਼ਨ ਸਥਾਪਿਤ ਕੀਤੇ, ਜੋ ਇਸ ਵਿਧਾਨ  ਸਭਾ ਹਲਕੇ ਦੇ 111 ਵੱਖ- ਵੱਖ ਸਥਾਨਾਂ ਤੇ ਸਿਥਤ ਹਨ. 2017 ਦੀਆਂ ਚੋਣਾਂ ਦੇ ਦੌਰਾਨ, ਇਸ ਖੇਤਰ ਿਵੱਚ 132333 ਵੋਟਾ ਪਈਆਂ ਸਨ ਅਤੇ ਵੋਟਿੰਗ ਪ੍ਤੀਸ਼ਤ 72.75%  ਵਿਚ  ਦਰਜ ਕੀਤੀ ਗਈ ਸੀ, ਜੋ ਰਾਜ ਦੀ ਔਸਤ 77.4 ਤੋਂ ਘੱਟ ਸੀ. '};
  this.storage.get('lang').then((lang) => {
    this.language= lang;
    if(this.language == 'english'){
      this.titles = this.english; 
      this.styleCustom = "parah-1";  
    }else{
      this.titles = this.punjabi;
      this.styleCustom = "parah-1 custom-FontPunjabi";
    }
    console.log(this.titles);
  })

}

}

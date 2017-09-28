webpackJsonp([0],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComplaintInfo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ComplaintInfo = (function () {
    function ComplaintInfo(navCtrl, loadingCtrl, network, navParams, storage, http, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.network = network;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.platform = platform;
        this.allData = [];
        this.cssData = [];
        this.cssDataColor = [];
        this.buttonClicked = false;
        this.allImage = [];
        this.reply = [];
        this.replymsg = [];
        this.replyimage = [];
        this.allImages = [];
        this.allImages1 = [];
        this.allvideo1 = [];
        this.video1 = [];
        this.allImages2 = [];
        this.replyimages = [];
        this.IsHidden = true;
        this.titles = [];
        this.titless = [];
        this.english = [];
        this.punjabi = [];
        this.buttonClick = false;
        this.buttonClickedd = false;
        this.serachreply = [];
        this.serachreplymsg = [];
        this.searchreplyimage = [];
        this.searchreplyimages = [];
        this.splitimages = [];
        this.splitimg = [];
        this.apiurl = "http://isp.mediaoncloud.com/MLA/";
        this.enableIn = true;
        this.status = 'playimg';
        this.vol = 'mute';
        //--------------Internet connection----------//  
        this.network.onDisconnect().subscribe(function () {
            _this.platform.ready().then(function () {
                window.plugins.toast.show("You are offline", "long", "center");
            });
        });
        this.network.onConnect().subscribe(function () {
            _this.platform.ready().then(function () {
                window.plugins.toast.show("You are online", "long", "center");
            });
        }); //-----------end here-----------//
        this.english = { viewdetail: 'View Detail', resp: 'Response', viewcomplaint: 'View Complaint' };
        this.punjabi = { viewdetail: 'ਵੇਰਵੇ ਦੇਖੋ', resp: 'ਜਵਾਬ', viewcomplaint: 'ਸਕਾਇਤ  ਦੇਖੋ' };
        this.storage.get('lang').then(function (lang) {
            _this.language = lang;
            if (_this.language == 'english') {
                _this.titles = _this.english;
            }
            else {
                _this.titles = _this.punjabi;
            }
            console.log(_this.titles);
        });
        this.searchTerm = '';
        this.storage.get('Uid').then(function (Uid) {
            _this.userId = Uid;
            var loadingPopup = _this.loadingCtrl.create({
                content: '',
            });
            loadingPopup.present();
            _this.http.get(_this.apiurl + "complaintview?userid=" + _this.userId).map(function (res) { return res.json(); }).subscribe(function (data) {
                setTimeout(function () {
                    if (data.status != 'Failed') {
                        _this.allData = data;
                        loadingPopup.dismiss();
                        _this.videoshow = "custom-show";
                        for (var i = 0; i < _this.allData.length; i++) {
                            _this.cssData.push({
                                class: 'custom-hide',
                                classInner: 'custom-hide'
                            });
                            if (i % 2 == 0) {
                                _this.cssDataColor.push({
                                    class: 'custom-even',
                                });
                            }
                            else {
                                _this.cssDataColor.push({
                                    class: 'custom-odd',
                                });
                            }
                            var img = _this.allData[i].profile_img.split(",");
                            _this.allImages1.push({ img: img });
                            var video = _this.allData[i].video;
                            _this.allvideo1.push({ video: video });
                        }
                    }
                    else {
                        _this.english = { message2: "There is no Complaints" };
                        _this.punjabi = { message2: "ਕੋਈ ਸ਼ਿਕਾਇਤ ਨਹੀਂ ਹੈ" };
                        _this.storage.get('lang').then(function (lang) {
                            _this.language = lang;
                            if (_this.language == 'english') {
                                _this.titless = _this.english;
                            }
                            else {
                                _this.titless = _this.punjabi;
                            }
                        });
                        loadingPopup.dismiss();
                    }
                }, 1000);
            });
        });
    }
    ComplaintInfo.prototype.view_detail = function (index, b) {
        var _this = this;
        for (var i = 0; i < this.cssData.length; i++) {
            if (i === index) {
                if (this.cssData[index].class == 'custom-show') {
                    this.cssData[index].class = 'custom-hide';
                }
                else {
                    this.cssData[index].class = 'custom-show';
                }
            }
            else {
                this.cssData[i].class = 'custom-hide';
            }
        }
        this.http.get(this.apiurl + "replyview?ref_num=" + b).map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.reply = data;
            _this.splitimages = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].images != '') {
                    var img = data[i].images.split(",");
                    _this.splitimages.push({ img: img });
                }
            }
            for (var i = 0; i < _this.cssData.length; i++) {
                if (i === index) {
                    if (_this.cssData[index].classInner == 'custom-show') {
                        _this.cssData[index].classInner = 'custom-hide';
                    }
                    else {
                        _this.cssData[index].classInner = 'custom-show';
                    }
                }
                else {
                    _this.cssData[i].classInner = 'custom-hide';
                }
            }
        });
    };
    ComplaintInfo.prototype.searchBtn = function () {
        this.buttonClicked = !this.buttonClicked;
    };
    ComplaintInfo.prototype.onInput = function (searchTerm) {
        var _this = this;
        if (searchTerm.length >= 6) {
            this.enableIn = 'false';
            this.http.get(this.apiurl + 'complaintviewref?ref_num=' + searchTerm).map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.complaintname = data[0].name;
                _this.complaintdate = data[0].date;
                _this.complnt = data[0].complaint;
                _this.p_image = data[0].profile_img;
                _this.refrenceno = data[0].ref_num;
                _this.allImage = _this.p_image.split(",");
                _this.reply_video = data[0].video;
                _this.http.get(_this.apiurl + "replyview?ref_num=" + _this.refrenceno).map(function (res) { return res.json(); }).subscribe(function (data) {
                    _this.serachreply = data;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].images != '') {
                            var imgg = data[i].images.split(",");
                            _this.splitimg.push({ imgg: imgg });
                        }
                    }
                });
            });
        }
    };
    ComplaintInfo.prototype.volume = function () {
        this.video = document.getElementById('video1');
        if (!this.video.muted) {
            this.video.muted = true;
            this.vol = 'mute';
        }
        else {
            this.video.muted = false;
            this.vol = 'unmute';
        }
    };
    ComplaintInfo.prototype.play = function () {
        this.video = document.getElementById('video1');
        if (this.video.paused === false) {
            this.status = 'playimg';
            this.video.pause();
        }
        else {
            this.status = 'pauseimg';
            this.video.play();
        }
    };
    ComplaintInfo.prototype.rewind = function () {
        this.video = document.getElementById('video1');
        this.video.currentTime -= 10;
    };
    ComplaintInfo.prototype.forward = function () {
        this.video = document.getElementById('video1');
        this.video.currentTime += 10;
    };
    return ComplaintInfo;
}());
ComplaintInfo = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-complaint-info',template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\complaint-info\complaint-info.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title >{{titles.viewcomplaint}}</ion-title>\n    <ion-icon ios="ios-search" md="md-search" class="searchicon" (click)="searchBtn()" ></ion-icon>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content style="background-color:#f9e7cf; margin-top:30px;">\n<ion-searchbar *ngIf="buttonClicked" [(ngModel)]="searchTerm" [showCancelButton]="shouldShowCancel" (ionInput)="onInput(searchTerm)" ></ion-searchbar>\n<div *ngIf= "enableIn == true">\n<div *ngIf="allData">\n<ion-row *ngFor="let data of allData; let i= index" class="rnumber {{cssDataColor[i].class}}">\n  <span>{{allData[i].ref_num}}</span><a (click)="view_detail(i, allData[i].ref_num)" href="#">{{titles.viewdetail}}</a>\n  <ion-card [class] = "cssData[i].class">\n      <ion-card-content>\n        <ion-row  class="complaint-row">\n        <h4 > {{allData[i].name}}</h4>\n        <p > {{allData[i].date}}</p>\n        </ion-row>\n        <ion-row>\n          <p class="para-complaint">{{allData[i].complaint}}</p>\n        </ion-row>\n        <ion-row *ngIf="allImages1[i].img != \'\' ">\n        <img *ngFor="let img of allImages1[i].img" src="http://kailash.mediaoncloud.com/MLAfiles/{{img}}" class="gal-img"/>\n        </ion-row>\n        <ion-row class="video-main">\n        <video *ngIf="allData[i].video != \'\' && allData[i].video != \'undefined\' " width="100%" height="150" id="video1" poster="img/postr.jpg" src="http://kailash.mediaoncloud.com/MLAfiles/{{allData[i].video}}" type="video/mp4" codecs="avc1.42E01E, mp4a.40.2"></video>  \n        </ion-row>\n        <ion-row *ngIf="allData[i].video != \'\' && allData[i].video != \'undefined\' " class="plyer-row" > \n            <img src="img/backward.png" (click)="rewind()"/>\n            <img  *ngIf="status==\'playimg\'"  src="img/play.png"  (click)="play()" />\n            <img  *ngIf="status==\'pauseimg\'" src="img/stop.png" (click)="play()" />\n            <img   src="img/forward.png" (click)="forward()"/>\n            <img   class="volume-img" *ngIf="vol==\'unmute\'" src="img/volume.png"  (click)="volume()" />\n            <img  class="volume-img"  *ngIf="vol==\'mute\'" src="img/mute.png" (click)="volume()" />\n        </ion-row>\n      \n        <!-- <ion-row>\n        <a (click)="view(allData[i].ref_num,i)" class="response">{{titles.resp}}</a>\n        </ion-row> -->\n        <!-- <ion-row > \n        <p  *ngFor="let rep of reply" style="color:black;width:100%;">{{rep.message}}</p><br>\n        </ion-row> -->\n        <ion-row [class] = "cssData[i].classInner"> \n          <p  *ngFor="let rep of reply" class="reponse-us">\n              <span class="date">{{rep.date}}</span>\n              {{rep.message}}\n             <ion-row class="subject"> <span>{{rep.subject}}</span> </ion-row>\n            \n            </p>\n        </ion-row>\n        <div [class] = "cssData[i].classInner">\n          <div *ngFor="let imgeee of splitimages">\n            <div *ngFor="let imgee of imgeee.img">\n             <img *ngIf="imgee" src="http://kailash.mediaoncloud.com/MLAfiles/{{imgee}}" class="gal-img" />\n            </div>\n          </div>\n        </div>\n        <div [class] = "cssData[i].classInner" *ngFor="let repvideos of reply">\n          <ion-row class="video-main" >\n            <video *ngIf="repvideos.video != \'\' " width="100%" height="150" id="video1" poster="img/postr.jpg" src="http://kailash.mediaoncloud.com/MLAfiles/{{repvideos.video}}" type="video/mp4" codecs="avc1.42E01E, mp4a.40.2"></video>\n          </ion-row>\n          <ion-row *ngIf="repvideos.video != \'\' " class="plyer-row"> \n              <img  src="img/backward.png" (click)="rewind()"/>\n              <img  *ngIf="status==\'playimg\'"  src="img/play.png"  (click)="play()" />\n              <img  *ngIf="status==\'pauseimg\'" src="img/stop.png" (click)="play()" />\n              <img   src="img/forward.png" (click)="forward()"/>\n              <img   class="volume-img"   *ngIf="vol==\'unmute\'" src="img/volume.png"  (click)="volume()" />\n              <img  class="volume-img"   *ngIf="vol==\'mute\'" src="img/mute.png" (click)="volume()" />\n          </ion-row>\n        </div>\n        \n      </ion-card-content>\n    </ion-card>\n</ion-row>\n</div>\n</div>\n\n<!-- search bar-->\n<ion-row *ngIf="enableIn == \'false\'">\n    <ion-card class="rnumber1">\n    <ion-card-content>\n        <ion-row class="complaint-row1">\n         <h4>{{complaintname}}</h4>\n         <p>{{complaintdate}}</p>\n          </ion-row>\n          <ion-row >\n          <p class="para-complaint1">{{complnt}}</p>\n          </ion-row>\n          <ion-row *ngIf="allImage != \'\' ">\n          <img *ngFor="let img of allImage" src="http://kailash.mediaoncloud.com/MLAfiles/{{img}}" class="gal-img1"/>\n          </ion-row>\n          <ion-row class="video-main">\n          <video  *ngIf="reply_video != \'\' && reply_video != \'undefined\'" width="100%" height="150" id="video1" poster="img/postr.jpg" src="http://kailash.mediaoncloud.com/MLAfiles/{{reply_video}}" type="video/mp4" codecs="avc1.42E01E, mp4a.40.2"></video>\n          </ion-row>\n          <ion-row *ngIf="reply_video != \'\' && reply_video != \'undefined\'" class="plyer-row" >  \n              <img  src="img/backward.png" (click)="rewind()"/>\n              <img  *ngIf="status==\'playimg\'"  src="img/play.png"  (click)="play()" />\n              <img  *ngIf="status==\'pauseimg\'" src="img/stop.png" (click)="play()" />\n              <img   src="img/forward.png" (click)="forward()"/>\n              <img   class="volume-img"   *ngIf="vol==\'unmute\'" src="img/volume.png"  (click)="volume()" />\n              <img  class="volume-img"   *ngIf="vol==\'mute\'" src="img/mute.png" (click)="volume()" />\n          </ion-row>\n          <!-- <ion-row>\n          <a (click)="viewrefdetail(refrenceno)" class="response1">{{titles.resp}}</a>\n          </ion-row> -->\n          <ion-row >\n           <p *ngFor="let reply of serachreply" class="reponse-us">\n              <span class="date">{{reply.date}}</span>\n              {{reply.message}}\n             <ion-row class="subject"> <span>{{reply.subject}}</span> </ion-row> \n            </p>\n          </ion-row>\n             <div *ngFor="let img of splitimg">\n             <div *ngFor="let imge of img.imgg">\n               <img *ngIf="imge" src="http://kailash.mediaoncloud.com/MLAfiles/{{imge}}" class="gal-img1" />\n             </div>\n             </div>\n           <div *ngFor="let videos of serachreply">\n             <ion-row class="video-main">\n               <video *ngIf="videos.video != \'\' " width="100%" height="150" id="video1" poster="img/postr.jpg" src="http://kailash.mediaoncloud.com/MLAfiles/{{videos.video}}" type="video/mp4" codecs="avc1.42E01E, mp4a.40.2"></video>              \n             </ion-row>\n             <ion-row *ngIf="videos.video != \'\' " class="plyer-row"> \n                <img  src="img/backward.png" (click)="rewind()"/>\n                <img  *ngIf="status==\'playimg\'"  src="img/play.png"  (click)="play()" />\n                <img  *ngIf="status==\'pauseimg\'" src="img/stop.png" (click)="play()" />\n                <img   src="img/forward.png" (click)="forward()"/>\n                <img   class="volume-img"   *ngIf="vol==\'unmute\'" src="img/volume.png"  (click)="volume()" />\n                <img  class="volume-img"   *ngIf="vol==\'mute\'" src="img/mute.png" (click)="volume()" />\n            </ion-row>\n          </div>\n          </ion-card-content>\n       </ion-card>\n     </ion-row>\n<div> \n  <p style="margin:1em 3em;font-size:20px;font-weight:500;color:#000;">{{titless.message2}}</p>\n</div>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\complaint-info\complaint-info.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]])
], ComplaintInfo);

//# sourceMappingURL=complaint-info.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Setting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lang_setting_lang_setting__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_profile_edit_profile__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__change_phone_change_phone__ = __webpack_require__(220);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var Setting = (function () {
    function Setting(navCtrl, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.titles = [];
        this.english = [];
        this.punjabi = [];
        this.english = { langset: 'Language setting', editprof: 'Edit Profile', chphno: 'Change Phone Number', logout: 'Logout', setting: 'Setting' };
        this.punjabi = { langset: 'ਭਾਸ਼ਾ ਸੈਟਿੰਗ', editprof: 'ਸੋਧ ਪ੍ਰੋਫ਼ਾਈਲ', chphno: 'ਫੋਨ ਨੰਬਰ ਬਦਲੋ', logout: 'ਬਾਹਰ ਆਉਣਾ', setting: 'ਸੈਟਿੰਗ' };
        this.storage.get('lang').then(function (lang) {
            _this.language = lang;
            if (_this.language == 'english') {
                _this.titles = _this.english;
            }
            else {
                _this.titles = _this.punjabi;
            }
        });
    }
    Setting.prototype.languagesett = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__lang_setting_lang_setting__["a" /* LangSetting */]);
    };
    Setting.prototype.profile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__edit_profile_edit_profile__["a" /* EditProfile */]);
    };
    Setting.prototype.logout = function () {
        this.storage.set('Uid', '');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* Login */]);
    };
    Setting.prototype.chn_num = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__change_phone_change_phone__["a" /* ChangePhone */]);
    };
    return Setting;
}());
Setting = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-setting',template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\setting\setting.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{titles.setting}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-item style="font-size:17px;" (click)="languagesett()">{{titles.langset}}<ion-icon md="ios-arrow-forward" style="float:right;font-size:20px;"></ion-icon></ion-item>\n  <ion-item style="font-size:17px;" (click)="profile()">{{titles.editprof}}<ion-icon md="ios-arrow-forward" style="float:right;font-size:20px;"></ion-icon></ion-item>\n  <!-- <ion-item style="font-size:17px;" (click)="chn_num()">{{titles.chphno}}<ion-icon md="ios-arrow-forward" style="float:right;font-size:20px;"></ion-icon></ion-item> -->\n  <ion-item style="font-size:17px;" (click)="logout()">{{titles.logout}}<ion-icon md="ios-arrow-forward" style="float:right;font-size:20px;"></ion-icon></ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\setting\setting.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], Setting);

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 116;

/***/ }),

/***/ 158:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 158;

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Complaint; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_transfer__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_path__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_media_capture__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_image_picker__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_toast__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var Complaint = (function () {
    function Complaint(navCtrl, toast, storage, imagePicker, mediaCapture, zone, camera, transfer, file, filePath, platform, navParams, http, loadingCtrl, actionSheetCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toast = toast;
        this.storage = storage;
        this.imagePicker = imagePicker;
        this.mediaCapture = mediaCapture;
        this.zone = zone;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.platform = platform;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.mulImages = [];
        this.postResponse = [];
        this.imageUrl = [];
        this.imageUrlpath = [];
        this.imageUrlTest = [];
        this.postRes = [];
        this.wardCategory = [];
        this.priority = [];
        this.issuetype = [];
        this.areatype = [];
        this.villagetype = [];
        this.buttonClicked = false;
        this.wardcat = [];
        this.titles = [];
        this.english = [];
        this.punjabi = [];
        this.apiurl = "http://isp.mediaoncloud.com/MLA/";
        this.status = 'playimg';
        this.vol = 'mute';
        this.data = [];
        this.data.name = '';
        this.data.area = '';
        this.data.ward = '';
        this.data.Vill = '';
        this.data.address = '';
        this.data.complainAgainst = '';
        this.data.complaint = '';
        this.data.mobile = '';
        this.data.email = '';
        this.videoshow = "custom-hide";
        this.english = { name: 'Name', area: 'Select Area', ward: 'Select Ward', village: 'Select Village', address: 'Address', complainagainst: 'Complaint against', complaint: 'Complaint', mobile: 'Mobile', email: 'Email', submit: 'Submit' };
        this.punjabi = { name: 'ਨਾਮ', area: 'ਖੇਤਰ ਚੁਣੋ', ward: 'ਚੁਣੋ ਵਾਰਡ', village: 'ਪਿੰਡ ਚੁਣੋ', address: 'ਪਤਾ', complainagainst: 'ਸ਼ਿਕਾਇਤ ਵਿਰੁੱਧ ', complaint: 'ਸ਼ਿਕਾਇਤ', mobile: 'ਮੋਬਾਈਲ', email: 'ਈ - ਮੇਲ', submit: 'ਜਮ੍ਹਾਂ ਕਰੋ' };
        this.storage.get('lang').then(function (lang) {
            _this.language = lang;
            if (_this.language == 'english') {
                _this.titles = _this.english;
            }
            else {
                _this.titles = _this.punjabi;
            }
            console.log(_this.titles);
        });
        this.storage.get('facebooktype').then(function (facebooktype) {
            _this.comfac_type = facebooktype;
            if (_this.comfac_type != 'facebook') {
                _this.storage.get('ph_no').then(function (ph_no) {
                    _this.phone_no = ph_no;
                    _this.http.get(_this.apiurl + "get_profile?user_id=" + _this.phone_no).map(function (res) { return res.json(); }).subscribe(function (data) {
                        _this.profile = data.name;
                        _this.p_no = data.phone;
                        _this.addvalue = data.address;
                        _this.Areaa = data.area;
                        _this.catward = data.ward;
                        _this.areavill = data.village;
                        _this.Email = data.email;
                    });
                });
            }
            if (_this.comfac_type == 'facebook') {
                _this.storage.get('Uid').then(function (Uid) {
                    _this.fid = Uid;
                    _this.http.get(_this.apiurl + "fblogin_profile?fbuserid=" + _this.fid).map(function (res) { return res.json(); }).subscribe(function (data) {
                        _this.profile = data.name;
                        _this.p_no = data.phone;
                        _this.addvalue = data.address;
                        _this.Areaa = data.area;
                        _this.catward = data.ward;
                        _this.areavill = data.village;
                        _this.Email = data.email;
                    });
                });
            }
        });
        this.http.get(this.apiurl + "wardview").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.wardCategory = data;
        });
        this.http.get(this.apiurl + "issueType").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.issuetype = data;
        });
        this.http.get(this.apiurl + "selectArea").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.areatype = data;
            console.log(_this.areatype);
        });
        this.http.get(this.apiurl + "selectVillage").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.villagetype = data;
        });
    }
    Complaint.prototype.areacategory = function (x) {
        if (x == 'Tarn Taran City') {
            this.value = 'ward';
            this.value1 = '';
        }
        else if (x == 'Tarn Taran Village') {
            this.value = '';
            this.value1 = 'village';
        }
    };
    Complaint.prototype.selstate = function (y) {
        if (y == 'Other') {
            this.enableIn = 'anyOther';
        }
    };
    Complaint.prototype.wardcategory = function (a) {
        var _this = this;
        this.http.get(this.apiurl + "wardview").map(function (res) { return res.json(); }).subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == a) {
                    console.log(data[i].priority);
                    _this.priorityvalue = data[i].priority;
                }
            }
        });
    };
    Complaint.prototype.villagecat = function (b) {
    };
    Complaint.prototype.backbtn = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    Complaint.prototype.selectmulImage = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            //  title: 'Select Image Source',
            buttons: [{
                    text: 'Upload Picture',
                    cssClass: 'upload',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                        //  this.uploadImage();
                    }
                },
                {
                    text: 'Use Camera',
                    cssClass: 'camera',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
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
    };
    // function for multiple images 
    Complaint.prototype.takePicture = function (sourceType) {
        var _this = this;
        var options = {
            quality: 100,
            allowEdit: true,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.FILE_URI
        };
        this.camera.getPicture(options).then(function (imageData) {
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.imagePicker.getPictures({ maximumImagesCount: 10,
                    quality: 75 }).then(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        var imagePath = results[i].substr(0, results[i].lastIndexOf('/') + 1);
                        var imageName = results[i].substr(results[i].lastIndexOf('/') + 1);
                        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
                        _this.copyFileToLocalDirMul(imagePath, imageName, newFileName, i);
                    }
                }, function (err) { alert(err); });
            }
            else {
                var imagePath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
                var imageName = imageData.substr(imageData.lastIndexOf('/') + 1);
                var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
                _this.copyFileToLocalDir(imagePath, imageName, newFileName);
            }
        }, function (err) {
        });
    };
    // Copy the multiple image to a local folder
    Complaint.prototype.copyFileToLocalDirMul = function (imagePath, imageName, newFileName, i) {
        var _this = this;
        this.file.copyFile(imagePath, imageName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
            var url = _this.apiurl + "saveImage";
            // File for Upload
            var targetPath = _this.pathForImage(_this.lastImage);
            // File name only
            var filename = _this.lastImage;
            var options = {
                fileKey: "profile_img[]",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: { 'fileName': filename }
            };
            _this.fileTransfer = _this.transfer.create();
            _this.loading = _this.loadingCtrl.create({
                content: 'Uploading...',
            });
            _this.loading.present();
            // Use the FileTransfer to upload the image
            _this.fileTransfer.upload(targetPath, url, options).then(function (data) {
                var newImg;
                var newImgPath;
                newImg = 'http://isp.mediaoncloud.com/MLAfiles/' + filename;
                newImgPath = filename;
                _this.imageUrl.push(newImg);
                _this.imageUrlpath.push(newImgPath);
                _this.loading.dismissAll();
                _this.presentToast('Image succesful uploaded.');
            }, function (err) {
                _this.loading.dismissAll();
                _this.presentToast('Error while uploading file.');
            });
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    // copy single image to localDir
    Complaint.prototype.copyFileToLocalDir = function (imagePath, imageName, newFileName) {
        var _this = this;
        this.file.copyFile(imagePath, imageName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
            var url = _this.apiurl + "saveImage";
            // File for Upload
            var targetPath = _this.pathForImage(_this.lastImage);
            // File name only
            var filename = _this.lastImage;
            var options = {
                fileKey: "profile_img[]",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: { 'fileName': filename }
            };
            _this.fileTransfer = _this.transfer.create();
            _this.loading = _this.loadingCtrl.create({
                content: 'Uploading...',
            });
            _this.loading.present();
            // Use the FileTransfer to upload the image
            _this.fileTransfer.upload(targetPath, url, options).then(function (data) {
                var newImg;
                var newImgPath;
                newImg = 'http://isp.mediaoncloud.com/MLAfiles/' + filename;
                newImgPath = filename;
                _this.imageUrl.push(newImg);
                _this.imageUrlpath.push(newImgPath);
                _this.loading.dismissAll();
                _this.presentToast('Image succesful uploaded.');
            }, function (err) {
                _this.loading.dismissAll();
                _this.presentToast('Error while uploading file.');
            });
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    Complaint.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    Complaint.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    Complaint.prototype.SelectVideo = function () {
        var _this = this;
        var video = this.myVideo.nativeElement;
        return new Promise(function (resolve) {
            _this.zone.run(function () {
                var options = {
                    quality: 95,
                    destinationType: _this.camera.DestinationType.FILE_URI,
                    sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY,
                    mediaType: _this.camera.MediaType.VIDEO
                };
                _this.camera.getPicture(options).then(function (data) {
                    video.src = data;
                    var imagePath = video.src.substr(0, video.src.lastIndexOf('/') + 1);
                    var imageName = video.src.substr(video.src.lastIndexOf('/') + 1);
                    _this.upload(imagePath, imageName, video);
                });
            });
        });
    };
    Complaint.prototype.upload = function (correctPath, currentName, video) {
        var _this = this;
        var d = new Date(), n = d.getTime(), x = n + ".mp4";
        this.file.copyFile(correctPath, currentName, cordova.file.dataDirectory, x).then(function (success) {
            _this.lastImage = x;
            var url = _this.apiurl + "saveVideo";
            // File for Upload
            var targetPath = _this.pathForImage(_this.lastImage);
            // File name only
            // this.filename = this.lastImage;      
            var options = {
                fileKey: "video",
                fileName: x,
                chunkedMode: false,
                mimeType: "video/mp4"
            };
            _this.fileTransfer = _this.transfer.create();
            _this.loading = _this.loadingCtrl.create({
                content: 'Uploading...',
            });
            _this.loading.present();
            // Use the FileTransfer to upload the image
            _this.fileTransfer.upload(targetPath, url, options).then(function (data) {
                _this.videoUrl = 'http://isp.mediaoncloud.com/MLAfiles/' + x;
                _this.videoUrlPath = x;
                _this.loading.dismissAll();
                _this.presentToast('video succesful uploaded.');
                _this.videoshow = "custom-show";
            }, function (err) {
                _this.loading.dismissAll();
                _this.presentToast('Error while uploading file.');
            });
        }, function (error) {
            // alert(JSON.stringify(error));
            _this.presentToast('Error while storing file.');
        });
    };
    Complaint.prototype.submit = function (usrname, area, ward, Vill, address, complainAgainst, complaint, usrphone, email, priorityvalue) {
        var _this = this;
        this.storage.get('Uid').then(function (Uid) {
            _this.userId = Uid;
            _this.storage.get('unique_no').then(function (unique_no) {
                _this.uniqueid = unique_no;
                _this.images = _this.imageUrlpath.join();
                _this.videos = _this.videoUrlPath;
                var bodyString = 'id= &ref_num= &uuid=' + _this.uniqueid + '&ip_addr= &name=' + usrname + '&userid=' + _this.userId + '&area=' + area + '&address=' + address + '&ward=' + ward + '&village=' + Vill + '&complaint_against=' + complainAgainst + '&complaint=' + complaint + '&mobile=' + usrphone + '&email=' + email + '&profile_img=' + _this.images + '&video=' + _this.videos + '&date= &priority=' + priorityvalue + '&status=';
                var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
                headers.append("Accept", 'application/x-www-form-urlencoded');
                headers.append('Content-Type', 'application/x-www-form-urlencoded');
                // Create a request option
                var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ headers: headers });
                if (usrname != '' && usrphone != '' && complaint != '') {
                    _this.http.post(_this.apiurl + 'complaint', bodyString, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                        _this.postRes = data;
                        _this.postResponse = data.refference;
                        _this.storage.set('ref_no', _this.postResponse);
                        _this.storage.get('ref_no').then(function (ref_no) {
                            _this.usrid = ref_no;
                            if (_this.postRes.status == 'Success') {
                                //alert("Your complaint has been sent successfully");
                                _this.toast.show("Your complaint has been sent successfully", 'long', 'center').subscribe(function (toast) {
                                    console.log(toast);
                                });
                                //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                            }
                            else {
                                //alert("Your Complaint not sent. Please try again");
                                _this.toast.show("Your Complaint not sent. Please try again", 'long', 'center').subscribe(function (toast) {
                                    console.log(toast);
                                });
                            }
                        });
                    });
                }
                else {
                    //alert("Some fields are required to be filled");
                    _this.toast.show("Some fields are required to be filled", 'long', 'center').subscribe(function (toast) {
                        console.log(toast);
                    });
                }
            });
        });
    };
    Complaint.prototype.volume = function () {
        this.video = document.getElementById('video1');
        if (!this.video.muted) {
            this.video.muted = true;
            this.vol = 'mute';
        }
        else {
            this.video.muted = false;
            this.vol = 'unmute';
        }
    };
    Complaint.prototype.play = function () {
        this.video = document.getElementById('video1');
        if (this.video.paused === false) {
            this.status = 'playimg';
            this.video.pause();
        }
        else {
            this.status = 'pauseimg';
            this.video.play();
        }
    };
    Complaint.prototype.rewind = function () {
        this.video = document.getElementById('video1');
        this.video.currentTime -= 10;
    };
    Complaint.prototype.forward = function () {
        this.video = document.getElementById('video1');
        this.video.currentTime += 10;
    };
    return Complaint;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('myvideo'),
    __metadata("design:type", Object)
], Complaint.prototype, "myVideo", void 0);
Complaint = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-complaint',template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\complaint\complaint.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title> {{titles.complaint}} </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="background-image: url(img/back.png); background-size: cover;">\n\n  <ion-row class="first-row">\n    <ion-input type="text" placeholder="{{titles.name}}" [(ngModel)]="profile" name="profile"></ion-input>\n  </ion-row>\n  <ion-row class="second-row">\n    <select id="areacat" type="text" name="Areaa" onmousedown="this.value=\'\';" [(ngModel)]="Areaa"\n      (change)="areacategory(Areaa)">  \n        <option value="" disabled selected>{{titles.area}}</option>\n        <option *ngFor="let val of areatype" [ngValue]="val" style="color:#000;"> {{val}}</option>\n      </select>\n  </ion-row>\n\n  <ion-row *ngIf="value == \'ward\'" class="second-row">\n    <select type="text" name="catward" onmousedown="this.value=\'\';" [(ngModel)]="catward" (change)="wardcategory(catward)">  \n      <option value="" disabled selected>{{titles.ward}}</option>\n      <option *ngFor="let val of wardCategory; let i= index" [ngValue]="wardCategory[i].ward_num" style="color:#000;" > {{wardCategory[i].ward_num}}</option>\n    </select>\n  </ion-row>\n\n  <ion-row [hidden]=\'!value1\' class="second-row">\n    <select type="text" name="areavill" onmousedown="this.value=\'\';" [(ngModel)]="areavill" (change)="villagecat(areavill)">  \n      <option value="" disabled selected>{{titles.village}}</option>\n      <option *ngFor="let val of villagetype; let i= index" [ngValue]="villagetype[i].village" style="color:#000;" > {{villagetype[i].village}}</option>\n    </select>\n  </ion-row>\n  <ion-row class="third-row">\n    <textarea placeholder="{{titles.address}}" [(ngModel)]="addvalue" rows="5" cols="50"></textarea>\n    <!-- <ion-textarea  placeholder="Address" name="data.address" rows="5" cols="50"></ion-textarea> -->\n  </ion-row>\n\n  <ion-row class="second-row">\n    <select *ngIf="!enableIn" type="text" name="data.complainAgainst" onmousedown="this.value=\'\';" [(ngModel)]="data.complainAgainst"\n      (change)="selstate(data.complainAgainst)">  \n        <option value="" disabled selected> {{titles.complainagainst}}</option>\n        <option *ngFor="let val of issuetype; let i= index" [ngValue]="issuetype[i].issue_type" style="color:#000;">{{issuetype[i].issue_type}}</option>\n    </select>\n    <ion-input *ngIf="enableIn ==\'anyOther\'" class="first-row" type="text" placeholder="" [(ngModel)]="data.complainAgainst" name="data.complainAgainst"></ion-input>\n  </ion-row>\n\n  <ion-row class="third-row">\n    <textarea placeholder="{{titles.complaint}}" [(ngModel)]="data.complaint" rows="5" cols="50"></textarea>\n    <!-- <ion-textarea  placeholder="Complaint" name="data.complaint" rows="5" cols="50"></ion-textarea> -->\n  </ion-row>\n  <ion-row class="first-row">\n    <ion-input type="tel" placeholder="{{titles.mobile}}" maxlength="10" [(ngModel)]="p_no" name="p_no"></ion-input>\n  </ion-row>\n  <ion-row class="first-row">\n    <ion-input type="text" placeholder="{{titles.email}}" [(ngModel)]="Email" name="Email"></ion-input>\n  </ion-row>\n  <ion-row class="row">\n    <button ion-button small (click)="selectmulImage()"><img src="img/logo1.png" />Photo<br>Upload</button>\n    <button ion-button small (click)="SelectVideo()"><img src="img/logo2.png" />Video<br>Upload</button>\n  </ion-row>\n  <ion-row style="padding-left:30px;">\n    <img *ngFor="let image of imageUrl" [src]="image" style="width:30%;height:100px;float:left; margin:1% 2% 1% 0%;" />\n  </ion-row>\n\n  <ion-row class="video-main" >\n  <video #myvideo [class]="videoshow" [src]="videoUrl" poster="img/video-back.jpg" width="100%" height="150" id="video1" codecs="avc1.42E01E, mp4a.40.2"></video>\n  </ion-row>\n  <div [class]="videoshow">\n  <ion-row class="plyer-row"> \n  <img  src="img/backward.png" (click)="rewind()"/>\n  <img  *ngIf="status==\'playimg\'"  src="img/play.png"  (click)="play()" />\n  <img  *ngIf="status==\'pauseimg\'" src="img/stop.png" (click)="play()" />\n  <img  src="img/forward.png"  (click)="forward()"/>\n  <img  class="volume-img"   *ngIf="vol==\'unmute\'" src="img/volume.png"  (click)="volume()" />\n  <img  class="volume-img"   *ngIf="vol==\'mute\'" src="img/mute.png" (click)="volume()" />\n  </ion-row>\n  </div>\n\n  <p style="display:none;">{{priorityvalue}}</p>\n  <button ion-button round outline block class="button-submit" (click)="submit(profile,Areaa,catward,areavill,addvalue,data.complainAgainst,data.complaint,p_no,Email,priorityvalue)">{{titles.submit}}</button>\n</ion-content>'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\complaint\complaint.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_media_capture__["a" /* MediaCapture */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_transfer__["a" /* Transfer */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_path__["a" /* FilePath */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
], Complaint);

//# sourceMappingURL=complaint.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Suggestion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Suggestion = (function () {
    function Suggestion(navCtrl, toast, navParams, http, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toast = toast;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.suggestionRes = [];
        this.wardCategory = [];
        this.areatype = [];
        this.villagetype = [];
        this.titles = [];
        this.english = [];
        this.punjabi = [];
        this.data = [];
        this.data.name = '';
        this.data.suggestion = '';
        this.data.mobile = '';
        this.apiurl = "http://isp.mediaoncloud.com/MLA/";
        this.english = { name: 'Name', address: 'Address', area: 'Select Area', ward: 'Select ward', village: 'Select village', sugg: 'Suggestion', mob: 'Mobile', title: 'Dr. Dharambir Agnihotri', Designation: 'MLA of Tarn Taran', sub: 'Submit' };
        this.punjabi = { name: 'ਨਾਮ', address: 'ਪਤਾ', area: 'ਖੇਤਰ ਚੁਣੋ', ward: 'ਚੁਣੋ ਵਾਰਡ', village: 'ਪਿੰਡ ਚੁਣੋ', sugg: 'ਸਲਾਹ', mob: 'ਮੋਬਾਈਲ', title: 'ਡਾਕਟਰ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ ', Designation: 'ਐਮ ਐਲ ਏ (ਤਰਨ ਤਾਰਨ)', sub: 'ਜਮ੍ਹਾਂ ਕਰੋ' };
        this.storage.get('lang').then(function (lang) {
            _this.language = lang;
            if (_this.language == 'english') {
                _this.titles = _this.english;
            }
            else {
                _this.titles = _this.punjabi;
            }
            console.log(_this.titles);
        });
        this.storage.get('facebooktype').then(function (facebooktype) {
            _this.suggftype = facebooktype;
            if (_this.suggftype != 'facebook') {
                _this.storage.get('ph_no').then(function (ph_no) {
                    _this.phone_no = ph_no;
                    _this.http.get(_this.apiurl + "get_profile?user_id=" + _this.phone_no).map(function (res) { return res.json(); }).subscribe(function (data) {
                        _this.profile = data.name;
                        _this.p_no = data.phone;
                        _this.addresss = data.address;
                        _this.areasel = data.area;
                        _this.wardsel = data.ward;
                        _this.villsel = data.village;
                    });
                });
            }
            if (_this.suggftype == 'facebook') {
                _this.storage.get('Uid').then(function (Uid) {
                    _this.s_fid = Uid;
                    _this.http.get(_this.apiurl + "fblogin_profile?fbuserid=" + _this.s_fid).map(function (res) { return res.json(); }).subscribe(function (data) {
                        _this.profile = data.name;
                        _this.p_no = data.phone;
                    });
                });
            }
        });
        this.http.get(this.apiurl + "wardview").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.wardCategory = data;
        });
        this.http.get(this.apiurl + "selectArea").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.areatype = data;
            console.log(_this.areatype);
        });
        this.http.get(this.apiurl + "selectVillage").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.villagetype = data;
        });
    }
    Suggestion.prototype.areacategory = function (x) {
        if (x == 'Tarn Taran City') {
            this.value = 'ward';
            // this.value1 = '';
        }
        else if (x == 'Tarn Taran Village') {
            // this.value = '';
            //  this.value1 = 'village'; 
            this.value = 'village';
        }
    };
    Suggestion.prototype.wardcategory = function (a) {
        var _this = this;
        this.http.get(this.apiurl + "wardview").map(function (res) { return res.json(); }).subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == a) {
                    console.log(data[i].priority);
                    _this.priorityvalue = data[i].priority;
                }
            }
        });
    };
    Suggestion.prototype.villagecat = function (b) {
    };
    Suggestion.prototype.backbtn = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    Suggestion.prototype.submit = function (name, addres, area, ward, village, suggestion, mobile) {
        var _this = this;
        this.storage.get('Uid').then(function (Uid) {
            _this.userId = Uid;
            _this.storage.get('unique_no').then(function (unique_no) {
                _this.uniqueid = unique_no;
                var bodyString = 'id= &name=' + name + '&uuid=' + _this.uniqueid + '&userid=' + _this.userId + '&sugession=' + suggestion + '&mobile=' + mobile + '&area=' + area + '&address=' + addres + '&ward=' + ward + '&village=' + village;
                // Set content type to JSON
                var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
                headers.append("Accept", 'application/x-www-form-urlencoded');
                headers.append('Content-Type', 'application/x-www-form-urlencoded');
                // Create a request option
                var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ headers: headers });
                _this.http.post(_this.apiurl + 'sugession', bodyString, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                    _this.suggestionRes = data;
                    _this.uid = data.userid;
                    if (_this.suggestionRes.status == 'Success') {
                        //alert("Your Suggestion submitted successfully");
                        _this.toast.show("Your suggestion submitted successfully", 'long', 'center').subscribe(function (toast) {
                            console.log(toast);
                        });
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                    }
                    else {
                        //alert("Your Suggestion is not submitted. Please try again");
                        _this.toast.show("Your suggetsion is not submitted. Please try again", 'long', 'center').subscribe(function (toast) {
                            console.log(toast);
                        });
                    }
                });
            });
        });
    };
    return Suggestion;
}());
Suggestion = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-suggestion',template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\suggestion\suggestion.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{titles.sugg}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="background-image: url(img/back.png); background-size: cover;">\n  \n  <ion-grid class="first-one">  \n    <ion-row >\n\n<ion-col col-7 class="col-one">\n<p>{{titles.title}}</p>\n <p class="p2">{{titles.Designation}}</p>\n  </ion-col>\n\n<ion-col col-5 class="col-second">\n<img src="img/photo.jpg"/>\n</ion-col>\n\n </ion-row>\n </ion-grid>\n <ion-row class="first-row">\n    <ion-input type="text" placeholder="{{titles.name}}" [(ngModel)]="profile" name="profile"></ion-input>\n  </ion-row>\n  <ion-row class="first-row">\n    <ion-input type="text" placeholder="{{titles.address}}" [(ngModel)]="addresss" name="addresss"></ion-input>\n</ion-row>\n   <ion-row class="second-row">\n      <select  id ="areacat" class="drop-down" placeholder="Select Area"  type="text" name="areasel" onmousedown="this.value=\'\';" [(ngModel)]="areasel" (change)="areacategory(areasel)" >  \n          <option value="" disabled selected>{{titles.area}}</option>\n        <option *ngFor="let val of areatype" [ngValue]="val" style="color:#000;"> {{val}}</option>\n      </select>\n  </ion-row>\n  <ion-row *ngIf="value == \'ward\'  || (areasel==\'Tarn Taran City\')" class="second-row"  >\n      <select  class="drop-down" placeholder="Select Ward"  type="text" name="wardsel" onmousedown="this.value=\'\';" [(ngModel)]="wardsel" (change)="wardcategory(wardsel)" >  \n        <option value="" disabled selected>{{titles.ward}}</option>\n        <option *ngFor="let val of wardCategory; let i= index" [ngValue]="wardCategory[i].ward_num" style="color:#000;" > {{wardCategory[i].ward_num}}</option>\n      </select>  \n    </ion-row>\n    \n    <ion-row *ngIf="value==\'village\' || (areasel==\'Tarn Taran Village\')" class="second-row" >\n        <select class="drop-down" placeholder="Select Village"  type="text" name="villsel" onmousedown="this.value=\'\';" [(ngModel)]="villsel" (change)="villagecat(villsel)" >  \n            <option value="" disabled selected>{{titles.village}}</option>\n          <option *ngFor="let val of villagetype; let i= index" [ngValue]="villagetype[i].village" style="color:#000;" > {{villagetype[i].village}}</option>\n        </select> \n    </ion-row> \n  <ion-row class="third-row">\n    <textarea [(ngModel)]="data.suggestion" name="data.suggestion" placeholder="{{titles.sugg}}" rows="6" cols="50"></textarea>\n  </ion-row>\n  <ion-row class="first-row">\n    <ion-input type="tel" maxlength="10" [(ngModel)]="p_no" name="p_no" placeholder="{{titles.mob}}"></ion-input>\n  </ion-row>\n  <button ion-button round outline block type="submit" class="button-submit" (click)="submit(profile,addresss,areasel,wardsel,villsel,data.suggestion,p_no)">{{titles.sub}}</button>\n</ion-content>\n'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\suggestion\suggestion.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__["a" /* Toast */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__["a" /* Toast */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]) === "function" && _e || Object])
], Suggestion);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=suggestion.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Gallery; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Gallery = (function () {
    function Gallery(navCtrl, navParams, storage, iab, http, alertCtrl, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.iab = iab;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.slideData = [];
        this.slideData1 = [];
        this.fb_res = [];
        this.fb_res1 = [];
        this.items = [];
        this.allImages = [];
        this.item = [];
        this.titles = [];
        this.english = [];
        this.punjabi = [];
        //this.slideData = [{ image: 'img/slide1.jpg'},{ image: 'img/slide2.jpg'},{ image: 'img/slide3.jpg'}]
        this.apiurl = "http://isp.mediaoncloud.com/MLA/";
        this.fb_api();
        this.fb_pagination();
        this.english = { gallery: 'Gallery' };
        this.punjabi = { gallery: 'ਤਸਵੀਰਾਂ' };
        this.storage.get('lang').then(function (lang) {
            _this.language = lang;
            if (_this.language == 'english') {
                _this.titles = _this.english;
            }
            else {
                _this.titles = _this.punjabi;
            }
            console.log(_this.titles);
        });
        this.http.get(this.apiurl + "fbApiShowAll").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.fb_res = 60 / 10;
            console.log(_this.fb_res);
        });
    }
    Gallery.prototype.fb_api = function () {
        var _this = this;
        this.http.get(this.apiurl + "fbApi").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.fb_res = data;
            console.log(_this.fb_res);
        });
    };
    Gallery.prototype.fb_pagination = function () {
        var _this = this;
        var offsetlimit = 1;
        this.imagesoffset = offsetlimit;
        var loadingPopup = this.loadingCtrl.create({
            content: '',
        });
        loadingPopup.present();
        this.http.get(this.apiurl + "fbApi?page=" + offsetlimit).map(function (res) { return res.json(); }).subscribe(function (data) {
            setTimeout(function () {
                _this.items = data;
                loadingPopup.dismiss();
            }, 1000);
            if (data.length == 0) {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Images!',
                    subTitle: 'No More Images available',
                    buttons: ['Ok']
                });
                alert_1.present();
            }
            else {
                for (var i = 0; i < data.length; i++) {
                    _this.allImages.push(data[i]);
                }
            }
        });
    };
    Gallery.prototype.doInfinite = function (infiniteScroll, tset) {
        var _this = this;
        this.moviesOffset = tset;
        this.newmoviesoffset = Number(this.moviesOffset) + 1;
        this.imagesoffset = this.newmoviesoffset;
        if (this.imagesoffset != 'blank') {
            var loadingPopup_1 = this.loadingCtrl.create({
                content: '',
            });
            loadingPopup_1.present();
            this.http.get(this.apiurl + "fbApi?page=" + this.newmoviesoffset).map(function (res) { return res.json(); }).subscribe(function (data) {
                if (data.status != 'Failed') {
                    _this.item = data;
                    if (_this.item.length != 0 && _this.moviesOffset < _this.fb_res && data.status != 'Failed') {
                        setTimeout(function () {
                            _this.load = '';
                            for (var i = 0; i < _this.item.length; i++) {
                                _this.allImages.push(_this.item[i]);
                                console.log(_this.allImages);
                            }
                            loadingPopup_1.dismiss();
                            infiniteScroll.complete();
                        }, 1000);
                    }
                    else {
                        //alert("No more images available...");
                        setTimeout(function () {
                            _this.load = 'No more images available...';
                            infiniteScroll.complete();
                        }, 1000);
                    }
                }
                else {
                    _this.imagesoffset = 'blank';
                    setTimeout(function () {
                        _this.load = 'No more images available...';
                        loadingPopup_1.dismiss();
                        infiniteScroll.complete();
                    }, 1000);
                }
            });
            loadingPopup_1.dismiss();
        }
    };
    Gallery.prototype.openImage = function (image) {
        var browser = this.iab.create(image);
    };
    return Gallery;
}());
Gallery = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-gallery',template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\gallery\gallery.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{titles.gallery}}</ion-title>\n  </ion-navbar> \n</ion-header>\n\n<ion-content padding style="background-image: url(img/back.png); background-size: cover;"> \n  <ion-input type="hidden" [(ngModel)]="imagesoffset" id="moviesOffset"></ion-input>\n    <img *ngFor="let item of allImages" [src]="item"  (click)="openImage(item)" class="gal-img" />\n    <p>{{load}}</p>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event,imagesoffset)">\n      <ion-infinite-scroll-content ></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\gallery\gallery.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
], Gallery);

//# sourceMappingURL=gallery.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constituency; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Constituency = (function () {
    function Constituency(navCtrl, navParams, storage) {
        // this.msg= "ਤਰਨ ਤਾਰਨ ਚੋਣ ਖੇਤਰ , ਪੰਜਾਬ ਵਿਧਾਨ ਸਭਾ ਦੀਆਂ 117 ਸੀਟਾਂ ਵਿੱਚੋ ਇੱਕ ਹੈ ਅਤੇ ਇਸਦੇ ਹਲਕੇ ਦਾ ਨੰਬਰ 21 ਹੈ . ਕਾਂਗਰਸ ਦੇ ਰਹਿਣ ਵਾਲੇ ਡਾ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ ਨੇ ਪਿਛਲੀਆਂ ਵਿਧਾਨ  ਸਭਾ ਚੋਣਾਂ ਵਿੱਚ ਜਿੱਤ ਪ੍ਰਾਪਤ  ਕੀਤੀ ਹੈ ਅਤੇ ਮੌਜੂਦਾ ਤਰਨ ਤਾਰਨ ਦੇ ਵਿਧਾਇਕ ਹਨ . ਓਨ੍ਨਾ ਨੇ 2017 ਵਿੱਚ ਹੋਈਆਂ ਪਿਛਲੀਆਂ ਵਿਧਾਨ ਸਭਾ ਚੋਣਾਂ ਵਿੱਚ ਅਕਾਲੀ ਦਲ ਦੇ ਨਜ਼ਦੀਕੀ ਵਿਰੋਧੀ ਹਰਮੀਤ ਵਿਧਾਨ  ਸਿੰਘ  ਸੰਧੂ ਨੂੰ 14629 ਵੋਟਾਂ ਦੇ ਨਾਲ ਹਰਾਇਆ.";
        // this.msg1="2017 ਵਿਧਾਨ ਸਭਾ ਚੋਣਾਂ ਦੇ ਵੋਟਰ ਸੂਚੀ ਅਨੁਸਾਰ   ਤਾਰਨ ਹਲਕੇ  ਦੇ ਕੁਲ 181901 ਵੋਟਰ ਹਨ.  ਇਨ੍ਹਾਂ  ਚੋਂਣਾ ਵਿੱਚ  ਚੋਣ ਕਮਿਸ਼ਨ ਨੇ 203 ਪੋਲਿੰਗ ਸਟੇਸ਼ਨ ਸਥਾਪਿਤ ਕੀਤੇ, ਜੋ ਇਸ ਵਿਧਾਨ  ਸਭਾ ਹਲਕੇ ਦੇ 111 ਵੱਖ- ਵੱਖ ਸਥਾਨਾਂ ਤੇ ਸਿਥਤ ਹਨ. 2017 ਦੀਆਂ ਚੋਣਾਂ ਦੇ ਦੌਰਾਨ, ਇਸ ਖੇਤਰ ਿਵੱਚ 132333 ਵੋਟਾ ਪਈਆਂ ਸਨ ਅਤੇ ਵੋਟਿੰਗ ਪ੍ਤੀਸ਼ਤ 72.75%  ਵਿਚ  ਦਰਜ ਕੀਤੀ ਗਈ ਸੀ, ਜੋ ਰਾਜ ਦੀ ਔਸਤ 77.4 ਤੋਂ ਘੱਟ ਸੀ. ";
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.titles = [];
        this.english = [];
        this.punjabi = [];
        this.english = { pagetitle: 'Constituency', message: 'Tarn Taran constituency is one of the 117 seats of Punjab Vidhan Sabha and its constituency number is 21. Dr. Dharambir Agnihotri, who belongs to Congress, has won the last assembly elections and is the current MLA of Tarn Taran. He won the last assembly elections held in 2017 by defeating its nearest opponent Harmeet Singh Sandhu of SAD with a margin of 14629 votes.', message2: 'As per the voter list for 2017 assembly elections, the total number of voters in Tarn Taran constituency is 181901. During these elctions, the election commission established 203 polling stations, situated at 111 different locations across this assembly segment. During the 2017 elections, the total number of votes cast in this constituency was 132333 and the voting percentage was recorded at 72.75%, which was less than the state average of 77.4%.' };
        this.punjabi = { pagetitle: 'ਚੋਣ ਖੇਤਰ', message: 'ਤਰਨ ਤਾਰਨ ਚੋਣ ਖੇਤਰ , ਪੰਜਾਬ ਵਿਧਾਨ ਸਭਾ ਦੀਆਂ 117 ਸੀਟਾਂ ਵਿੱਚੋ ਇੱਕ ਹੈ ਅਤੇ ਇਸਦੇ ਹਲਕੇ ਦਾ ਨੰਬਰ 21 ਹੈ . ਕਾਂਗਰਸ ਦੇ ਰਹਿਣ ਵਾਲੇ ਡਾ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ ਨੇ ਪਿਛਲੀਆਂ ਵਿਧਾਨ  ਸਭਾ ਚੋਣਾਂ ਵਿੱਚ ਜਿੱਤ ਪ੍ਰਾਪਤ  ਕੀਤੀ ਹੈ ਅਤੇ ਮੌਜੂਦਾ ਤਰਨ ਤਾਰਨ ਦੇ ਵਿਧਾਇਕ ਹਨ . ਓਨ੍ਨਾ ਨੇ 2017 ਵਿੱਚ ਹੋਈਆਂ ਪਿਛਲੀਆਂ ਵਿਧਾਨ ਸਭਾ ਚੋਣਾਂ ਵਿੱਚ ਅਕਾਲੀ ਦਲ ਦੇ ਨਜ਼ਦੀਕੀ ਵਿਰੋਧੀ ਹਰਮੀਤ ਵਿਧਾਨ  ਸਿੰਘ  ਸੰਧੂ ਨੂੰ 14629 ਵੋਟਾਂ ਦੇ ਨਾਲ ਹਰਾਇਆ.', message2: '2017 ਵਿਧਾਨ ਸਭਾ ਚੋਣਾਂ ਦੇ ਵੋਟਰ ਸੂਚੀ ਅਨੁਸਾਰ   ਤਾਰਨ ਹਲਕੇ  ਦੇ ਕੁਲ 181901 ਵੋਟਰ ਹਨ.  ਇਨ੍ਹਾਂ  ਚੋਂਣਾ ਵਿੱਚ  ਚੋਣ ਕਮਿਸ਼ਨ ਨੇ 203 ਪੋਲਿੰਗ ਸਟੇਸ਼ਨ ਸਥਾਪਿਤ ਕੀਤੇ, ਜੋ ਇਸ ਵਿਧਾਨ  ਸਭਾ ਹਲਕੇ ਦੇ 111 ਵੱਖ- ਵੱਖ ਸਥਾਨਾਂ ਤੇ ਸਿਥਤ ਹਨ. 2017 ਦੀਆਂ ਚੋਣਾਂ ਦੇ ਦੌਰਾਨ, ਇਸ ਖੇਤਰ ਿਵੱਚ 132333 ਵੋਟਾ ਪਈਆਂ ਸਨ ਅਤੇ ਵੋਟਿੰਗ ਪ੍ਤੀਸ਼ਤ 72.75%  ਵਿਚ  ਦਰਜ ਕੀਤੀ ਗਈ ਸੀ, ਜੋ ਰਾਜ ਦੀ ਔਸਤ 77.4 ਤੋਂ ਘੱਟ ਸੀ. ' };
        this.storage.get('lang').then(function (lang) {
            _this.language = lang;
            if (_this.language == 'english') {
                _this.titles = _this.english;
                _this.styleCustom = "parah-1";
            }
            else {
                _this.titles = _this.punjabi;
                _this.styleCustom = "parah-1 custom-FontPunjabi";
            }
            console.log(_this.titles);
        });
    }
    return Constituency;
}());
Constituency = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-constituency',template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\constituency\constituency.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{titles.pagetitle}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding style="background-color:#f9e7cf; background-size: cover;">\n  <p [class]="styleCustom" style="text-align:justify;font-size:16px;">{{titles.message}}</p>\n  <p [class]="styleCustom" style="text-align:justify;font-size:16px;">{{titles.message2}}</p>\n</ion-content>\n'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\constituency\constituency.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], Constituency);

//# sourceMappingURL=constituency.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutUs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AboutUs = (function () {
    function AboutUs(navCtrl, navParams, storage) {
        // this.message = "  ਡਾ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ ਜੀ  13 ਮਾਰਚ 1946 ਵਿਚ ਪਿੰਡ ,ਸ਼ੇਰੋਂ ਤਿਹਸੀਲ ਅਤੇ ਜ਼ਿਲਾ ਤਾਰਨ,ਪੰਜਾਬ ਵਿਚ ਪੈਦਾ ਹੋਏ ਸੀ . ਓਹਨਾ ਦੇ ਪਿਤਾ ਦਾ ਨਾਮ  ਸ਼੍ਰੀਮਾਨ  ਮਾਧੋ ਰਾਮ ਹੈ  ਅਤੇ ਮਾਤਾ ਦਾ ਨਾਮ ਸ਼੍ਰੀਮਤੀ ਰਾਵਾਲੀ ਦੇਵੀ ਹੈ. ਓਹਨਾ ਨੇ ਆਪਣੀ ਗ੍ਰੈਜੂਏਸ਼ਨ 1974 ਵਿਚ  ਟਿੱਬਿਆਂ ਕਾਲਜ, ਨਵੀਂ ਦਿੱਲੀ  ਤੋਂ ਕੀਤੀ .  ਡਾ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ ਨੂੰ ਬਹੁਤ ਹੀ ਈਮਾਨਦਾਰ ਅਤੇ ਧਰਤੀ ਹੇਠਲੇ ਆਗੂ ਵਜੋਂ ਜਾਣਿਆ ਜਾਂਦਾ ਹੈ.";
        // this.message1=" ਉਹ ਮਾਨਵਤਾ ਦੀ ਸੇਵਾ ਡਾਕਟਰ ਦੇ ਅਮੀਰ ਪੇਸ਼ੇ ਨਾਲ ਕਰਦੇ ਹਨ . ਉਹ ਪੰਜਾਬ ਦੇ ਸਾਬਕਾ ਮੁੱਖ ਮੰਤਰੀ ਕੈਪਟਨ ਅਮਰਿੰਦਰ  ਸਿੰਘ ਦੇ ਬਹੁਤ ਨਜ਼ਦੀਕੀ ਸਮਝੇ ਜਾਂਦੇ ਹਨ.";
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.titles = [];
        this.english = [];
        this.punjabi = [];
        this.english = { title: 'Dr. Dharambir Agnihotri', Designation: 'MLA of Tarn Taran', pagetitle: 'About MLA', message: 'He was born on 1946, March 13 at village Sheron, Tehsil & Distt Taran Taran, Punjab. His father’s name is Sh. Madho Ram and mother’s name is Shrimati Ravail Devi. He completed his graduation from Tibbia college, New Delhi. In 1974, He married to Kiran Agnihotri. Dr. dharambir agnihotri is known as a very honest and down to earth leader. He is popular among every one for his simple and soft spoken nature . He is serving the humanity with the noble profession of doctor. He is considered very close to  chief minister of Punjab Capt. Amarinder singh.' };
        this.punjabi = { title: 'ਡਾਕਟਰ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ', Designation: 'ਐੱਮ ਐੱਲ ਐ (ਤਰਨ ਤਾਰਨ)', pagetitle: 'ਵਿਧਾਇਕ ਬਾਰੇ', message: 'ਡਾ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ ਜੀ  13 ਮਾਰਚ 1946 ਵਿਚ ਪਿੰਡ ਸ਼ੇਰੋਂ, ਤਹਿਸੀਲ ਅਤੇ ਜ਼ਿਲਾ ਤਰਨ ਤਾਰਨ, ਪੰਜਾਬ ਵਿਚ ਪੈਦਾ ਹੋਏ ਸੀ . ਓਹਨਾ ਦੇ ਪਿਤਾ ਦਾ ਨਾਮ  ਸ਼੍ਰੀਮਾਨ  ਮਾਧੋ ਰਾਮ ਹੈ  ਅਤੇ ਮਾਤਾ ਦਾ ਨਾਮ ਸ਼੍ਰੀਮਤੀ ਰਾਵਾਲੀ ਦੇਵੀ ਹੈ. ਓਹਨਾ ਨੇ ਆਪਣੀ ਗ੍ਰੈਜਏਸ਼ਨ 1974 ਵਿਚ  ਟਿੱਬਿਆਂ ਕਾਲਜ, ਨਵੀਂ ਦਿੱਲੀ  ਤੋਂ ਕੀਤੀ .  ਡਾ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ ਨੂੰ ਬਹੁਤ ਹੀ ਈਮਾਨਦਾਰ ਅਤੇ ਮਿੱਟੀ ਨਾਲ ਜੁੜੇ ਹੋਏ ਆਗੂ ਵਜੋਂ ਜਾਣਿਆ ਜਾਂਦਾ ਹੈ. ਉਹ ਮਾਨਵਤਾ ਦੀ ਸੇਵਾ ਡਾਕਟਰ ਦੇ ਅਮੀਰ ਪੇਸ਼ੇ ਨਾਲ ਕਰਦੇ ਹਨ . ਉਹ ਪੰਜਾਬ ਦੇ ਮੁੱਖ ਮੰਤਰੀ ਕੈਪਟਨ ਅਮਰਿੰਦਰ  ਸਿੰਘ ਦੇ ਬਹੁਤ ਨਜ਼ਦੀਕੀ ਸਮਝੇ ਜਾਂਦੇ ਹਨ.' };
        this.storage.get('lang').then(function (lang) {
            _this.language = lang;
            if (_this.language == 'english') {
                _this.titles = _this.english;
                _this.styleCustom = "parah-1";
            }
            else {
                _this.titles = _this.punjabi;
                _this.styleCustom = "parah-1 custom-FontPunjabi";
            }
        });
    }
    return AboutUs;
}());
AboutUs = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-about-us',template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\about-us\about-us.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{titles.pagetitle}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background-image: url(img/back.png); background-size: cover;">\n  <ion-grid class="first-row">  \n      <ion-row (click)="about()">\n        <ion-col col-7 class="col-one">\n          <p>{{titles.title}}</p>\n          <p class="p2">{{titles.Designation}}</p>\n        </ion-col>\n        <ion-col col-5 class="col-second">\n          <img src="img/photo.jpg"/>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n   \n  <p  [class]="styleCustom"> {{titles.message}}</p>\n  <!-- <p class="parah-1">Education :</p>\n  <p class="parah-2"> Graduate Professional</p>\n  <p class="parah-1">Website :</p>\n  <p class="parah-2">http://dharambiragnihotri.darlic.com/</p> -->\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\about-us\about-us.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], AboutUs);

//# sourceMappingURL=about-us.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewSuggestion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ViewSuggestion = (function () {
    function ViewSuggestion(navCtrl, loadingCtrl, navParams, http, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.buttonClicked = false;
        this.suggview = [];
        this.cssData = [];
        this.titles = [];
        this.titless = [];
        this.english = [];
        this.punjabi = [];
        this.cssDataColor = [];
        this.sugrply = [];
        this.apiurl = "http://isp.mediaoncloud.com/MLA/";
        this.english = { title: 'View Suggestion', name: 'Name', sugg: 'Suggestion', mobile: 'Phone Number', area: 'Area', ward: 'Ward', village: 'Village', reply: 'Reply' };
        this.punjabi = { title: 'ਸੁਝਾਅ ਦੇਖੋ', name: 'ਨਾਮ', sugg: 'ਸਲਾਹ', mobile: 'ਮੋਬਾਈਲ', area: 'ਖੇਤਰ', ward: 'ਵਾਰਡ', village: 'ਪਿੰਡ', reply: 'ਜਵਾਬ ਦਿਉ' };
        this.storage.get('lang').then(function (lang) {
            _this.language = lang;
            if (_this.language == 'english') {
                _this.titles = _this.english;
            }
            else {
                _this.titles = _this.punjabi;
            }
        });
        this.storage.get('Uid').then(function (Uid) {
            _this.userId = Uid;
            var loadingPopup = _this.loadingCtrl.create({
                content: '',
            });
            loadingPopup.present();
            _this.http.get(_this.apiurl + "sugessionView?userid=" + _this.userId).map(function (res) { return res.json(); }).subscribe(function (data) {
                setTimeout(function () {
                    if (data.status != 'Failed') {
                        _this.suggview = data;
                        for (var i = 0; i < _this.suggview.length; i++) {
                            _this.cssData.push({
                                class: 'custom-hide',
                                classInner: 'custom-hide'
                            });
                            if (i % 2 == 0) {
                                _this.cssDataColor.push({
                                    class: 'custom-even',
                                });
                            }
                            else {
                                _this.cssDataColor.push({
                                    class: 'custom-odd',
                                });
                            }
                        }
                        _this.suggid = data.id;
                        loadingPopup.dismiss();
                    }
                    else {
                        _this.english = { message2: "There is no Suggestion" };
                        _this.punjabi = { message2: "ਕੋਈ ਸੁਝਾਅ ਨਹੀਂ ਹੈ" };
                        _this.storage.get('lang').then(function (lang) {
                            _this.language = lang;
                            if (_this.language == 'english') {
                                _this.titless = _this.english;
                            }
                            else {
                                _this.titless = _this.punjabi;
                            }
                        });
                        loadingPopup.dismiss();
                    }
                }, 1000);
            });
        });
    }
    ViewSuggestion.prototype.infocl = function (sug_id, index) {
        var _this = this;
        for (var i = 0; i < this.cssData.length; i++) {
            if (i === index) {
                if (this.cssData[index].class == 'custom-show') {
                    this.cssData[index].class = 'custom-hide';
                }
                else {
                    this.cssData[index].class = 'custom-show';
                }
            }
            else {
                this.cssData[i].class = 'custom-hide';
            }
        }
        this.http.get(this.apiurl + "sugession_replyview?sugession_id=" + sug_id).map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.sugrply = data;
        });
    };
    return ViewSuggestion;
}());
ViewSuggestion = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-view-suggestion',template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\view-suggestion\view-suggestion.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{titles.title}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="background-color:#f9e7cf;">\n   <!-- <ion-card *ngFor="let sugg of suggview; let i= index">\n      <ion-card-content class="view-sug">\n        <p><span>{{titles.name}}</span> : {{suggview[i].name}}</p>\n        <p><span>{{titles.sugg}}</span> : {{suggview[i].sugession}}</p>\n        <p><span>{{titles.mobile}}</span> : {{suggview[i].mobile}}</p>\n      </ion-card-content>\n      <ion-icon md="ios-arrow-dropdown-circle" (click)="replysug(suggview[i].id)"></ion-icon>\n      <ion-card *ngIf="buttonClicked">\n        <ion-card-content *ngFor="let sug of sugrply; let i =index;">\n            <p><span>{{titles.sugg}}</span> : {{suggview[i].sugession}}</p>\n            <p><span>{{titles.mobile}}</span> : {{suggview[i].mobile}}</p>\n        </ion-card-content>\n      </ion-card>\n    </ion-card> -->\n    <div *ngFor="let sugg of suggview; let i= index">\n    <div class="row-main">\n      <p>{{suggview[i].name}}</p>\n      <p class="mobile-row"><img src="img/mobile.png"/>{{suggview[i].mobile}}</p>\n      <ion-row class="arrow-row"> \n        <ion-icon class="down-icons" md="ios-arrow-down" (click)="infocl(suggview[i].id, i)"></ion-icon>\n      </ion-row>\n      <div [class] = "cssData[i].class">\n        <p class="sugg">{{titles.sugg}}</p>\n        <p>{{suggview[i].sugession}}</p>\n        <p class="sugg">{{titles.reply}}</p>\n        <div *ngFor="let sug of sugrply; let j=index">\n        <p >{{sugrply[j].message}}</p> \n        </div>\n      </div>\n    </div>\n    </div>\n   <p style="margin:1em 3em;font-size:20px;font-weight:500;color:#000;">{{titless.message2}}</p>\n</ion-content>\n'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\view-suggestion\view-suggestion.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], ViewSuggestion);

//# sourceMappingURL=view-suggestion.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LangSetting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LangSetting = (function () {
    //public people: Array<Object>;
    function LangSetting(navCtrl, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.titles = [];
        this.englishleng = [];
        this.punjabi = [];
        this.englishleng = { title: 'Language Setting', title1: 'English', title2: 'Punjabi', setlang: 'Set Language' };
        this.punjabi = { title: 'ਭਾਸ਼ਾ ਸੈਟਿੰਗ', title1: 'English', title2: 'ਪੰਜਾਬੀ', setlang: 'ਭਾਸ਼ਾ ਸੈੱਟ ਕਰੋ' };
        this.storage.get('lang').then(function (lang) {
            _this.language = lang;
            if (_this.language == 'punjabi') {
                _this.titles = _this.punjabi;
                _this.relationship = 'punjabi';
            }
            else {
                _this.titles = _this.englishleng;
                _this.relationship = 'english';
            }
            console.log(_this.titles);
        });
    }
    LangSetting.prototype.langset = function (a) {
        var _this = this;
        this.storage.set("lang", a);
        this.storage.get('lang').then(function (lang) {
            _this.language = lang;
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        });
    };
    return LangSetting;
}());
LangSetting = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-lang-setting',template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\lang-setting\lang-setting.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{titles.title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list radio-group [(ngModel)]="relationship">\n        <ion-item>\n          <ion-label>{{titles.title1}}</ion-label>\n          <ion-radio value="english" checked></ion-radio>\n         \n        </ion-item>\n        <ion-item>\n          <ion-label>{{titles.title2}}</ion-label>\n          <ion-radio value="punjabi" ></ion-radio>\n        </ion-item>\n      </ion-list>\n      <button ion-button round outline block type="submit" class="button-submit" (click)="langset(relationship)">{{titles.setlang}}</button>        \n</ion-content>\n'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\lang-setting\lang-setting.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], LangSetting);

//# sourceMappingURL=lang-setting.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__setting_setting__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EditProfile = (function () {
    function EditProfile(navCtrl, navParams, toast, http, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toast = toast;
        this.http = http;
        this.storage = storage;
        this.titles = [];
        this.english = [];
        this.punjabi = [];
        this.wardCategory = [];
        this.priority = [];
        this.issuetype = [];
        this.areatype = [];
        this.villagetype = [];
        this.apiurl = "http://isp.mediaoncloud.com/MLA/";
        this.data = {};
        this.english = { name: 'Name', area: 'Area', ward: 'Ward', village: 'Village', address: 'Address', complainagainst: 'Complaint against', complaint: 'Complaint', mobile: 'Mobile', email: 'Email', submit: 'Submit', gender: 'Gender', selectGen: 'Select Gender', Female: 'Female', male: 'Male', optional: 'Optional', saveprof: 'Save profile', title: 'Dr. Dharambir Agnihotri', Designation: 'MLA of Tarn Taran' };
        this.punjabi = { name: 'ਨਾਮ', area: 'ਖੇਤਰ', ward: 'ਵਾਰਡ', village: 'ਪਿੰਡ', address: 'ਪਤਾ', complainagainst: 'ਸ਼ਿਕਾਇਤ ਵਿਰੁੱਧ ', complaint: 'ਸ਼ਿਕਾਇਤ', mobile: 'ਮੋਬਾਈਲ', email: 'ਈ - ਮੇਲ', submit: 'ਜਮ੍ਹਾਂ ਕਰੋ', gender: 'ਲਿੰਗ', selectGen: 'ਲਿੰਗ ਚੁਣੋ', Female: 'ਔਰਤ', male: 'ਮਰਦ', optional: 'ਵਿਕਲਪਿਕ', saveprof: 'Save profile', title: 'ਡਾਕਟਰ ਧਰਮਵੀਰ ਅਗਨੀਹੋਤਰੀ ', Designation: 'ਐਮ ਐਲ ਏ (ਤਰਨ ਤਾਰਨ)' };
        this.storage.get('lang').then(function (lang) {
            _this.language = lang;
            if (_this.language == 'english') {
                _this.titles = _this.english;
            }
            else {
                _this.titles = _this.punjabi;
            }
        });
        this.http.get(this.apiurl + "wardview").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.wardCategory = data;
        });
        this.http.get(this.apiurl + "issueType").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.issuetype = data;
        });
        this.http.get(this.apiurl + "selectArea").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.areatype = data;
        });
        this.http.get(this.apiurl + "selectVillage").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.villagetype = data;
        });
        this.storage.get('facebooktype').then(function (facebooktype) {
            _this.f_type = facebooktype;
            if (_this.f_type != 'facebook') {
                _this.storage.get('ph_no').then(function (ph_no) {
                    _this.phone_no = ph_no;
                    _this.http.get(_this.apiurl + "get_profile?user_id=" + _this.phone_no).map(function (res) { return res.json(); }).subscribe(function (data) {
                        _this.profile = data.name;
                        _this.storage.set("username", _this.profile);
                        _this.storage.get('username').then(function (username) {
                            _this.usrname = username;
                        });
                        _this.p_no = data.phone;
                        _this.addvalue = data.address;
                        _this.Areaa = data.area;
                        _this.catward = data.ward;
                        _this.areavill = data.village;
                        _this.Email = data.email;
                    });
                });
            }
            if (_this.f_type == 'facebook') {
                _this.storage.get('Uid').then(function (Uid) {
                    _this.facebookid = Uid;
                    _this.http.get(_this.apiurl + "fblogin_profile?fbuserid=" + _this.facebookid).map(function (res) { return res.json(); }).subscribe(function (data) {
                        _this.fprof = data.name;
                        _this.storage.set("username", _this.fprof);
                        _this.storage.get('username').then(function (username) {
                            _this.usrname = username;
                        });
                        _this.p_no = data.phone;
                        _this.addvalue = data.address;
                        _this.Areaa = data.area;
                        _this.catward = data.ward;
                        _this.areavill = data.village;
                        _this.Email = data.email;
                    });
                });
            }
        });
    }
    EditProfile.prototype.areacategory = function (x) {
        if (x == 'Tarn Taran City') {
            this.value = 'ward';
            //this.value1 = '';
        }
        else if (x == 'Tarn Taran Village') {
            this.value = 'village';
            //  this.value1 = 'village'; 
        }
    };
    EditProfile.prototype.wardcategory = function (a) {
        var _this = this;
        this.http.get(this.apiurl + "wardview").map(function (res) { return res.json(); }).subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == a) {
                    _this.priorityvalue = data[i].priority;
                }
            }
        });
    };
    EditProfile.prototype.villagecat = function (b) {
    };
    EditProfile.prototype.editprofile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__setting_setting__["a" /* Setting */]);
    };
    EditProfile.prototype.submit = function (profile, addvalue, Areaa, catward, areavill, Email, gender) {
        var _this = this;
        this.storage.get('Uid').then(function (Uid) {
            _this.facid = Uid;
            _this.http.get(_this.apiurl + "update_profile?name=" + profile + '&address=' + addvalue + '&area=' + Areaa + '&ward=' + catward + '&village=' + areavill + '&gender=' + gender + '&email=' + Email + '&id=' + _this.facid).map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.saveprofile = data;
                if (_this.saveprofile.Status == 'Success') {
                    //alert("Profile Updated Successfully");
                    _this.toast.show("Profile Updated Successfully", 'long', 'center').subscribe(function (toast) {
                        console.log(toast);
                    });
                    _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
                }
                else {
                    //alert("Profile Not Updated ");
                    _this.toast.show("Profile Not Updated", 'long', 'center').subscribe(function (toast) {
                        console.log(toast);
                    });
                }
            });
        });
    };
    return EditProfile;
}());
EditProfile = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-edit-profile',template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\edit-profile\edit-profile.html"*/'<ion-header>\n  <ion-navbar>\n     <ion-title>Edit Profile</ion-title> \n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="background-image: url(img/back.png); background-size: cover;">\n  <ion-grid class="first-one">  \n    <ion-row >\n  <ion-col col-7 class="col-one">\n  <p>{{titles.title}}</p>\n   <p class="p2">{{titles.Designation}}</p>\n    </ion-col>\n  \n  <ion-col col-5 class="col-second">\n  <img src="img/photo.jpg"/>\n  </ion-col>\n  \n   </ion-row>\n   </ion-grid>\n   <ion-row class="first-row">\n      <ion-input type="text" placeholder="{{titles.name}}" [(ngModel)]="usrname" name="usrname"></ion-input>\n    </ion-row>\n    <!-- <ion-row class="first-row" >\n        <ion-input type="tel" maxlength="10" placeholder="{{titles.mobile}}"  [(ngModel)]="p_no" name="p_no"></ion-input>\n    </ion-row> -->\n    <ion-row class="first-row">\n        <ion-input type="text" placeholder="{{titles.address}}" [(ngModel)]="addvalue" name="addvalue"></ion-input>\n    </ion-row>\n   \n<ion-row class="second-row">\n  <select id="areacat" class="drop-down" type="text" name="Areaa" onmousedown="this.value=\'\';" [(ngModel)]="Areaa"\n    (change)="areacategory(Areaa)">  \n      <option value="" disabled selected>{{titles.area}}</option>\n      <option *ngFor="let val of areatype" [ngValue]="val" style="color:#000;"> {{val}}</option>\n    </select>\n</ion-row>\n\n<ion-row *ngIf="value == \'ward\' || (Areaa==\'Tarn Taran City\')" class="second-row">\n  <select class="drop-down" type="text" name="catward" onmousedown="this.value=\'\';" [(ngModel)]="catward" (change)="wardcategory(catward)">  \n    <option value="" disabled selected>{{titles.ward}}</option>\n    <option *ngFor="let val of wardCategory; let i= index" [ngValue]="wardCategory[i].ward_num" style="color:#000;" > {{wardCategory[i].ward_num}}</option>\n  </select>\n</ion-row>\n<!-- [hidden]=\'!value1\' -->\n<ion-row  *ngIf="value==\'village\' || (Areaa==\'Tarn Taran Village\')" class="second-row">\n  <select class="drop-down" type="text" name="areavill" onmousedown="this.value=\'\';" [(ngModel)]="areavill" (change)="villagecat(areavill)">  \n    <option value="" disabled selected>{{titles.village}}</option>\n    <option *ngFor="let val of villagetype; let i= index" [ngValue]="villagetype[i].village" style="color:#000;" > {{villagetype[i].village}}</option>\n  </select>\n</ion-row>\n\n    <ion-row class="first-row">\n        <ion-input type="email" placeholder="{{titles.email}}({{titles.optional}})" [(ngModel)]="Email" name="Email"></ion-input>\n    </ion-row>\n    <ion-row class="second-row">\n      <p>{{titles.gender}}</p>\n      <select type="text" class="drop-down" placeholder="Select Gender" [(ngModel)]="gender" onmousedown="this.value=\'\';" >  \n        <option value="" disabled selected>{{titles.selectgen}}</option>\n        <option value="Female">{{titles.Female}}</option>\n        <option value="Male">{{titles.male}}</option>\n      </select>\n    </ion-row>\n  \n  <button ion-button block outline type="submit" class="button-submit" (click)="submit(usrname,addvalue,Areaa,catward,areavill,Email,gender)">Save Profile</button>\n</ion-content>\n'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\edit-profile\edit-profile.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _e || Object])
], EditProfile);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=edit-profile.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Signup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Signup = (function () {
    function Signup(navCtrl, navParams, http, toast) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toast = toast;
        this.wardCategory = [];
        this.areatype = [];
        this.villagetype = [];
        this.apiurl = "http://isp.mediaoncloud.com/MLA/";
        this.data = [];
        this.data.name = '';
        this.data.mobile = '';
        this.data.pass = '';
        this.data.area = '';
        this.data.ward = '';
        this.data.Vill = '';
        this.data.address = '';
        this.data.email = '';
        this.http.get(this.apiurl + "wardview").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.wardCategory = data;
        });
        this.http.get(this.apiurl + "selectArea").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.areatype = data;
        });
        this.http.get(this.apiurl + "selectVillage").map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.villagetype = data;
        });
    }
    Signup.prototype.areacategory = function (x) {
        if (x == 'Tarn Taran City') {
            this.value = 'ward';
            this.value1 = '';
        }
        else if (x == 'Tarn Taran Village') {
            this.value = '';
            this.value1 = 'village';
        }
    };
    Signup.prototype.wardcateg = function (a) {
        var _this = this;
        this.http.get(this.apiurl + "wardview").map(function (res) { return res.json(); }).subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == a) {
                    console.log(data[i].priority);
                    _this.priorityvalue = data[i].priority;
                }
            }
        });
    };
    Signup.prototype.villagecat = function (b) {
    };
    Signup.prototype.submit = function (name, mobile, area, ward, Vill, address, email) {
        var _this = this;
        if (this.data.name != '' && this.data.mobile != '' && this.data.address != '') {
            this.http.get(this.apiurl + "signup?id=&name=" + name + '&phone=' + mobile + '&area=' + area + '&ward=' + ward + '&village=' + Vill + '&address=' + address + '&email=' + email).map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.signupData = data;
                if (_this.signupData.status != 'Failed') {
                    //alert("You have registered successfully");
                    _this.toast.show("You have registered successfully", 'long', 'center').subscribe(function (toast) {
                        console.log(toast);
                    });
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* Login */]);
                }
                else {
                    //alert("Already Signed Up");
                    _this.toast.show("Already Signed Up", 'long', 'center').subscribe(function (toast) {
                        console.log(toast);
                    });
                }
            });
        }
        else {
            //alert("Some fields are required to be filled");
            this.toast.show("Some fields are required to be filled", 'long', 'center').subscribe(function (toast) {
                console.log(toast);
            });
        }
    };
    return Signup;
}());
Signup = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\signup\signup.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Sign Up</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding style="background-image: url(img/back.png); background-size: cover;">\n  <ion-row style="margin-bottom:30px;margin-top:10px;"><img src ="img/mlaLogo.png" class="image" /></ion-row>\n  <ion-row class="first-row">\n      <ion-input type="text" placeholder="Name" [(ngModel)]="data.name" name="data.name"></ion-input>\n  </ion-row > \n  <ion-row class="first-row"> \n  <ion-input type="tel" maxlength="10" [(ngModel)]="data.mobile" name="data.mobile" placeholder="Mobile Number" ></ion-input>\n  </ion-row>\n  <!-- <ion-row class="first-row"> \n    <ion-input type="password" maxlength="8" minlength="6" [(ngModel)]="data.pass" name="data.pass" placeholder="Password" ></ion-input>\n  </ion-row> -->\n  <ion-row class="second-row">\n    <select  class="drop-down" placeholder="Select Area"  type="text" name="data.area" onmousedown="this.value=\'\';" [(ngModel)]="data.area" (change)="areacategory(data.area)" >  \n      <option value="" disabled selected>Select Area</option>\n      <option *ngFor="let val of areatype" [ngValue]="val" style="color:#000;"> {{val}}</option>\n    </select>\n  </ion-row>\n      \n  <ion-row *ngIf="value == \'ward\'" class="second-row">\n    <select class="drop-down" placeholder="Select Ward"  type="text" name="data.ward" onmousedown="this.value=\'\';" [(ngModel)]="data.ward" (change)="wardcateg(data.ward)" >  \n      <option value="" disabled selected>Select Ward</option>\n      <option *ngFor="let val of wardCategory; let i= index" [ngValue]="wardCategory[i].ward_num" style="color:#000;" > {{wardCategory[i].ward_num}}</option>\n    </select>\n  </ion-row>\n      \n  <ion-row [hidden] =\'!value1\' class="second-row">\n    <select class="drop-down" placeholder="Select Village"  type="text" name="data.Vill" onmousedown="this.value=\'\';" [(ngModel)]="data.Vill" (change)="villagecat(data.Vill)" >  \n      <option value="" disabled selected>Select Village</option>\n      <option *ngFor="let val of villagetype; let i= index" [ngValue]="villagetype[i].village" style="color:#000;" > {{villagetype[i].village}}</option>\n    </select>\n  </ion-row>\n\n  <ion-row class="third-row">\n    <textarea [(ngModel)]="data.address" name="data.address" placeholder="Address"  rows="5" cols="50"></textarea>\n  </ion-row>\n\n  <ion-row class="first-row">\n    <ion-input type="email" [(ngModel)]="data.email" name="data.email" placeholder="Email(optional)"></ion-input>\n  </ion-row>\n\n  <button ion-button round outline block type="submit" class="button-submit" (click)="submit(data.name,data.mobile,data.area,data.ward,data.Vill,data.address,data.email)">SUBMIT</button>\n  <!-- <ion-row style="margin-bottom:20px;"><img src ="img/mlaLogo.png" class="image" /></ion-row>\n  <ion-item class="item-color">\n    <ion-input type="text" placeholder="Name" [(ngModel)]="data.name" name="data.name"></ion-input>\n  </ion-item>\n  <ion-item class="item-color">\n    <ion-input type="tel" maxlength="10" [(ngModel)]="data.mobile" name="data.mobile" placeholder="Mobile Number" ></ion-input>\n  </ion-item>\n \n  <ion-item class="item-color">\n    <select  class="drop-down" placeholder="Select Area"  type="text" name="data.area" onmousedown="this.value=\'\';" [(ngModel)]="data.area" (change)="areacategory(data.area)" >  \n        <option value="" disabled selected>Select Area</option>\n      <option *ngFor="let val of areatype" [ngValue]="val" style="color:#000;"> {{val}}</option>\n    </select>\n</ion-item>\n\n<ion-item [hidden]="!value" class="item-color">\n<select   class="drop-down" placeholder="Select Ward"  type="text" name="data.ward" onmousedown="this.value=\'\';" [(ngModel)]="data.ward" (change)="wardcateg(data.ward)" >  \n  <option value="" disabled selected>Select Ward</option>\n  <option *ngFor="let val of wardCategory; let i= index" [ngValue]="wardCategory[i].ward_num" style="color:#000;" > {{wardCategory[i].ward_num}}</option>\n</select>\n</ion-item>\n\n<ion-item [hidden] =\'!value1\' class="item-color">\n    <select class="drop-down" placeholder="Select Village"  type="text" name="data.Vill" onmousedown="this.value=\'\';" [(ngModel)]="data.Vill" (change)="villagecat(data.Vill)" >  \n      <option value="" disabled selected>Select Village</option>\n      <option *ngFor="let val of villagetype; let i= index" [ngValue]="villagetype[i].village" style="color:#000;" > {{villagetype[i].village}}</option>\n    </select>\n</ion-item>\n\n  <ion-item class="item-color">\n    <ion-textarea [(ngModel)]="data.address" name="data.address" placeholder="Address" ></ion-textarea>\n  </ion-item>\n  <ion-item class="item-color">\n    <ion-input type="email" [(ngModel)]="data.email" name="data.email" placeholder="Email"></ion-input>\n  </ion-item> -->\n\n  \n</ion-content>'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\signup\signup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__["a" /* Toast */]])
], Signup);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePhone; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChangePhone = (function () {
    function ChangePhone(navCtrl, navParams, http, storage, toast) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.toast = toast;
        this.titles = [];
        this.english = [];
        this.punjabi = [];
        this.data = {};
        this.data.phone = '';
        this.english = { title: 'Change Phone Number', para: 'Enter Your 10 Digit mobile Number', mob: 'New Mobile Number', sub: 'Submit' };
        this.punjabi = { title: 'ਫੋਨ ਨੰਬਰ ਬਦਲੋ', para: 'ਆਪਣਾ 10 ਅੰਕਾਂ ਵਾਲਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਾਖਲ ਕਰੋ', mob: 'ਨਵਾਂ ਮੋਬਾਈਲ ਨੰਬਰ', sub: 'ਜਮ੍ਹਾਂ ਕਰੋ' };
        this.storage.get('lang').then(function (lang) {
            _this.language = lang;
            if (_this.language == 'english') {
                _this.titles = _this.english;
            }
            else {
                _this.titles = _this.punjabi;
            }
            console.log(_this.titles);
        });
    }
    ChangePhone.prototype.submit = function (phone) {
        var _this = this;
        this.storage.get('ph_no').then(function (ph_no) {
            _this.user_phn = ph_no;
            _this.http.get("http://isp.mediaoncloud.com/MLA/changePhone?phone=" + phone + '&oldphone=' + _this.user_phn).map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.usrphn = data;
                if (_this.usrphn.status != 'Failed') {
                    _this.toast.show("Your Phone number changed successfully", 'long', 'center').subscribe(function (toast) {
                        console.log(toast);
                    });
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* Login */]);
                }
                else {
                    _this.toast.show("Invalid phone number", 'long', 'center').subscribe(function (toast) {
                        console.log(toast);
                    });
                }
            });
        });
    };
    return ChangePhone;
}());
ChangePhone = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-change-phone',template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\change-phone\change-phone.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{titles.title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <p style="font-size:16px;font-weight:500;">{{titles.para}}</p>\n    <ion-row class="first-row">\n       <ion-input type="tel" maxlength="10" placeholder="{{titles.mob}}" [(ngModel)]="data.phone" name="data.phone"></ion-input>\n    </ion-row>\n    <button ion-button round outline block type="submit" class="button-submit" (click)="submit(data.phone)">{{titles.sub}}</button>\n    \n</ion-content>\n'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\change-phone\change-phone.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */]])
], ChangePhone);

//# sourceMappingURL=change-phone.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(241);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_complaint_complaint__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_signup_signup__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_gallery_gallery__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_setting_setting__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_edit_profile_edit_profile__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_lang_setting_lang_setting__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_suggestion_suggestion__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_complaint_info_complaint_info__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_complaint_ref_complaint_ref__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_constituency_constituency__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_view_suggestion_view_suggestion__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_about_us_about_us__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_change_phone_change_phone__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_file__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_transfer__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_file_path__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_camera__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_media_capture__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_image_picker__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_device__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_sim__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_sqlite__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_splash_screen__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_toast__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_in_app_browser__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_onesignal__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_facebook__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_native_storage__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_network__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_complaint_complaint__["a" /* Complaint */],
            __WEBPACK_IMPORTED_MODULE_12__pages_suggestion_suggestion__["a" /* Suggestion */],
            __WEBPACK_IMPORTED_MODULE_13__pages_complaint_info_complaint_info__["a" /* ComplaintInfo */],
            __WEBPACK_IMPORTED_MODULE_8__pages_gallery_gallery__["a" /* Gallery */],
            __WEBPACK_IMPORTED_MODULE_14__pages_complaint_ref_complaint_ref__["a" /* ComplaintRef */],
            __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* Login */],
            __WEBPACK_IMPORTED_MODULE_7__pages_signup_signup__["a" /* Signup */],
            __WEBPACK_IMPORTED_MODULE_9__pages_setting_setting__["a" /* Setting */],
            __WEBPACK_IMPORTED_MODULE_11__pages_lang_setting_lang_setting__["a" /* LangSetting */],
            __WEBPACK_IMPORTED_MODULE_10__pages_edit_profile_edit_profile__["a" /* EditProfile */],
            __WEBPACK_IMPORTED_MODULE_15__pages_constituency_constituency__["a" /* Constituency */],
            __WEBPACK_IMPORTED_MODULE_16__pages_view_suggestion_view_suggestion__["a" /* ViewSuggestion */],
            __WEBPACK_IMPORTED_MODULE_17__pages_about_us_about_us__["a" /* AboutUs */],
            __WEBPACK_IMPORTED_MODULE_18__pages_change_phone_change_phone__["a" /* ChangePhone */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_19__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_31__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_complaint_complaint__["a" /* Complaint */],
            __WEBPACK_IMPORTED_MODULE_12__pages_suggestion_suggestion__["a" /* Suggestion */],
            __WEBPACK_IMPORTED_MODULE_13__pages_complaint_info_complaint_info__["a" /* ComplaintInfo */],
            __WEBPACK_IMPORTED_MODULE_8__pages_gallery_gallery__["a" /* Gallery */],
            __WEBPACK_IMPORTED_MODULE_14__pages_complaint_ref_complaint_ref__["a" /* ComplaintRef */],
            __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* Login */],
            __WEBPACK_IMPORTED_MODULE_7__pages_signup_signup__["a" /* Signup */],
            __WEBPACK_IMPORTED_MODULE_9__pages_setting_setting__["a" /* Setting */],
            __WEBPACK_IMPORTED_MODULE_11__pages_lang_setting_lang_setting__["a" /* LangSetting */],
            __WEBPACK_IMPORTED_MODULE_10__pages_edit_profile_edit_profile__["a" /* EditProfile */],
            __WEBPACK_IMPORTED_MODULE_15__pages_constituency_constituency__["a" /* Constituency */],
            __WEBPACK_IMPORTED_MODULE_16__pages_view_suggestion_view_suggestion__["a" /* ViewSuggestion */],
            __WEBPACK_IMPORTED_MODULE_17__pages_about_us_about_us__["a" /* AboutUs */],
            __WEBPACK_IMPORTED_MODULE_18__pages_change_phone_change_phone__["a" /* ChangePhone */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_28__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_30__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_21__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_24__ionic_native_media_capture__["a" /* MediaCapture */],
            __WEBPACK_IMPORTED_MODULE_25__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_26__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_27__ionic_native_sim__["a" /* Sim */],
            __WEBPACK_IMPORTED_MODULE_32__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_33__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_34__ionic_native_onesignal__["a" /* OneSignal */],
            __WEBPACK_IMPORTED_MODULE_35__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_36__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_29__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_37__ionic_native_network__["a" /* Network */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_onesignal__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_network__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_complaint_info_complaint_info__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MyApp = (function () {
    function MyApp(platform, network, sqlite, oneSignal, storage, statusBar, splashScreen, device) {
        var _this = this;
        this.platform = platform;
        this.network = network;
        this.sqlite = sqlite;
        this.oneSignal = oneSignal;
        this.storage = storage;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.device = device;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* Login */];
        this.titles = [];
        this.english = [];
        this.punjabi = [];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */] },
        ];
        this.storage.get('Uid').then(function (Uid) {
            _this.userId = Uid;
            if (!_this.userId) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* Login */];
            }
            else if (_this.userId) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
            }
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            var uniq_id = _this.device.uuid;
            _this.storage.set('unique_no', uniq_id);
            _this.storage.get('unique_no').then(function (unique_no) {
                _this.uniqueid = unique_no;
            });
            // one signal notification
            _this.oneSignal.startInit('c0c6e79e-0535-4dce-81ee-1dbee730dfe6', '267186828659');
            _this.oneSignal.inFocusDisplaying(_this.oneSignal.OSInFocusDisplayOption.Notification);
            _this.oneSignal.handleNotificationReceived().subscribe(function (data) {
                // do something when notification is received
                _this.platform.ready().then(function () {
                    window.plugins.toast.show('Hi !You have notification: ' + data.payload.body, "long", "center");
                });
            });
            _this.oneSignal.getIds().then(function (dviceid) {
                _this.storage.set('token_id', dviceid.userId);
                _this.storage.get('token_id').then(function (token_id) {
                    _this.tokenId = token_id;
                });
            });
            _this.oneSignal.handleNotificationOpened().subscribe(function () {
                // do something when a notification is opened
                _this.storage.get('Uid').then(function (Uid) {
                    _this.userId = Uid;
                    if (_this.userId) {
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_complaint_info_complaint_info__["a" /* ComplaintInfo */]);
                    }
                });
            });
            _this.oneSignal.endInit(); // ends here
            //default language english set here
            _this.storage.set("lang", "english");
            _this.storage.get('lang').then(function (lang) {
                _this.language = lang;
                if (_this.language == 'punjabi') {
                    _this.titles = _this.punjabi;
                }
                else {
                    _this.titles = _this.english;
                }
            }); //ends here
            //--------------Internet connection----------//  
            _this.network.onDisconnect().subscribe(function () {
                _this.platform.ready().then(function () {
                    window.plugins.toast.show("You are offline", "long", "center");
                });
            });
            _this.network.onConnect().subscribe(function () {
                _this.platform.ready().then(function () {
                    window.plugins.toast.show("You are online", "long", "center");
                });
            }); //-----------end here-----------//
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__["a" /* Device */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComplaintRef; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ComplaintRef = (function () {
    function ComplaintRef(navCtrl, navParams, http, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.allvalue = [];
        this.cssData = [];
        this.buttonClicked = false;
        this.buttonClick = false;
        this.allImage = [];
        this.reply = [];
        this.replymsg = [];
        this.replyimage = [];
        this.replyimages = [];
        this.IsHidden = true;
        this.titles = [];
        this.english = [];
        this.punjabi = [];
        this.apiurl = "http://isp.mediaoncloud.com/MLA/";
        this.english = { resp: 'Response' };
        this.punjabi = { resp: 'ਜਵਾਬ' };
        this.storage.get('lang').then(function (lang) {
            _this.language = lang;
            if (_this.language == 'english') {
                _this.titles = _this.english;
            }
            else {
                _this.titles = _this.punjabi;
            }
            console.log(_this.titles);
        });
    }
    ComplaintRef.prototype.viewrefdetail = function (a) {
        var _this = this;
        this.buttonClick = !this.buttonClick;
        this.http.get(this.apiurl + "replyview?ref_num=" + a).map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.reply = data;
            _this.replymsg = data[0].message;
            _this.replyimage = data[0].images;
            _this.replyvideo = data[0].video;
            _this.replyimages = _this.replyimage.split(",");
        });
    };
    ComplaintRef.prototype.onInput = function (searchTerm) {
        var _this = this;
        if (searchTerm.length >= 6) {
            this.buttonClicked = !this.buttonClicked;
            this.http.get(this.apiurl + 'complaintviewref?ref_num=' + searchTerm).map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.complaintname = data[0].name;
                _this.complnt = data[0].complaint;
                _this.p_image = data[0].profile_img;
                _this.refrenceno = data[0].ref_num;
                _this.allImage = _this.p_image.split(",");
                _this.reply_video = data[0].video;
            });
        }
    };
    return ComplaintRef;
}());
ComplaintRef = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-complaint-ref',template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\complaint-ref\complaint-ref.html"*/'<ion-header>\n  <ion-navbar>  \n  </ion-navbar>\n</ion-header>\n\n<ion-content style="background-color:#f9e7cf;">\n  <ion-searchbar [(ngModel)]="searchTerm" [showCancelButton]="shouldShowCancel" (ionInput)="onInput(searchTerm)" ></ion-searchbar>\n  <ion-row>\n    <ion-card *ngIf="buttonClicked" class="rnumber">\n    <ion-card-content>\n        <ion-row class="complaint-row">\n         <h3>{{complaintname}}</h3>\n          </ion-row>\n          <ion-row >\n          <p class="para-complaint">{{complnt}}</p>\n          </ion-row>\n          <ion-row *ngIf="allImage != \'\' ">\n          <img *ngFor="let img of allImage" src="http://kailash.mediaoncloud.com/MLAfiles/{{img}}" class="gal-img"/>\n          </ion-row>\n          <video  *ngIf="reply_video != \'\' && reply_video != \'undefined\'" class ="video-complaint" controls="controls" src="http://kailash.mediaoncloud.com/MLAfiles/{{reply_video}}" type="video/mp4" style="height:180px;width:300px;"></video><br>\n          <ion-row>\n          <a (click)="viewrefdetail(refrenceno)" class="response">{{titles.resp}}</a>\n          </ion-row>\n          <ion-row>\n           <p *ngIf="buttonClick" style="color:black;">{{replymsg}}</p>\n          </ion-row>\n           <div *ngIf="buttonClick">\n             <div *ngFor="let img of replyimages">\n               <img *ngIf="img" src="http://kailash.mediaoncloud.com/MLAfiles/{{img}}" class="gal-img" />\n             </div>\n          </div>\n           <div *ngIf="buttonClick">\n               <video *ngIf="replyvideo != \'\' " controls="controls" src="http://kailash.mediaoncloud.com/MLAfiles/{{replyvideo}}" type="video/mp4" style="height:180px;width:300px;"></video>\n           </div>\n          </ion-card-content>\n       </ion-card>\n     </ion-row>\n</ion-content>\n'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\complaint-ref\complaint-ref.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], ComplaintRef);

//# sourceMappingURL=complaint-ref.js.map

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__complaint_complaint__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__suggestion_suggestion__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gallery_gallery__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__complaint_info_complaint_info__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__constituency_constituency__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__about_us_about_us__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__view_suggestion_view_suggestion__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__setting_setting__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var HomePage = (function () {
    function HomePage(navCtrl, platform, http, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.http = http;
        this.navParams = navParams;
        this.storage = storage;
        this.titles = [];
        this.english = [];
        this.punjabi = [];
        this.english = { title: 'Dr. Dharambir', lastname: 'Agnihotri', Designation: 'MLA of Tarn Taran', complaint: 'Complaints', view: 'View', comp: 'Complaint', sugges: 'Suggestion', viewsug: 'View Suggestion', gallery: 'Gallery', constituency: 'Constituency' };
        this.punjabi = { title: 'ਡਾਕਟਰ ਧਰਮਵੀਰ ', lastname: 'ਅਗਨੀਹੋਤਰੀ', Designation: 'ਐਮ ਐਲ ਏ (ਤਰਨ ਤਾਰਨ)', complaint: 'ਸਕਾਇਤ', view: 'ਦੇਖੋ ', comp: 'ਸਕਾਇਤ', sugges: 'ਸਲਾਹ', viewsug: 'ਸਲਾਹ ਦੇਖੋ', gallery: 'ਤਸਵੀਰਾਂ', constituency: 'ਚੋਣ ਖੇਤਰ' };
        this.apiurl = "http://isp.mediaoncloud.com/MLA/";
        this.storage.get('lang').then(function (lang) {
            _this.language = lang;
            if (_this.language == 'english') {
                _this.titles = _this.english;
            }
            else {
                _this.titles = _this.punjabi;
            }
            console.log(_this.titles);
        });
        this.fbtype = this.navParams.get('type');
        this.fbName = this.navParams.get('name');
        this.fbuid = this.navParams.get('usrid');
        if (this.fbtype) {
            this.http.get(this.apiurl + "fblogin?fbusername=" + this.fbName + '&fbuserid=' + this.fbuid + '&type=' + this.fbtype).map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.fbresponse = data;
                _this.storage.set('Uid', _this.fbresponse.id);
                _this.storage.set('username', _this.fbresponse.fbusername);
                _this.storage.set('facebooktype', _this.fbresponse.type);
            });
        }
        this.storage.get('Uid').then(function (Uid) {
            _this.UserId = Uid;
            _this.storage.get('token_id').then(function (token_id) {
                _this.tokenid = token_id;
                _this.http.get(_this.apiurl + "saveToken?user_id=" + _this.UserId + '&token=' + _this.tokenid).map(function (res) { return res.json(); }).subscribe(function (data) {
                    _this.tokenRec = data;
                });
            });
        });
    }
    HomePage.prototype.comp = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__complaint_complaint__["a" /* Complaint */]);
    };
    HomePage.prototype.sugges = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__suggestion_suggestion__["a" /* Suggestion */]);
    };
    HomePage.prototype.gallery = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__gallery_gallery__["a" /* Gallery */]);
    };
    HomePage.prototype.compinfo = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__complaint_info_complaint_info__["a" /* ComplaintInfo */]);
    };
    HomePage.prototype.constituent = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__constituency_constituency__["a" /* Constituency */]);
    };
    HomePage.prototype.about = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__about_us_about_us__["a" /* AboutUs */]);
    };
    HomePage.prototype.view_sugg = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__view_suggestion_view_suggestion__["a" /* ViewSuggestion */]);
    };
    HomePage.prototype.setting = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__setting_setting__["a" /* Setting */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar hideBackbutton="true">\n    <ion-title> {{titles.title}} {{titles.lastname}}<ion-icon md="ios-settings" (click)="setting()" style="float:right;"></ion-icon></ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content style="background-image: url(img/gurudwara.jpg); background-size: cover;">\n<ion-grid class="first-row">  \n  <ion-row (click)="about()">\n    <ion-col col-7 class="col-one">\n      <p>{{titles.title}}<br/>{{titles.lastname}}</p>\n      <p class="p2">{{titles.Designation}}</p>\n    </ion-col>\n    <ion-col col-5 class="col-second">\n      <img src="img/photo.jpg"/>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n\n<ion-grid class="row-second">  \n  <ion-row >\n    <ion-col class="col-two" (click)="comp()">\n      <img src="img/p1.png"/>\n        <p>{{titles.complaint}} </p>\n    </ion-col>\n    <ion-col  class="padding-none ">\n    <ion-row class="right-sidetop" (click)="compinfo()">\n      <img src="img/p2.png"/><br/>\n        <p>{{titles.view}}<br/>{{titles.comp}}</p>\n    </ion-row>\n      <ion-row class="right-side" (click)="sugges()">\n        <img src="img/p3.png"/><br/>\n        <p>{{titles.sugges}}</p>\n      </ion-row>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n\n<ion-grid class="last-grid" >  \n  <ion-row>\n    <ion-col col-7 class="third-col"  (click)="view_sugg()">\n      <ion-row><img src="img/p1.png"/><p>{{titles.viewsug}}</p></ion-row>\n    </ion-col>\n    <ion-col  col-5 class="fourth-col" (click)="gallery()">\n      <ion-row>\n          <img src="img/p5.png"/><p>{{titles.gallery}}</p>\n        </ion-row>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n\n<ion-row class="last-div" (click)="constituent()">\n<img src="img/p6.png"/><p>{{titles.constituency}}</p>\n</ion-row>\n<!-- <ion-row class="first-row">\n  <button ion-button small><img src="img/Complaint_icon.png" (click)="comp()"/><p class="text">Complaint</p></button>\n  <button ion-button small><img src="img/viewcomplaint.png" (click)="compinfo()"/><p class="text">View Complaints</p></button>\n</ion-row>\n<ion-row class="">\n  <button ion-button small><img src="img/suggestion.png" (click)="sugges()"/><p class="text">Suggestion</p></button>\n  <button ion-button small><img src="img/gallery.png" (click)="gallery()"/><p class="text">Gallery</p></button>\n</ion-row>\n<ion-row class="">\n  <button ion-button small><img src="img/Faq.png" /><p class="text">FAQ</p></button>\n  <button ion-button small><img src="img/constitution.png" /><p class="text">Constituency</p></button>\n</ion-row> -->\n</ion-content>\n'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup_signup__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_storage__ = __webpack_require__(219);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var Login = (function () {
    function Login(navCtrl, fb, loadingCtrl, alertCtrl, nativeStorage, storage, navParams, http, toast) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.nativeStorage = nativeStorage;
        this.storage = storage;
        this.navParams = navParams;
        this.http = http;
        this.toast = toast;
        this.FB_APP_ID = 1323177091144812;
        this.titles = [];
        this.english = [];
        this.punjabi = [];
        this.data = [];
        this.apiurl = "http://isp.mediaoncloud.com/MLA/";
        this.data.mobile = '';
        this.data.pass = '';
        this.fb.browserInit(this.FB_APP_ID, "v2.8");
        this.english = { mob: 'Mobile', submit: 'Submit' };
        this.punjabi = { mob: 'ਮੋਬਾਈਲ', submit: 'ਜਮ੍ਹਾਂ ਕਰੋ' };
        this.storage.get('lang').then(function (lang) {
            _this.language = lang;
            if (_this.language == 'english') {
                _this.titles = _this.english;
            }
            else {
                _this.titles = _this.punjabi;
            }
            console.log(_this.titles);
        });
    }
    Login.prototype.submit = function (mobile) {
        var _this = this;
        this.storage.set('otp', '');
        this.y = Math.floor((Math.random() * 10000) + 100);
        this.http.get('https://2factor.in/API/V1/882ceda6-9df5-11e7-94da-0200cd936042/SMS/' + mobile + '/' + this.y).map(function (res) { return res.json(); }).subscribe(function (data) {
            if (data.Status == 'Success') {
                _this.storage.set('otp', _this.y);
            }
            _this.storage.get('otp').then(function (otp) {
                _this.userOtp = otp;
                var alertpopup = _this.alertCtrl.create({
                    title: 'Enter Your OTP',
                    cssClass: 'abtn',
                    inputs: [
                        {
                            name: 'otp',
                            placeholder: 'OTP',
                            value: _this.otpmsg
                        }
                    ],
                    buttons: [
                        {
                            text: 'Submit',
                            handler: function (data) {
                                if (_this.userOtp == data.otp) {
                                    _this.http.get(_this.apiurl + "login?phone=" + mobile).map(function (res) { return res.json(); }).subscribe(function (data) {
                                        _this.loginData = data;
                                        _this.loginphone = data.phone;
                                        _this.storage.set('Uid', _this.loginData.id);
                                        _this.storage.set('ph_no', _this.loginphone);
                                        if (_this.loginData.status != 'Failed') {
                                            //alert("You are logged in successfully");  
                                            _this.toast.show("You are logged in successfully", 'long', 'center').subscribe(function (toast) {
                                                console.log(toast);
                                            });
                                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                                            //loadingPopup.dismiss();  
                                        }
                                        else {
                                            //alert("Invalid Details");
                                            _this.toast.show("Invalid Details", 'long', 'center').subscribe(function (toast) {
                                            });
                                        }
                                    });
                                }
                                else {
                                    //alert("Your OTP not matched. Fill it again");
                                    _this.toast.show("Your OTP not matched. Fill it again", 'long', 'center').subscribe(function (toast) {
                                        console.log(toast);
                                    });
                                }
                            }
                        }
                    ]
                });
                alertpopup.present();
            });
        });
    };
    Login.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__signup_signup__["a" /* Signup */]);
    };
    Login.prototype.fblogin = function () {
        var permissions = new Array();
        var nav = this.navCtrl;
        var env = this;
        //the permissions your facebook app needs from the user
        permissions = ["public_profile"];
        this.fb.login(permissions)
            .then(function (response) {
            var userId = response.authResponse.userID;
            var params = new Array();
            //Getting name and gender properties
            env.fb.api("/me?fields=name,gender", params)
                .then(function (user) {
                user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                //now we have the users info, let's save it in the NativeStorage
                env.nativeStorage.setItem('user', {
                    name: user.name,
                    gender: user.gender,
                    picture: user.picture,
                    usrid: userId
                })
                    .then(function () {
                    nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */], {
                        type: 'facebook',
                        name: user.name,
                        picture: user.picture,
                        email: user.email,
                        usrid: userId
                    });
                }, function (error) {
                    console.log(error);
                });
            });
        }, function (error) {
            console.log(error);
        });
    };
    return Login;
}());
Login = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\login\login.html"*/'<ion-header>\n  <!-- <ion-navbar>\n    <ion-title>login</ion-title>\n  </ion-navbar> -->\n</ion-header>\n\n<ion-content padding style="background-image: url(img/back.png); background-size: cover;">\n  <ion-row class="logo-margin"><img src ="img/mla.png" class="image" /></ion-row>\n  <ion-item class="item-color">\n  <ion-input type="tel" maxlength="10" [(ngModel)]="data.mobile" name="data.mobile" placeholder="{{titles.mob}}"></ion-input>\n  </ion-item>\n  <!-- <ion-item class="item-color">\n      <ion-input type="password" maxlength="10" [(ngModel)]="data.pass" name="data.pass" placeholder="Password"></ion-input>\n    </ion-item> -->\n  <button ion-button round outline block type="submit" class="button-submit" (click)="submit(data.mobile)">{{titles.submit}}</button>\n  <!-- <ion-row class="not-member" (click)="signup()"><span>Not a Member <a>Signup? </a> </span></ion-row> -->\n  \n  <ion-row class="member">\n    <img src="img/f.png" (click)="fblogin()"/>\n  </ion-row>\n</ion-content>'/*ion-inline-end:"C:\Users\mediaoncloud\Desktop\MLAapp\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_storage__["a" /* NativeStorage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_storage__["a" /* NativeStorage */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__["a" /* Toast */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__["a" /* Toast */]) === "function" && _j || Object])
], Login);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=login.js.map

/***/ })

},[223]);
//# sourceMappingURL=main.js.map
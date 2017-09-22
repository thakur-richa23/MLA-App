import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LangSetting } from './lang-setting';

@NgModule({
  declarations: [
    LangSetting,
  ],
  imports: [
    IonicPageModule.forChild(LangSetting),
  ],
})
export class LangSettingModule {}

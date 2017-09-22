import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePhone } from './change-phone';

@NgModule({
  declarations: [
    ChangePhone,
  ],
  imports: [
    IonicPageModule.forChild(ChangePhone),
  ],
})
export class ChangePhoneModule {}

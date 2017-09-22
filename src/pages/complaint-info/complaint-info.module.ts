import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplaintInfo } from './complaint-info';

@NgModule({
  declarations: [
    ComplaintInfo,
  ],
  imports: [
    IonicPageModule.forChild(ComplaintInfo),
  ],
})
export class ComplaintInfoModule {}

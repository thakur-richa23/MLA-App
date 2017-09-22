import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplaintRef } from './complaint-ref';

@NgModule({
  declarations: [
    ComplaintRef,
  ],
  imports: [
    IonicPageModule.forChild(ComplaintRef),
  ],
})
export class ComplaintRefModule {}

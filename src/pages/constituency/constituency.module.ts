import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Constituency } from './constituency';

@NgModule({
  declarations: [
    Constituency,
  ],
  imports: [
    IonicPageModule.forChild(Constituency),
  ],
})
export class ConstituencyModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Gallery } from './gallery';

@NgModule({
  declarations: [
    Gallery,
  ],
  imports: [
    IonicPageModule.forChild(Gallery),
  ],
})
export class GalleryModule {}

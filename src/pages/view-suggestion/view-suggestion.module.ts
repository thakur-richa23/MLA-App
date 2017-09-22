import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewSuggestion } from './view-suggestion';

@NgModule({
  declarations: [
    ViewSuggestion,
  ],
  imports: [
    IonicPageModule.forChild(ViewSuggestion),
  ],
})
export class ViewSuggestionModule {}

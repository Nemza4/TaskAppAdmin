import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalReviewPage } from './personal-review';

@NgModule({
  declarations: [
    PersonalReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalReviewPage),
  ],
})
export class PersonalReviewPageModule {}

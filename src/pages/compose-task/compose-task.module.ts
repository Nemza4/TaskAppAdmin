import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComposeTaskPage } from './compose-task';

@NgModule({
  declarations: [
    ComposeTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(ComposeTaskPage),
  ],
})
export class ComposeTaskPageModule {}

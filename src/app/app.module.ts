import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SwService } from './common/services/sw-service.service';
import { PushNotificationsService } from './common/services/notification.service';
import { ConfirmationDialogForUpdateAskComponent } from './confirmation-dialog-for-ask-update/confirmation-dialog-for-upate.component';
import { MatDialogModule , MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,  ConfirmationDialogForUpdateAskComponent
  ],
  entryComponents : [ConfirmationDialogForUpdateAskComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatDialogModule , MatButtonModule
  ],
  providers: [ SwService , PushNotificationsService ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

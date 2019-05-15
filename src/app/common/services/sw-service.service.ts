import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { PushNotificationsService } from './notification.service';
import { ConfirmationDialogForUpdateAskComponent } from '../../confirmation-dialog-for-ask-update/confirmation-dialog-for-upate.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SwService {

  dialogRef: any;
  constructor( updates: SwUpdate , notifService: PushNotificationsService , public dialog: MatDialog,  ) {

    if (updates.isEnabled) {

      updates.available.subscribe(event => {
        console.log('current version is', event.current);
        console.log('available version is', event.available);
        // if( notifService.isSupported() ){
        //   notifService.notify( 'Alert' , 'Newer version is available !' );
        // }
        const that = this;
        setTimeout(() => {
          that.dialogRef = that.dialog.open(ConfirmationDialogForUpdateAskComponent);
          that.dialogRef.afterClosed().subscribe((allowUpdate: boolean) => {
            if (allowUpdate) {
              console.log('Allowed Update');
              updates.activateUpdate().then(() => document.location.reload());
            }
          });
        }, 1500);

      });
      updates.activated.subscribe(event => {
        console.log('old version was', event.previous);
        console.log('new version is', event.current);
      });
    }
  }
}

import { Component , OnInit } from '@angular/core';

import { PushNotificationsService } from './services/notification.service';
import { SwService } from './services/sw-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'poc-app';
  constructor(
      public pushNotificationsService: PushNotificationsService ,
      public update: SwService
  ) {
    // Request for notification permission
    pushNotificationsService.requestPermission();
  }

  ngOnInit(): void {
    this.checkNetwork();
  }

  checkNetwork(): void {
    setInterval(() => this.checkOnline() , 10000);
  }

  checkOnline(): void {
    let unpublishedNotifs = [];
    const updatedNotifs = [];
    const adminUser = localStorage.getItem('pocLoggedUser');
    if ( navigator.onLine && adminUser !== undefined && adminUser != null && adminUser !== '' ) {
      if ( adminUser === 'admin' ) {
        unpublishedNotifs = this.pushNotificationsService.getNotificationList();
        if ( unpublishedNotifs.length > 0 ) {
          for ( const ele of unpublishedNotifs ) {
            console.log('Notifications Available');
            this.pushNotificationsService.notify( ele.title , ele.content );
            ele.updateFlag = 1;
            updatedNotifs.push(ele);
            localStorage.setItem('notifications', JSON.stringify(updatedNotifs)) ;
          }
        }
      }
    }
  }


}

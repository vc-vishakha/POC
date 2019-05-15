// FOR BROWSER NOTIFICATIONS
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class PushNotificationsService {
  public permission: Permission;
  constructor() {
      this.permission = this.isSupported() ? 'default' : 'denied';
  }
  public isSupported(): boolean {
      return 'Notification' in window;
  }
  requestPermission(): void {
      const self = this;
      if ('Notification' in window) {
          Notification.requestPermission((status) => {
              return self.permission = status;
          });
      }
      //   let notify = this.notify('Checking Notifications','Done !!!');
      setTimeout(() => {
        if (self.permission === 'granted') {
            // notify;
            console.log('Permission ' + self.permission);
        } else {
            console.log('Permission ' + self.permission);
        }
      }, 500);

  }
  create(title: string, options ?: PushNotification): any {
      const self = this;
      return new Observable((obs) => {
          if (!('Notification' in window)) {
              console.log('Notifications are not available in this environment');
              obs.complete();
          }
          if (self.permission !== 'granted') {
              console.log('The user hasn\'t granted you permission to send push notifications');
              obs.complete();
          }
          const _notify = new Notification(title, options);
          _notify.onshow = (e) => {
              return obs.next({
                  notification: _notify,
                  event: e
              });
          };
          _notify.onclick = (e) => {
              window.open(`${environment.baseUrl}users`);
              return obs.next({
                  notification: _notify,
                  event: e
              });
          };
          _notify.onerror = (e) => {
              return obs.error({
                  notification: _notify,
                  event: e
              });
          };
          _notify.onclose = () => {
              return obs.complete();
          };
      });
  }
  generateNotification(source: Array < any > ): void {
      const self = this;
      source.forEach((item) => {
          const options = {
              body: item.alertContent,
              icon: '../assets/icons/icon-72x72.png',
          };
          const notify = self.create(item.title, options).subscribe();
      });
  }

  notify( title: string , alertContent: any ): void {
    const data: Array <any> = [];
    data.push({ title, alertContent });
    this.generateNotification(data);
  }
    // GET NOTIFICATIONS WHICH ARE NOT SHOWN YET
  getNotificationList() {
      let notifData = []; let unpublishedRecords = [];
      if ( localStorage.getItem('notifications') !== undefined && localStorage.getItem('notifications') !== null ) {
          notifData = JSON.parse(localStorage.getItem('notifications'));
          unpublishedRecords = [];
          notifData.forEach(( record , index ) => {
            if ( record.updateFlag === 0 || record.updateFlag === '0' ) {
                unpublishedRecords.push(record);
            }
          });
      }
      localStorage.setItem('notifications', JSON.stringify(unpublishedRecords)) ;

      return unpublishedRecords;
  }
}

export declare type Permission = 'denied' | 'granted' | 'default';
export interface PushNotification {
  body ?: string;
  icon ?: string;
  tag ?: string;
  data ?: any;
  renotify ?: boolean;
  silent ?: boolean;
  sound ?: string;
  noscreen ?: boolean;
  sticky ?: boolean;
  dir ?: 'auto' | 'ltr' | 'rtl';
  lang ?: string;
  vibrate ?: number[];
}

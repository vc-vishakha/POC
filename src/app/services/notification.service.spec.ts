import { TestBed } from '@angular/core/testing';

import { PushNotificationsService } from './notification.service';

describe('PushNotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PushNotificationsService = TestBed.get(PushNotificationsService);
    expect(service).toBeTruthy();
  });
});

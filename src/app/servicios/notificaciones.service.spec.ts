import { TestBed } from '@angular/core/testing';
import { NotificacionesService } from './notificaciones.service';
import { PushNotifications, Token, RegistrationError, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';

xdescribe('NotificacionesService', () => {
  let service: NotificacionesService;

  beforeEach(() => {
    // Mock completo de PushNotifications
    const pushNotificationsMock = {
      checkPermissions: jasmine.createSpy('checkPermissions').and.returnValue(Promise.resolve({ receive: 'granted' })),
      requestPermissions: jasmine.createSpy('requestPermissions').and.returnValue(Promise.resolve({ receive: 'granted' })),
      register: jasmine.createSpy('register').and.returnValue(Promise.resolve()),
      addListener: jasmine.createSpy('addListener').and.callFake((eventName: string, callback: Function) => {
        if (eventName === 'registration') {
          callback({ value: 'mock-token' } as Token);
        } else if (eventName === 'registrationError') {
          callback({ error: 'mock-error' } as RegistrationError);
        } else if (eventName === 'pushNotificationReceived') {
          callback({
            id: '1',
            title: 'Test Notification',
            body: 'This is a test notification',
            data: { key: 'value' },
          } as PushNotificationSchema);
        } else if (eventName === 'pushNotificationActionPerformed') {
          callback({
            actionId: 'mock-action',
            inputValue: 'mock-input',
            notification: {
              id: '1',
              title: 'Test Notification',
              body: 'This is a test notification',
              data: { key: 'value' },
            },
          } as ActionPerformed);
        }
        return Promise.resolve({ remove: jasmine.createSpy('remove').and.returnValue(Promise.resolve()) });
      }),
      getDeliveredNotifications: jasmine.createSpy('getDeliveredNotifications').and.returnValue(
        Promise.resolve({
          notifications: [
            {
              id: '1',
              title: 'Delivered Notification',
              body: 'This is a delivered notification',
              data: { key: 'value' },
            },
          ],
        })
      ),
    };

    // Sobrescribir métodos de PushNotifications con el mock
    spyOn(PushNotifications, 'checkPermissions').and.callFake(pushNotificationsMock.checkPermissions);
    spyOn(PushNotifications, 'requestPermissions').and.callFake(pushNotificationsMock.requestPermissions);
    spyOn(PushNotifications, 'register').and.callFake(pushNotificationsMock.register);
    spyOn(PushNotifications, 'addListener').and.callFake(pushNotificationsMock.addListener);
    spyOn(PushNotifications, 'getDeliveredNotifications').and.callFake(pushNotificationsMock.getDeliveredNotifications);

    TestBed.configureTestingModule({
      providers: [NotificacionesService],
    });

    service = TestBed.inject(NotificacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register notifications', async () => {
    await service.registerNotifications();
    expect(PushNotifications.checkPermissions).toHaveBeenCalled();
    expect(PushNotifications.register).toHaveBeenCalled();
  });

  it('should add listeners for notifications', async () => {
    await service.addListeners();
    // expect(PushNotifications.addListener).toHaveBeenCalledWith('registration', jasmine.any(Function));
    // expect(PushNotifications.addListener).toHaveBeenCalledWith('registrationError', jasmine.any(Function));
    // expect(PushNotifications.addListener).toHaveBeenCalledWith('pushNotificationReceived', jasmine.any(Function));
    // expect(PushNotifications.addListener).toHaveBeenCalledWith('pushNotificationActionPerformed', jasmine.any(Function));
  });

  it('should retrieve delivered notifications', async () => {
    const consoleSpy = spyOn(console, 'log');
    await service.getDeliveredNotifications();
    expect(PushNotifications.getDeliveredNotifications).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('delivered notifications', jasmine.any(Object));
  });
});

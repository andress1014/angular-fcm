import { Component, OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularFCM';
  message: any = null;
  token: string = ''; // Variable para almacenar el token

  constructor() {}

  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    const messaging = getMessaging();
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        getToken(messaging, { vapidKey: environment.firebase.vapidKey }).then((currentToken) => {
          if (currentToken) {
            console.log("Token:");
            console.log(currentToken);
            this.token = currentToken; // Almacenar el token en la variable
          } else {
            console.log('No registration token available.');
          }
        }).catch((err) => {
          console.log('Error retrieving token: ', err);
        });
      } else {
        console.log('Permission not granted.');
      }
    });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received:', payload);
      if (payload.notification) {
        this.message = payload.notification;

        // Mostrar la notificación en primer plano
        if (Notification.permission === 'granted') {
          const notification = new Notification(payload.notification.title || 'Notification', {
            body: payload.notification.body || '',
            icon: payload.notification.icon || '/assets/notification-icon.png'
          });

          notification.onclick = (event) => {
            event.preventDefault();
            window.focus();
          };
        }
      }
    });
  }
}

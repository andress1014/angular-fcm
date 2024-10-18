importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

// Configura Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDDuRHmLHRoS9qj6ASuF4ist7d4jeo_gPI",
  authDomain: "test-notification-b5dcd.firebaseapp.com",
  projectId: "test-notification-b5dcd",
  storageBucket: "test-notification-b5dcd.appspot.com",
  messagingSenderId: "406175610872",
  appId: "1:406175610872:web:475d93482f6f770dc1480d",
  measurementId: "G-C5NJQV7934"
});

// Inicializa la mensajería
const messaging = firebase.messaging();

// Maneja notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Recibido en segundo plano:', payload);

  const notificationTitle = payload.notification.title || "Título del mensaje";
  const notificationOptions = {
    body: payload.notification.body || "Cuerpo del mensaje",
    icon: payload.notification.icon || "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
  new Notification(notificationTitle, notificationOptions);
});

/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

declare const self: ServiceWorkerGlobalScope;

// Service Worker for handling notifications
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  const { type } = event.data;

  if (type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification('Healthcare Platform Alert', {
      body: '✅ Patient appointment scheduled successfully',
      badge: '🏥',
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="75" font-size="75">🏥</text></svg>',
      tag: 'healthcare-notification',
      requireInteraction: false,
      actions: [
        { action: 'open', title: 'Open', icon: '👁️' },
        { action: 'close', title: 'Close', icon: '✕' },
      ],
      data: {
        url: '/dashboard',
        timestamp: new Date().toISOString(),
      },
    });
  }
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const action = event.action;

  if (action === 'close' || !action) {
    notification.close();
  } else if (action === 'open') {
    event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then((clients) => {
        // Check if there's already a window open with the dashboard
        for (const client of clients) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        // If not, open a new window
        if (self.clients.openWindow) {
          return self.clients.openWindow('/dashboard');
        }
      })
    );
  }

  notification.close();
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed', event.notification.tag);
});

// Periodic sync for background updates (if needed)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-appointments') {
    event.waitUntil(
      fetch('/api/appointments')
        .then((response) => response.json())
        .then((data) => {
          if (data.newAppointments && data.newAppointments.length > 0) {
            return self.registration.showNotification('New Appointments Available', {
              body: `You have ${data.newAppointments.length} new appointment(s)`,
              badge: '🏥',
              icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="75" font-size="75">🏥</text></svg>',
              tag: 'sync-notification',
              data: {
                url: '/patients',
              },
            });
          }
        })
        .catch((error) => {
          console.error('Sync failed:', error);
        })
    );
  }
});

// Push event handler for Web Push Notifications
self.addEventListener('push', (event) => {
  let notificationData = {
    title: 'Healthcare Platform',
    body: 'You have a new notification',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="75" font-size="75">🏥</text></svg>',
    badge: '🏥',
  };

  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title || 'Healthcare Platform', {
      body: notificationData.body || 'You have a new notification',
      icon: notificationData.icon,
      badge: notificationData.badge,
      tag: 'push-notification',
      data: notificationData.data || { url: '/dashboard' },
    })
  );
});

console.log('Service Worker loaded');

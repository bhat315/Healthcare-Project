import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Use Vite environment variables (VITE_*) for config so secrets aren't checked into git.
// Create a `.env.local` with the VITE_FIREBASE_* values and restart the dev server.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoKey123456789',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'healthcare-saas.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'healthcare-saas',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'healthcare-saas.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abc123def456',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Log config so we can debug auth/configuration-not-found errors in the browser
if (typeof window !== 'undefined') {
  // show only non-sensitive keys in logs to avoid leaking secrets to shared screenshots
  console.log('FIREBASE CONFIG', {
    apiKey: firebaseConfig.apiKey ? 'SET' : 'MISSING',
    authDomain: firebaseConfig.authDomain || 'MISSING',
    projectId: firebaseConfig.projectId || 'MISSING',
  });
}

// Initialize Analytics only in the browser and when measurement ID is provided
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined' && import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    // ignore analytics init errors in non-supported environments
    analytics = null;
  }
}

// Initialize Firebase Authentication with safer error logging
let _auth: ReturnType<typeof getAuth> | null = null;
try {
  _auth = getAuth(app);
} catch (e) {
  // Detailed console error to help track configuration issues during sign-up
  if (typeof window !== 'undefined') console.error('Failed to initialize Firebase Auth', e);
  throw e;
}

export const auth = _auth;

export default app;

export { analytics };



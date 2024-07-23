// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA1JMkftHUk3kfnUbYgAOVXJO4d0PIWFuE",
  authDomain: "codescaleapp.firebaseapp.com",
  databaseURL: "https://codescaleapp-default-rtdb.firebaseio.com",
  projectId: "codescaleapp",
  storageBucket: "codescaleapp.appspot.com",
  messagingSenderId: "603401546961",
  appId: "1:603401546961:web:d2a197ca395a77422ca9f0",
  measurementId: "G-9B9Z7LK411"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export default app;

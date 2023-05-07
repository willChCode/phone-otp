// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAUZN7k5GzxM8JJyEsA-CGiwHdud70_3gE',
  authDomain: 'otp-react-20097.firebaseapp.com',
  projectId: 'otp-react-20097',
  storageBucket: 'otp-react-20097.appspot.com',
  messagingSenderId: '34726097578',
  appId: '1:34726097578:web:f5292973f79e3b36df96d3',
  measurementId: 'G-HE63LJ2KSK'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

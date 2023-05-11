import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBLNObPLIjfLMMt1Q2gdU-hgnPGK6sAe8s",
  authDomain: "programmers-chat.firebaseapp.com",
  projectId: "programmers-chat",
  storageBucket: "programmers-chat.appspot.com",
  messagingSenderId: "392961211942",
  appId: "1:392961211942:web:769664db498287984cb0e7"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
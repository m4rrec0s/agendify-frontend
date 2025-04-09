import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfELjK-bWMEoL1cC3syiitZ57gCBww5Fw",
  authDomain: "agendify-b24f0.firebaseapp.com",
  databaseURL: "https://agendify-b24f0-default-rtdb.firebaseio.com",
  projectId: "agendify-b24f0",
  storageBucket: "agendify-b24f0.firebasestorage.app",
  messagingSenderId: "617842457653",
  appId: "1:617842457653:web:2f4d6b0ab17ba16106c57c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBUiq_DpSo1ri5yNqlirZluIZWz3oRiS58",
    authDomain: "elitemart-c7826.firebaseapp.com",
    projectId: "elitemart-c7826",
    storageBucket: "elitemart-c7826.firebasestorage.app",
    messagingSenderId: "656968759126",
    appId: "1:656968759126:web:5e28dc1d3ebd3feba8c8f7",
    databaseURL: "https://elitemart-c7826-default-rtdb.firebaseio.com"

};


export const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChM5rFEheyaHnecraQXnuRt6xmPx3duNE",
    authDomain: "mern-book-store-9b8dc.firebaseapp.com",
    projectId: "mern-book-store-9b8dc",
    storageBucket: "mern-book-store-9b8dc.firebasestorage.app",
    messagingSenderId: "423119621133",
    appId: "1:423119621133:web:1d055b4a94cd2888d41944",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
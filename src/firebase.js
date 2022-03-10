import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtrD0Ql8abHPXtGlaKdOkk0z9AphjfLfA",
  authDomain: "contact-6d82f.firebaseapp.com",
  projectId: "contact-6d82f",
  storageBucket: "contact-6d82f.appspot.com",
  messagingSenderId: "547146338438",
  appId: "1:547146338438:web:317b1bca4b574535940107"
};

 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

 
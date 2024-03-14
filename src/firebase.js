import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCMivqQXMZa_J_oZdxHnzaW8EQrLa09qSw",
    authDomain: "salaryapp-aca78.firebaseapp.com",
    databaseURL: "https://salaryapp-aca78-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "salaryapp-aca78",
    storageBucket: "salaryapp-aca78.appspot.com",
    messagingSenderId: "993302317562",
    appId: "1:993302317562:web:7233a6560e361b6825fc43"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);



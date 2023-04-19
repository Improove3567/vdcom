import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyAq6-bYanexbBsiq4E21PJVSxCJuptq-vo",
    authDomain: "vdcom-f8d23.firebaseapp.com",
    projectId: "vdcom-f8d23",
    storageBucket: "vdcom-f8d23.appspot.com",
    messagingSenderId: "1050873962331",
    appId: "1:1050873962331:web:fcca29727475f3e877047e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)


export const login = async (e, p) => {
    await signInWithEmailAndPassword(auth, e, p)
};
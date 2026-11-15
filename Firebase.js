
//Firebase stuff
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import { getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc, query, where }
    from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCx7AyRXmxz8Lp0w-c4Be-Z7NH6_2sg9oQ",
    authDomain: "mec-2026.firebaseapp.com",
    projectId: "mec-2026",
    storageBucket: "mec-2026.firebasestorage.app",
    messagingSenderId: "753030222688",
    appId: "1:753030222688:web:a0d3f396d04d294632c405",
    measurementId: "G-PGNC7J7TDQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
window.auth = auth; //ts is global
const db = getFirestore(app);
let EmailSignedInAs = null;

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged };

// end o firbase stuff

// write() :: Big Obj , (Email) -> DB 
window.write = async (obj) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not signed in");
    const email = (user.email).toLowerCase();
    await setDoc(doc(db, "userData", email), obj, { merge: true });
};

// read() :: (Db), Email -> Big Obj
window.read = async (email) => {
    const kidnap = await getDoc(doc(db, "userData", email.toLowerCase()));
    return (kidnap.exists() == true) ? kidnap.data() : null;
};


// upload() :: [img], (Email) -> DB
window.upload = async (files) => {
    for (const file of files) {
        const data = await new Promise(resolved => {
            const r = new FileReader();
            r.onload = () => resolved(r.result);
            r.readAsDataURL(file);
        });
        await addDoc(collection(db, "images"), { email: auth.currentUser.email, data });
    }
};

// download() :: DB, (Email) -> [img]
window.download = async (email) => {
    const snap = await getDocs(query(collection(db, "images"), where("email", "==", email)));
    snap.docs.forEach((d, i) => {
        const a = document.createElement("a");
        a.href = d.data().data;
        a.download = "image" + i;
        a.click();
    });
};




/*
=========================
example write and read
=========================
await write({ Hope: "Please work" });
const data = await read("someone@example.com");
*/
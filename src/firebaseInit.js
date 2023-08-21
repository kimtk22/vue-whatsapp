import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvtZDWs7C7L3o7-a7C3-Vc0575MnyngKg",
  authDomain: "whatsapp-clone-7fd76.firebaseapp.com",
  projectId: "whatsapp-clone-7fd76",
  storageBucket: "whatsapp-clone-7fd76.appspot.com",
  messagingSenderId: "648442516471",
  appId: "1:648442516471:web:06cd9c01a0580f9cf214f2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

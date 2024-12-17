import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBp58k8s0nNmnVQyX8uFky8HQHOp0ekT8c",
    authDomain: "dbforbeyondmess.firebaseapp.com",
    databaseURL: "https://dbforbeyondmess-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dbforbeyondmess",
    storageBucket: "dbforbeyondmess.appspot.com",
    messagingSenderId: "494636801650",
    appId: "1:494636801650:web:037b292d635df7ba0a6ceb",
    measurementId: "G-ZHHSJ8TEY3"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };

const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// Your Firebase configuration
const firebaseConfig = {
  
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Export the db for use in other files
module.exports = { db };

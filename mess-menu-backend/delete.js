const { initializeApp } = require('firebase/app');
const { getFirestore, collection, query, where, getDocs, deleteDoc, doc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
   
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const deleteLowCalorieItems = async () => {
  try {
    // Query all items with calories less than 10
    const foodItemsCollection = collection(db, 'FoodItem');
    const q = query(foodItemsCollection, where('calories', '<', 10));
    const querySnapshot = await getDocs(q);

    // Loop through each document and delete it
    querySnapshot.forEach(async (document) => {
      const docRef = doc(db, 'FoodItem', document.id); // Get document reference
      await deleteDoc(docRef);  // Delete the document
      console.log(`Deleted item: ${document.id} with calories less than 10`);
    });

    console.log('Successfully deleted all items with calories less than 10');
  } catch (error) {
    console.error('Error deleting items:', error.message);
  }
};

// Call the function
deleteLowCalorieItems();

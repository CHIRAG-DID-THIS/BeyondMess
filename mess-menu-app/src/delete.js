import { query, collection, where, getDocs, deleteDoc, doc } from './firestore';
import { db } from './firebase';  // Ensure you have your Firebase config imported

const deleteLowCalorieEntries = async () => {
  try {
    // Query to find all items with calorie value of 1
    const foodItemsCollection = collection(db, 'FoodItem');
    const q = query(foodItemsCollection, where('calories', '==', 1));
    const querySnapshot = await getDocs(q);

    // Loop through each matching document and delete it
    querySnapshot.forEach(async (document) => {
      const docRef = doc(db, 'FoodItem', document.id); // Get the document reference
      await deleteDoc(docRef);  // Delete the document
      console.log(`Deleted entry: ${document.id} with calorie 1`);
    });

    console.log('Successfully deleted all entries with calorie value 1');
  } catch (error) {
    console.error('Error deleting entries:', error.message);
  }
};

// Call the function when needed
deleteLowCalorieEntries();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, getDoc, setDoc, doc, query, where } = require('firebase/firestore');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Firebase configuration
const firebaseConfig = {
    
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// API to fetch menu based on hostel and mess type and date
app.post('/api/menu', async (req, res) => {
  const { hostelType, messType, date } = req.body;
  
  try {
    const q = query(
      collection(db, 'Menu'),
      where('hostelType', '==', hostelType),
      where('messType', '==', messType),
      where('date', '==', date)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: 'Menu not found for this day' });
    }

    let menuData = {};
    querySnapshot.forEach(doc => {
      menuData = doc.data();
    });

    res.json(menuData);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// API to fetch calories for food items
app.post('/api/calories', async (req, res) => {
  const { items } = req.body;

  try {
    const foodItemsCollection = collection(db, 'FoodItems');
    const q = query(foodItemsCollection, where('name', 'in', items));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: 'No food items found' });
    }

    const foodItems = [];
    querySnapshot.forEach(doc => {
      foodItems.push(doc.data());
    });

    res.json(foodItems);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

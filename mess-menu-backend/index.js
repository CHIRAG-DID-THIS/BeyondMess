const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('') 
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message); // Print the specific error message
    console.error('Detailed Error:', err);
  });
// Define the Menu schema
const MenuSchema = new mongoose.Schema({
  hostelType: String,
  messType: String,
  date: String, // Format: 'YYYY-MM-DD'
  breakfast: String,
  lunch: String,
  snacks: String,
  dinner: String // Add dinner if it's part of your data
});

const Menu = mongoose.model('Menu', MenuSchema);

// Define the FoodItem schema
const FoodItemSchema = new mongoose.Schema({
  name: String,
  calories: Number
});

const FoodItem = mongoose.model('FoodItem', FoodItemSchema);

// API to fetch menu based on hostel and mess type and date
app.post('/api/menu', async (req, res) => {
  const { hostelType, messType, date } = req.body;
  try {
    const menu = await Menu.findOne({ hostelType, messType, date });
    if (!menu) return res.status(404).json({ message: 'Menu not found for this day' });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// API to fetch calories for menu items
app.post('/api/calories', async (req, res) => {
  const { items } = req.body;
  console.log('Received items:', items);

  // Ensure items are trimmed and lowercase
  const trimmedItems = items.map(item => item.trim());
  console.log('Received items:', trimmedItems);

  try {
    // Find items where name matches (case-insensitive, trimmed)
    const foodItems = await FoodItem.find({
        itemName: { 
        $in: trimmedItems 
      }
    }); 

    console.log('Found food items:', foodItems);

    if (!foodItems.length) {
      return res.status(404).json({ message: 'No food items found' });
    }

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

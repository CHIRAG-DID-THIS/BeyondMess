const mongoose = require('mongoose');

// Define the FoodItem schema
const FoodItemSchema = new mongoose.Schema({
  itemName: String,
  calories: Number
});

const FoodItem = mongoose.model('FoodItem', FoodItemSchema);

// Sample food items and calories
const foodItems = [
  { itemName: 'Paav Bhaji', calories: 250 },
  { itemName: 'Pongal', calories: 200 },
  { itemName: 'Vada', calories: 150 },
  { itemName: 'Sambar', calories: 70 },
  { itemName: 'Tea', calories: 30 },
  { itemName: 'Coffee', calories: 40 },
  { itemName: 'Phulka', calories: 100 },
  { itemName: 'Paneer Masala', calories: 220 },
  { itemName: 'Rice', calories: 200 },
  { itemName: 'Eggless Cake', calories: 120 },
  { itemName: 'Gulab Jamun', calories: 150 },
  { itemName: 'Curd', calories: 60 },
  { itemName: 'Butter Milk', calories: 50 },
  { itemName: 'Chutney', calories: 30 },
  { itemName: 'Fryums', calories: 120 },
  { itemName: 'Pineapple Basanthi', calories: 180 },
  { itemName: 'Chapathi', calories: 120 },
  { itemName: 'Veg Egg Schezwan Fried Rice', calories: 350 },
  { itemName: 'Bananas', calories: 105 },
  { itemName: 'Aloo Jeera', calories: 150 },
  { itemName: 'Mutter Fish Curry', calories: 300 },
  { itemName: 'Masala Papad', calories: 80 },
  { itemName: 'Rajma', calories: 230 },
  { itemName: 'Paneer Butter Masala', calories: 320 },
  { itemName: 'Butter Naan', calories: 260 },
  { itemName: 'Tomato Soup', calories: 90 },
  { itemName: 'Rasam', calories: 50 },
  { itemName: 'Mixed Veg', calories: 200 },
  { itemName: 'Mushroom Soup', calories: 120 },
  { itemName: 'Bhindi Masala', calories: 120 },
  { itemName: 'Dal Makhani', calories: 210 },
  { itemName: 'Fruits (Mixed)', calories: 50 },
  { itemName: 'Biryani', calories: 300 },
  { itemName: 'Chana Masala', calories: 250 },
  { itemName: 'Roti', calories: 110 },
  { itemName: 'Kheer', calories: 250 },
  { itemName: 'Sweet Corn Soup', calories: 90 },
  { itemName: 'Pulao', calories: 250 },
  { itemName: 'Curd Rice', calories: 180 },
  { itemName: 'Biryani (Veg)', calories: 300 },
  { itemName: 'Green Salad', calories: 15 },
  { itemName: 'Paneer Tikka', calories: 180 },
  { itemName: 'French Fries', calories: 300 },
  { itemName: 'Veg Puff', calories: 200 },
  { itemName: 'Fruit Salad', calories: 100 },
  { itemName: 'Dahi Puri', calories: 200 },
  { itemName: 'Onion Rings', calories: 250 },
  { itemName: 'Onion Pakoda', calories: 150 },
  { itemName: 'Croquettes', calories: 160 },
  { itemName: 'Ice Cream (Assorted)', calories: 220 },
  { itemName: 'Roti (Plain)', calories: 110 },
  { itemName: 'Aloo Fry', calories: 200 },
  { itemName: 'Mango Pulp', calories: 130 },
  { itemName: 'Lemon Rice', calories: 220 },
  { itemName: 'Biscuit', calories: 90 },
  { itemName: 'Mixed Veg Pakora', calories: 150 },
  { itemName: 'Veg Cutlet', calories: 200 },
  { itemName: 'Chapati', calories: 120 },
  { itemName: 'Poha', calories: 130 },
  { itemName: 'Rava Laddu', calories: 170 },
  { itemName: 'Masala Dosa', calories: 230 },
  { itemName: 'Plain Dosa', calories: 150 },
  { itemName: 'Idly', calories: 50 },
  { itemName: 'Gobi Manchurian', calories: 250 },
  { itemName: 'Dal Fry', calories: 180 },
  { itemName: 'Kofta', calories: 250 },
  { itemName: 'Roti Sabzi', calories: 180 },
  { itemName: 'Chole', calories: 300 },
  { itemName: 'Cornflakes', calories: 150 },
  { itemName: 'Egg Bhurji', calories: 250 },
  { itemName: 'French Toast', calories: 180 },
  { itemName: 'Omelette', calories: 160 },
  { itemName: 'Paneer', calories: 150 },
  { itemName: 'Boiled Eggs', calories: 80 },
  { itemName: 'Prawn Masala', calories: 300 },
  { itemName: 'Potato Curry', calories: 150 },
  { itemName: 'Pasta', calories: 350 },
  { itemName: 'Lassi', calories: 100 },
  { itemName: 'Samosa', calories: 150 },
  { itemName: 'Jalebi', calories: 120 }
  // Add more items as needed based on the menu
];


// Function to seed the data
const seedFoodItems = async () => {
  await mongoose.connect('mongodb://localhost:27017/messmenu', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await FoodItem.insertMany(foodItems);
    console.log('Food items seeded successfully');
  } catch (error) {
    console.error('Error seeding food items:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeding function
seedFoodItems();

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Define a menu schema
const MenuSchema = new mongoose.Schema({
  hostelType: String,
  messType: String,
  date: String,
  breakfast: String,
  lunch: String,
  snacks: String,
  dinner: String
});

const Menu = mongoose.model('Menu', MenuSchema);

// Define menu data for Men's Hostel Veg Mess, Special Mess, and Non-Veg Mess
const vegMessMenu = {
  "2024-10-01": {
    breakfast: "Idly, Vada, Sambar, Chutney, R. kichadi, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Thuvayal, Rice, Rasam, Lemon Rice, Thuvayal, Soya Chunks Masala",
    snacks: "Tea, Coffee, Milk, Dry Biscuits",
    dinner: "Chapathi, Dal Fry, White Rice, Sambar, Butter Milk, Bananas"
  },
  "2024-10-02": {
    breakfast: "Plain Masala Dosa (Thin), Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Chole Punjabi, White Rice, Sambar, Rasam, Curd, Fryums",
    snacks: "Tea, Coffee, Milk",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Butter Milk, Variety Rice, Banana"
  },
  "2024-10-03": {
    breakfast: "Aloo Paratha, Curd, Pickle, Pongal, Chutney, Sambar, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Rajma, White Rice, Sambar, Rasam, Curd, Fryums, Paneer Do Pyaza",
    snacks: "Raw Banana Bhaji, Coconut Chutney",
    dinner: "Poori, Channa Masala, White Rice, Sambar, Rasam, Butter Milk, Bananas"
  },
  "2024-10-04": {
    breakfast: "Rava Bhaji Masala, Pongal, Vada, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Rajma, Maharashtrian White Rice, Sambar, Rasam, Curd, Paneer Palak Masala, Keerai Koottu",
    snacks: "Eggless Cake, Tea, Coffee, Milk",
    dinner: "Phulka, Dal Masala, White Rice, Sambar, Rasam, Butter Milk, Schezwan Veg Fried Rice, Gobi Manchurian"
  },
  "2024-10-05": {
    breakfast: "Aloo Paratha, Curd, Pongal, Vada, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal, Maharani Rice, Rice, Sambar, Rasam, Paneer Tikka, Mixed Veg",
    snacks: "Tea, Coffee, Croquette Potato",
    dinner: "Chapathi, Puliyodharai, Butter Milk, Dal, Bananas"
  },
  "2024-10-06": {
    breakfast: "Podi Idly, Vada, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Fry, White Rice, Rice, Sambar, Rasam, Fryums",
    snacks: "Tea, Coffee, Vada Pav",
    dinner: "Phulka, White Rice, Rice, Sambar, Butter Milk, Gobi Rice"
  },
  "2024-10-07": {
    breakfast: "Poori, Aloo Masala, Poha, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal, Pachadi, Paneer Fried Rice, Rice, Sambar, Rasam",
    snacks: "Tea, Coffee, Stuffed Bread Roll",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Butter Milk"
  },
  "2024-10-08": {
    breakfast: "Gobi Paratha, Curd, Pongal, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Rice, Sambar, Rasam, Paneer Bhurji, Veg Salad",
    snacks: "Tea, Coffee, Milk",
    dinner: "Phulka, Dal Rice, White Rice, Sambar, Rasam, Butter Milk, Rice Kheer"
  },
  "2024-10-09": {
    breakfast: "Plain Dosa, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Ghee Phulka, Dal Fry, White Rice, Sambar, Rasam, Curd, Fryums",
    snacks: "Onion Pakoda, Sauce",
    dinner: "Phulka, Dal Tadka, White Rice, Sambar, Butter Milk, Pickles"
  },
  "2024-10-10": {
    breakfast: "Gobi Paratha, Curd, Pongal, Vada, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Fry, White Rice, Sambar, Rasam, Paneer Makhanwala, Fryums",
    snacks: "Eggless Cake, Tea, Coffee, Milk",
    dinner: "Phulka, Dal, Makhani, Rice, Sambar, Butter Milk, Salad, Paneer Makhani"
  },
  "2024-10-11": {
    breakfast: "Idly, Vada, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Paneer Masala, White Rice, Sambar, Rasam, Paneer, Fryums",
    snacks: "Tea, Coffee, Bhaji",
    dinner: "Phulka, White Rice, Rice, Sambar, Butter Milk, Fruits"
  },
  "2024-10-12": {
    breakfast: "Aloo Paratha, Pickle, Vada, Sambar, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Fry, White Rice, Rice, Sambar, Rasam, Butter Milk",
    snacks: "Masala Puri, Sauce",
    dinner: "Phulka, White Rice, Rice, Sambar, Butter Milk, Fruits"
  },
  "2024-10-13": {
    breakfast: "Pav Bhaji Masala, Vada, Pongal, Vada, Sambar, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Rajma, White Rice, Sambar, Rasam, Fryums",
    snacks: "Tea, Coffee, Milk",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Butter Milk, Veg Biryani, Boondi Laddu"
  },
  "2024-10-14": {
    breakfast: "Poori, Masala, Pongal, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Fry, White Rice, Sambar, Rasam, Paneer Kurma, Veg Salad",
    snacks: "Tea, Coffee, Vada Pav",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Butter Milk, Paneer Masala, Rice"
  },
  "2024-10-15": {
    breakfast: "Plain Dosa, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Panchmel, White Rice, Sambar, Rasam, Paneer Do Pyaza, Veg Salad",
    snacks: "Tea, Coffee, Milk, Stuffed Bread Roll",
    dinner: "Phulka, White Rice, Rice, Sambar, Butter Milk, Methi Chapathi, Veg Korma"
  },
  "2024-10-16": {
    breakfast: "Gobi Paratha, Curd, Pickle, Vada, Pongal, Sambar, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Tadka, White Rice, Sambar, Rasam, Paneer Butter Masala, Salad",
    snacks: "Tea, Coffee, Bhaji",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Rasam, Veg Fried Rice, Soya Chunks"
  },
  "2024-10-17": {
    breakfast: "Plain Masala Dosa, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal, Rajma, Paneer Bhurji, White Rice, Sambar, Rasam",
    snacks: "Tea, Coffee, Onion Bajji",
    dinner: "Phulka, Dal Makhani, White Rice, Sambar, Butter Milk, Gobi Manchurian"
  },
  "2024-10-18": {
    breakfast: "Rava Dosa, Pongal, Vada, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Fry, White Rice, Sambar, Rasam, Paneer Kofta, Veg Salad",
    snacks: "Tea, Coffee, Milk, Cutlet",
    dinner: "Phulka, White Rice, Rice, Sambar, Rasam, Mixed Veg Korma"
  },
  "2024-10-19": {
    breakfast: "Poori, Aloo Masala, Pongal, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Maharani, White Rice, Sambar, Rasam, Paneer Korma",
    snacks: "Tea, Coffee, Croquette Potato",
    dinner: "Phulka, Puliyodharai, White Rice, Butter Milk, Veg Korma"
  },
  "2024-10-20": {
    breakfast: "Podi Idly, Vada, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Fry, White Rice, Sambar, Rasam, Paneer Bhurji",
    snacks: "Tea, Coffee, Biscuits",
    dinner: "Phulka, White Rice, Rice, Sambar, Rasam, Butter Milk, Veg Manchurian"
  },
  "2024-10-21": {
    breakfast: "Poori, Aloo Masala, Pongal, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Fry, White Rice, Sambar, Rasam, Paneer Masala",
    snacks: "Tea, Coffee, Masala Puri",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Butter Milk, Methi Roti"
  },
  "2024-10-22": {
    breakfast: "Gobi Paratha, Curd, Vada, Pongal, Sambar, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Fry, White Rice, Sambar, Rasam, Paneer Kurma",
    snacks: "Tea, Coffee, Vada Pav",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Butter Milk, Veg Biryani"
  },
  "2024-10-23": {
    breakfast: "Plain Dosa, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Fry, White Rice, Sambar, Rasam, Paneer Butter Masala",
    snacks: "Tea, Coffee, Onion Pakoda",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Butter Milk, Veg Fried Rice"
  },
  "2024-10-24": {
    breakfast: "Rava Dosa, Vada, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Fry, White Rice, Sambar, Rasam, Paneer Kurma",
    snacks: "Tea, Coffee, Stuffed Bread Roll",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Butter Milk, Paneer Manchurian"
  },
  "2024-10-25": {
    breakfast: "Idly, Vada, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Tadka, White Rice, Sambar, Rasam, Paneer Bhurji",
    snacks: "Tea, Coffee, Biscuits",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Butter Milk, Veg Biryani"
  },
  "2024-10-26": {
    breakfast: "Aloo Paratha, Curd, Pickle, Pongal, Vada, Sambar, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Rajma, White Rice, Sambar, Rasam, Paneer Masala",
    snacks: "Tea, Coffee, Croquette Potato",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Butter Milk, Veg Fried Rice"
  },
  "2024-10-27": {
    breakfast: "Podi Idly, Vada, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Fry, White Rice, Sambar, Rasam, Paneer Bhurji",
    snacks: "Tea, Coffee, Vada Pav",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Butter Milk, Veg Manchurian"
  },
  "2024-10-28": {
    breakfast: "Poori, Aloo Masala, Pongal, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Fry, White Rice, Sambar, Rasam, Paneer Masala",
    snacks: "Tea, Coffee, Masala Puri",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Butter Milk, Methi Roti"
  },
  "2024-10-29": {
    breakfast: "Gobi Paratha, Curd, Vada, Pongal, Sambar, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Fry, White Rice, Sambar, Rasam, Paneer Kurma",
    snacks: "Tea, Coffee, Vada Pav",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Butter Milk, Veg Biryani"
  },
  "2024-10-30": {
    breakfast: "Plain Dosa, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Fry, White Rice, Sambar, Rasam, Paneer Butter Masala",
    snacks: "Tea, Coffee, Onion Pakoda",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Butter Milk, Veg Fried Rice"
  },
  "2024-10-31": {
    breakfast: "Rava Dosa, Vada, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    lunch: "Phulka, Dal Fry, White Rice, Sambar, Rasam, Paneer Kurma",
    snacks: "Tea, Coffee, Stuffed Bread Roll",
    dinner: "Phulka, Dal Fry, White Rice, Sambar, Butter Milk, Paneer Manchurian"
  }
  // Continue with the Veg Mess Menu for the remaining dates
};

const specialMessMenu ={
  "2024-10-10": {
    "breakfast": "Gobi Paratha, Curd, Pongal, Chutney, Sambar, B.B.J, Tea, Coffee, Milk",
    "lunch": "Phulka, Dal Masala, White Rice, Sambar, Rasam, Curd, Onion Rings, Green Veg Sabzi (No Potatoes)",
    "snacks": "Badushah / Coconut Laddu, Tea, Coffee, Milk",
    "dinner": "Phulka, Dal Lasoni, White Rice, Sambar, Rasam, Loose Curd, Wheel Chips, Paneer Makhanwala"
  },
  "2024-10-11": {
    "breakfast": "Idly, Dosa, Vada Curry, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    "lunch": "Phulka, Dal Masala, White Rice, Sambar, Rasam, Loose Curd, Wheel Chips, Paneer Makhanwala",
    "snacks": "Eggless Cake, Tea, Coffee, Milk",
    "dinner": "Phulka, Dal Fry, White Rice, Sambar, Beetroot Poriyal, Fruits, Seasonal Fruits"
  },
  "2024-10-12": {
    "breakfast": "Aloo Paratha, Curd, Kitchadi, Chutney, Sambar, B.B.J, Tea, Coffee, Milk",
    "lunch": "Phulka, Dal Maharani, White Rice, Sambar, Rasam, Kara Kozhambhu, Fryums, Poriyal, Dhal Vada",
    "snacks": "Croquette, Veg Puffs, Tea, Coffee, Milk",
    "dinner": "Paneer Masala, Phulka, Biryani, Raita, Sambar, Rasam, Curd"
  },
  "2024-10-13": {
    "breakfast": "Boiled Egg Masala, Scrambled Egg, Bread Toast, Cornflakes, Chutney, B.B.J, Tea, Coffee, Milk",
    "lunch": "Chicken Biriyani, White Rice, Biryani, Loose Curd, Sambar, Rasam, Tomato Kuzhambu, Onion Fryums",
    "snacks": "Chips, Tea, Coffee, Milk",
    "dinner": "Phulka, Chicken Curry, Veg Biryani, Tomato Rasam, Loose Curd, White Rice"
  },
  "2024-10-14": {
    "breakfast": "Poori, Masala, Chutney, Pongal, Sambar, B.B.J, Tea, Coffee, Milk",
    "lunch": "Paneer Butter Masala, White Rice, Sambar, Rasam, Loose Curd, Wheel Chips, Veg Subzi",
    "snacks": "Vada Pav, Tea, Coffee, Milk",
    "dinner": "Phulka, Paneer Butter Masala, Veg Curry, Rice"
  },
  "2024-10-15": {
    "breakfast": "Idly, Dosa, Pongal, Sambar, Tea, Coffee, Milk",
    "lunch": "Paneer Gravy, White Rice, Dal Fry, Butter Naan, Rasam",
    "snacks": "Badam Halwa, Tea, Coffee",
    "dinner": "Phulka, Masala Dal, White Rice, Fryums, Raita"
  },
  "2024-10-16": {
    "breakfast": "Upma, Poha, Cornflakes, Tea, Coffee, Milk",
    "lunch": "Rajma Masala, Dal Tadka, White Rice, Chapati",
    "snacks": "Spring Rolls, Veg Burger",
    "dinner": "Phulka, Dal Fry, Rice, Roti, Dahi Vada, Raita"
  },
  "2024-10-17": {
    "breakfast": "Masala Dosa, Idly, Sambar, B.B.J, Tea, Coffee, Milk",
    "lunch": "Chicken Biryani, Paneer Gravy, White Rice, Loose Curd",
    "snacks": "Puffs, Chaat, Tea, Coffee",
    "dinner": "Phulka, Paneer Butter Masala, Sambar, Rasam, Curd, Fruits"
  },
  "2024-10-18": {
    "breakfast": "Boiled Egg, Curd Rice, Cornflakes, Tea, Coffee, Milk",
    "lunch": "Paneer Tikka Masala, Dal Fry, White Rice, Chapati",
    "snacks": "Cutlet, Tea, Coffee",
    "dinner": "Paneer Butter Masala, Naan, White Rice, Rasam"
  },
  "2024-10-19": {
    "breakfast": "Masala Poori, Paneer Paratha, Tea, Coffee, Milk",
    "lunch": "Veg Biryani, Paneer Butter Masala, White Rice, Raita",
    "snacks": "Pizza, Tea, Coffee",
    "dinner": "Chapati, Phulka, Dal Makhani, White Rice, Salad, Raita"
  },
  "2024-10-20": {
    "breakfast": "Idly, Dosa, Pongal, Chutney, Sambar, B.B.J, Tea, Coffee, Milk",
    "lunch": "Rajma Masala, Paneer Tikka Masala, White Rice, Dal Fry",
    "snacks": "Veg Cutlet, Tea, Coffee",
    "dinner": "Phulka, Paneer Butter Masala, Veg Biryani, Tomato Kuzhambu"
  },
  "2024-10-21": {
    "breakfast": "Bread, Butter, Cornflakes, Tea, Coffee, Milk",
    "lunch": "Paneer Butter Masala, White Rice, Chapati, Rasam",
    "snacks": "Vada Pav, Tea, Coffee",
    "dinner": "Phulka, Dal Makhani, Rasam, White Rice, Veg Curry"
  },
  "2024-10-22": {
    "breakfast": "Veg Sandwich, Cheese Toast, Tea, Coffee, Milk",
    "lunch": "Paneer Butter Masala, Dal Tadka, White Rice, Fryums, Veg Sabzi",
    "snacks": "Puffs, Tea, Coffee",
    "dinner": "Phulka, Paneer Butter Masala, Dal Makhani, Chapati, Rasam"
  },
  "2024-10-23": {
    "breakfast": "Upma, Pongal, Chutney, Tea, Coffee, Milk, B.B.J",
    "lunch": "Paneer Masala, Dal Tadka, Chapati, White Rice, Rasam, Fryums",
    "snacks": "Vada, Samosa, Tea, Coffee",
    "dinner": "Phulka, Paneer Butter Masala, Roti, Sambar, Rice, Fruits"
  },
  "2024-10-24": {
    "breakfast": "Mysore Masala Dosa, Pongal, Sambar, Chutney, Tea, Coffee, Milk",
    "lunch": "Paneer Butter Masala, Dal Makhani, Rice, Rasam, Fryums, Paneer Fry",
    "snacks": "Veg Spring Roll, Tea, Coffee",
    "dinner": "Phulka, Butter Paneer, Dal Makhani, White Rice, Salad, Fruits"
  },
  "2024-10-25": {
    "breakfast": "Idly, Dosa, Vada, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
    "lunch": "Paneer Masala, Dal Tadka, Chapati, Rice, Rasam, Fryums, Green Salad",
    "snacks": "Cutlet, Puffs, Tea, Coffee",
    "dinner": "Phulka, Paneer Butter Masala, Dal Fry, White Rice, Veg Salad, Roti"
  },
  "2024-10-26": {
    "breakfast": "Pav Bhaji, Vada, Pongal, Sambar, Tea, Coffee, Milk",
    "lunch": "Paneer Butter Masala, Dal Makhani, White Rice, Rasam, Curd, Fryums",
    "snacks": "Veg Puffs, Biscuits, Tea, Coffee",
    "dinner": "Phulka, Aloo Gobi, Dal Fry, Rice, Chapati, Fruits"
  },
  "2024-10-27": {
    "breakfast": "Poori, Aloo Masala, Sambar, B.B.J, Tea, Coffee, Milk",
    "lunch": "Paneer Butter Masala, White Rice, Rasam, Dal Fry, Chapati, Veg Salad",
    "snacks": "Spring Roll, Cutlet, Tea, Coffee",
    "dinner": "Phulka, Butter Paneer, Roti, White Rice, Sambar, Dal, Salad, Fruits"
  },
  "2024-10-28": {
    "breakfast": "Upma, Cornflakes, Tea, Coffee, Milk",
    "lunch": "Paneer Butter Masala, Dal Makhani, Chapati, Rice, Fryums, Rasam",
    "snacks": "Veg Cutlet, Spring Roll, Tea, Coffee",
    "dinner": "Phulka, Dal Fry, Chapati, White Rice, Roti, Fruits, Salad"
  },
  "2024-10-29": {
    "breakfast": "Dosa, Idly, Pongal, Chutney, Tea, Coffee, Milk",
    "lunch": "Paneer Butter Masala, Dal Tadka, White Rice, Chapati, Rasam, Fryums",
    "snacks": "Veg Spring Roll, Tea, Coffee",
    "dinner": "Phulka, Dal Makhani, Roti, White Rice, Fryums, Fruits"
  },
  "2024-10-30": {
    "breakfast": "Mysore Masala Dosa, Pongal, Sambar, Chutney, Tea, Coffee, Milk",
    "lunch": "Paneer Masala, Dal Fry, White Rice, Rasam, Fryums, Salad",
    "snacks": "Cutlet, Puffs, Tea, Coffee",
    "dinner": "Phulka, Paneer Butter Masala, White Rice, Dal Fry, Chapati, Fruits"
  },
  "2024-10-31": {
    "breakfast": "Poori, Aloo Masala, Pongal, Tea, Coffee, Milk",
    "lunch": "Paneer Masala, White Rice, Rasam, Dal Fry, Fryums",
    "snacks": "Vada, Puffs, Tea, Coffee",
    "dinner": "Phulka, Paneer Butter Masala, Chapati, Dal Fry, White Rice, Fruits, Salad"
  }
};


const nonVegMessMenu = {
  "2024-10-10": {
    "breakfast": "Gobi Paratha, Curd, Pongal, Chutney, Sambar, B,B,J Tea, Coffee, Milk, Fried Egg Masala (2 nos)",
    "lunch": "Phulka, Dal Masala, White Rice, Sambar, Rasam, Butter Milk, Onion Rings, Green Veg Sabzhi (no potatoes), Sweet: Badushai / Coconut Laddu",
    "snacks": "Dahi Papdi Chat/Dahi Poori chat, Tea, Coffee, Milk",
    "dinner": "Poori, Channa Masala, White Rice, Rasam, Sambar, Loose Curd, Jeera Rice, Cabbage Poriyal, Fruits: Banana"
  },
  "2024-10-11": {
    "breakfast": "Kal Dosa, Vadacurry/Sambar, Chutney, B,B,J Tea, Coffee, Milk, Egg Burji (2 nos)",
    "lunch": "Phulka, Dal Lasoni, White Rice, Sambar, Rasam, Loose Curd, Wheel Chips, Chicken 65/Chicken Tikka Masala, Avarakkai Poriyal",
    "snacks": "Cream Cake, Tea, Coffee, Milk",
    "dinner": "Phulka, Dhal Makhani, White Rice, Rasam, Sambar, Butter Milk, Chutney, Idly, Sambar, Beetroot Poriyal, Fruits: Seasonal Fruits"
  },
  "2024-10-12": {
    "breakfast": "Aloo Paratha, Curd, Kitchadi, Chutney, Sambar, B,B,J Tea, Coffee, Milk, Fried Egg (2 nos)",
    "lunch": "Phulka, Dal Maharani, White Rice, Sambar, Rasam, Kara/Morekozhambu, Sabzhi, Dahi Vada, Fryums, Sweet: Gulab Jamun",
    "snacks": "Onion Bajji/Onion Pakoda, Sauce, Tea, Coffee, Milk",
    "dinner": "Phulka, Dhal Rajma, White Rice, Rasam, Sambar, Curd, Garlic Sauce, Egg Fried Rice, Thurai Tomato Sabzhi, Fruits: Watermelon"
  },
  "2024-10-13": {
    "breakfast": "Vada Paav/Paav Bhaji, Pongal, Sambar, Chutney, B,B,J Tea, Coffee, Milk, Egg Burji (2 nos)",
    "lunch": "Phulka, Dal Rajma, White Rice, Sambar, Rasam, Papad, Onion Raitha, Chicken Biryani, Banaras Baigan, Sweet: Ice Cream",
    "snacks": "Veg Puffs, Sauce, Tea, Coffee, Milk",
    "dinner": "Phulka, Dhal, White Rice, Rasam, Sambar, Loose Curd, Aloo Gobi Capsicum Masala, Fruit Salad"
  },
  "2024-10-14": {
    "breakfast": "Poori, Aloo Masala, Semiya, Chutney, B,B,J Tea, Coffee, Milk, French Toast",
    "lunch": "Phulka, Dal Ajawin, White Rice, Sambar, Rasam, Curd, Onion Rings, Egg Masala, Poriyal, Sweet: Rava Laddu/Boondhi Laddu",
    "snacks": "Veg Cutlet, Tea, Coffee, Milk",
    "dinner": "Roti, Dosa, Chutney, Dhal, White Rice, Rasam, Sambar, Loose Curd, Green Veg Sabzhi, Seasonal Fruits"
  },
  "2024-10-15": {
    "breakfast": "Idly, Vada, Sambar, Chutney, Kitchadi, B,B,J Tea, Coffee, Milk",
    "lunch": "Phulka, Dal Thadka, White Rice, Rasam, Loose Curd, Papad, Coconut Rice / Lemon Rice, Thuvayal, Soya Chunk Masala",
    "snacks": "Veg Samosa/Imly Sauce, Tea, Coffee, Milk",
    "dinner": "Chapathi, Dhal, White Rice, Rasam, Sambar, Butter Milk, Banaras Aloo Baigan, Egg Thai Fried Rice, Garlic Sauce, Hot Badam Milk, Banana"
  },
  "2024-10-16": {
    "breakfast": "Fried Eggs (2 nos), Plain Masala Dosa (Thin), Sambar, Chutney, B,B,J Tea, Coffee, Milk",
    "lunch": "Phulka, Dal Lasoni, White Rice, Sambar, Rasam, Curd, Fryums, Chicken Do Piazha, Poriyal, Sweet: Jangri / Jilebi",
    "snacks": "Pani Poori/Channa Chat, Tea, Coffee, Milk",
    "dinner": "Phulka, Dhal Fry, White Rice, Rasam, Sambar, Curd Rice, Meal Maker & Capsicum Masala, Fruits: Watermelon"
  },
  "2024-10-17": {
    "breakfast": "Fried Boiled Egg (2 nos), Aloo Paratha, Curd, Pickle, Pongal, Chutney, B,B,J Tea, Coffee, Milk, Sambar",
    "lunch": "Phulka, Dal Rajma, White Rice, Sambar, Rasam, Curd, Papad, Poriyal, Veg Kholapuri",
    "snacks": "Raw Banana Bajji, Coconut Chutney, Tea, Coffee, Milk",
    "dinner": "Poori, Channa Masala, White Rice, Rasam, Sambar, Butter Milk, Variety Rice, Green Poriyal, Fruits: Banana"
  },
  "2024-10-18": {
    "breakfast": "Scrambled Egg (2 nos), Paav Bhaji Masala, Pongal, Vada, Sambar, Chutney, B,B,J Tea, Coffee, Milk",
    "lunch": "Phulka, Dal Rajasthani, White Rice, Sambar, Rasam, Curd, Masala Papad, Chicken 65, Keerai Kootu, Sweet: Gulab Jamun",
    "snacks": "Cake, Tea, Coffee, Milk",
    "dinner": "Phulka, Variety Rice, Dhal, White Rice, Rasam, Sambar, Butter Milk, Aloo Brinjal Drumstick Masala, Fruits: Seasonal Fruits"
  },
  "2024-10-19": {
    "breakfast": "Fried Egg (2 nos), Aloo Paratha, Curd, Kitchadi, Chutney, Sambar, B,B,J Tea, Coffee, Milk, Egg Burji (2 nos)",
    "lunch": "Phulka, Dal Thadka, White Rice, Kara Kozhambu, Rasam, Dahi Vada / Kadi Pakoda, Papad, Capsicum Peas Masala, Sambar",
    "snacks": "Crouquete Potato, Sauce, Tea, Coffee, Milk",
    "dinner": "Phulka, Dhal Masala, White Rice, Rasam, Sambar, Butter Milk, Schezwan Egg Fried Rice, Gobi Manchurian, Fruits: Papaya"
  },
  "2024-10-20": {
    "breakfast": "Podi Idly, Vada, Sambar, Chutney, B,B,J Tea, Coffee, Milk, Fried Egg Masala (2 nos)",
    "lunch": "Phulka, Dal Rajma, White Rice, Sambar, Rasam, Fryums, Onion Raitha, Chicken Biryani, Oil Brinjal, Sweet: Ice Cream",
    "snacks": "Vada Paav, Mint Chutney, Tea, Coffee, Milk",
    "dinner": "Phulka, Dhal Thoor, White Rice, Rasam, Sambar, Butter Milk, Lemon Rice, Aloo Capsicum Muttar Masala, Seasonal Fruits"
  },
  "2024-10-21": {
    "breakfast": "Poori, Aloo Masala, Poha Nampkin, B,B,J Tea, Coffee, Milk, Chutney, Masala Omelette (2 nos)",
    "lunch": "Phulka, Dal Panchmela, White Rice, Sambar, Rasam, Curd, Onion Rings, Kadai Chicken, Poriyal",
    "snacks": "Masala Peanuts/Sundal, Tea, Coffee, Milk",
    "dinner": "Methi Roti, Plain Dosa, Sambar, Chutney, Rasam, Sambar, Butter Milk, Poriyal, White Rice, Channa Masala, Fruits: Musk Melon"
  },
  "2024-10-22": {
    "breakfast": "Gobi Paratha, Curd, Kitchadi, Sambar, B,B,J Tea, Coffee, Milk, Pickle, Boiled Egg Masala Dry (2 nos)",
    "lunch": "Phulka, Dal Thadka, White Rice, Sambar, Rasam, Curd, Papad, Veg Jal Frizhi, Sweet: Fruit Kesari",
    "snacks": "Stuffed Bread Roll, Veg Roll, Sauce, Tea, Coffee, Milk",
    "dinner": "Phulka, Dhal Fry, White Rice, Rasam, Sambar, Curd, Variety Rice, Veg Kuftha Curry, Fruits: Fruit Salad"
  },
  "2024-10-23": {
    "breakfast": "Plain Dosa, Sambar, Chutney, B,B,J Tea, Coffee, Milk, Scrambled Egg (2 nos)",
    "lunch": "Phulka, Dal Fry, White Rice, Sambar, Rasam, Butter Milk, Fryums, Poriyal, Chicken Hydrabadi",
    "snacks": "Onion Pakoda, Chutney, Tea, Coffee, Milk",
    "dinner": "Phulka, Dhal Thadka, White Rice, Rasam, Sambar, Butter Milk, Puliyodra, Aloo Podimas, Bindi Masala, Fruits: Watermelon"
  },
  "2024-10-24": {
    "breakfast": "Gobi Paratha, Curd, Pongal, Chutney, Sambar, B,B,J Tea, Coffee, Milk, Fried Egg Masala (2 nos)",
    "lunch": "Phulka, Dal Masala, White Rice, Sambar, Rasam, Butter Milk, Onion Rings, Green Veg Sabzhi (no potatoes), Sweet: Badushai / Coconut Laddu",
    "snacks": "Dahi Papdi Chat/Dahi Poori chat, Tea, Coffee, Milk",
    "dinner": "Poori, Channa Masala, White Rice, Rasam, Sambar, Loose Curd, Jeera Rice, Cabbage Poriyal, Fruits: Banana"
  },
  "2024-10-25": {
    "breakfast": "Kal Dosa, Vadacurry/Sambar, Chutney, B,B,J Tea, Coffee, Milk, Egg Burji (2 nos)",
    "lunch": "Phulka, Dal Lasoni, White Rice, Sambar, Rasam, Loose Curd, Wheel Chips, Chicken 65/Chicken Tikka Masala, Avarakkai Poriyal",
    "snacks": "Cream Cake, Tea, Coffee, Milk",
    "dinner": "Phulka, Dhal Makhani, White Rice, Rasam, Sambar, Butter Milk, Chutney, Idly, Sambar, Beetroot Poriyal, Fruits: Seasonal Fruits"
  },
  "2024-10-26": {
    "breakfast": "Aloo Paratha, Curd, Kitchadi, Chutney, Sambar, B,B,J Tea, Coffee, Milk, Fried Egg (2 nos)",
    "lunch": "Phulka, Dal Maharani, White Rice, Sambar, Rasam, Kara/Morekozhambu, Sabzhi, Dahi Vada, Fryums, Sweet: Gulab Jamun",
    "snacks": "Onion Bajji/Onion Pakoda, Sauce, Tea, Coffee, Milk",
    "dinner": "Phulka, Dhal Rajma, White Rice, Rasam, Sambar, Curd, Garlic Sauce, Egg Fried Rice, Thurai Tomato Sabzhi, Fruits: Watermelon"
  },
  "2024-10-27": {
    "breakfast": "Vada Paav/Paav Bhaji, Pongal, Sambar, Chutney, B,B,J Tea, Coffee, Milk, Egg Burji (2 nos)",
    "lunch": "Phulka, Dal Rajma, White Rice, Sambar, Rasam, Papad, Onion Raitha, Chicken Biryani, Banaras Baigan, Sweet: Ice Cream",
    "snacks": "Veg Puffs, Sauce, Tea, Coffee, Milk",
    "dinner": "Phulka, Dhal, White Rice, Rasam, Sambar, Loose Curd, Aloo Gobi Capsicum Masala, Fruit Salad"
  },
  "2024-10-28": {
    "breakfast": "Poori, Aloo Masala, Semiya, Chutney, B,B,J Tea, Coffee, Milk, French Toast",
    "lunch": "Phulka, Dal Ajwain, White Rice, Sambar, Rasam, Curd, Onion Rings, Egg Masala, Poriyal, Sweet: Rava Laddu/Boondhi Laddu",
    "snacks": "Veg Cutlet, Tea, Coffee, Milk",
    "dinner": "Roti, Dosa, Chutney, Dhal, White Rice, Rasam, Sambar, Loose Curd, Green Veg Sabzhi, Seasonal Fruits"
  },
  "2024-10-29": {
    "breakfast": "Idly, Vada, Sambar, Chutney, Kitchadi, B,B,J Tea, Coffee, Milk",
    "lunch": "Phulka, Dal Thadka, White Rice, Rasam, Loose Curd, Papad, Coconut Rice / Lemon Rice, Thuvayal, Soya Chunk Masala",
    "snacks": "Veg Samosa/Imly Sauce, Tea, Coffee, Milk",
    "dinner": "Chapathi, Dhal, White Rice, Rasam, Sambar, Butter Milk, Banaras Aloo Baigan, Egg Thai Fried Rice, Garlic Sauce, Hot Badam Milk, Banana"
  },
  "2024-10-30": {
    "breakfast": "Fried Eggs (2 nos), Plain Masala Dosa (Thin), Sambar, Chutney, B,B,J Tea, Coffee, Milk",
    "lunch": "Phulka, Dal Lasoni, White Rice, Sambar, Rasam, Curd, Fryums, Chicken Do Piazha, Poriyal, Sweet: Jangri / Jilebi",
    "snacks": "Pani Poori/Channa Chat, Tea, Coffee, Milk",
    "dinner": "Phulka, Dhal Fry, White Rice, Rasam, Sambar, Curd Rice, Meal Maker & Capsicum Masala, Fruits: Watermelon"
  },
  "2024-10-31": {
    "breakfast": "Fried Boiled Egg (2 nos), Aloo Paratha, Curd, Pickle, Pongal, Chutney, B,B,J Tea, Coffee, Milk, Sambar",
    "lunch": "Phulka, Dal Rajma, White Rice, Sambar, Rasam, Curd, Papad, Poriyal, Veg Kholapuri",
    "snacks": "Raw Banana Bajji, Coconut Chutney, Tea, Coffee, Milk",
    "dinner": "Poori, Channa Masala, White Rice, Rasam, Sambar, Butter Milk, Variety Rice, Green Poriyal, Fruits: Banana"
  }
};


// Seeding function
const seedMenuData = async () => {
  const hostelTypes = ["Men's Hostel"];
  const messTypes = ["Veg Mess", "Special Mess", "Non-Veg Mess"];
  const dates = [...Array(31).keys()].map(i => `2024-10-${String(i + 1).padStart(2, '0')}`);

  // Loop over the hostel type, mess type, and dates to insert the corresponding menu
  for (const hostelType of hostelTypes) {
    for (const messType of messTypes) {
      for (const date of dates) {
        let menu;

        if (messType === "Veg Mess") {
          menu = vegMessMenu[date];
        } else if (messType === "Special Mess") {
          menu = specialMessMenu[date];
        } else if (messType === "Non-Veg Mess") {
          menu = nonVegMessMenu[date];
        }

        if (menu) {
          const newMenu = new Menu({
            hostelType,
            messType,
            date,
            breakfast: menu.breakfast,
            lunch: menu.lunch,
            snacks: menu.snacks,
            dinner: menu.dinner
          });

          await newMenu.save();
          console.log(`Inserted menu for ${hostelType}, ${messType}, ${date}`);
        }
      }
    }
  }

  console.log('Database seeding completed!');
  mongoose.connection.close();
};

// Run the seed function
seedMenuData();

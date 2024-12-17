const { initializeApp } = require('firebase/app');
const { getFirestore, collection, setDoc, doc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
    
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Data for Menu seeding (Veg Mess, Non-Veg Mess, Special Mess)
const vegMessMenu = {
        "2024-10-11": {
          "breakfast": "Kal Dosa, Vadacurry/Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Lasoni, White Rice, Sambar, Rasam, Loose Curd, Wheel Chips, Paneer Makhanwala",
          "snacks": "Eggless Cake, Tea, Coffee, Milk",
          "dinner": "Phulka, Dal Makhani, White Rice, Rasam, Sambar, Butter Milk, Chutney, Idly, Sambar, Beetroot Poriyal, Fruits: Seasonal Fruits"
        },
        "2024-10-12": {
          "breakfast": "Aloo Paratha, Curd, Kitchadi, Chutney, Sambar, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Maharani, White Rice, Sambar, Rasam, Karakozhambu/More Kozhambhu, Poriyal, Dahi Vada, Fryums, Sweet: Gulab Jamun",
          "snacks": "Onion Bajji/Onion Pakoda, Sauce, Tea, Coffee, Milk",
          "dinner": "Phulka, Dal Rajma, White Rice, Rasam, Sambar, Curd, Garlic Sauce, Veg Fried Rice, Thurai Tomato Sabzi, Fruits: Watermelon"
        },
        "2024-10-13": {
          "breakfast": "Vada Paav/Paav Bhaji, Pongal, Chutney, Sambar, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Rajma, White Rice, Sambar, Rasam, Papad, Veg Biryani, Paneer Bhurji, Onion Raitha, Sweet: Ice Cream",
          "snacks": "Veg Puffs, Sauce, Tea, Coffee, Milk",
          "dinner": "Phulka, Dal, White Rice, Rasam, Sambar, Loose Curd, Aloo Gobi Capsicum Masala, Fruit Salad"
        },
        "2024-10-14": {
          "breakfast": "Poori, Aloo Masala, Semiya, Chutney, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Ajwain, White Rice, Sambar, Rasam, Butter Milk, Onion Rings, Soya Chunk Tikka Masala, Sweet: Rava Laddu/Boondhi Laddu",
          "snacks": "Veg Cutlet, Tea, Coffee, Milk",
          "dinner": "Roti, Dosa, Chutney, Dal, White Rice, Rasam, Sambar, Loose Curd, Green Veg Sabzi, Seasonal Fruits"
        },
        "2024-10-15": {
          "breakfast": "Idly, Vada, Sambar, Chutney, Kitchadi, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Thadka, White Rice, Rasam, Loose Curd, Papad, Coconut Rice/Lemon Rice, Thuvayal, Soya Chunk Masala",
          "snacks": "Veg Samosa/Imly Sauce, Tea, Coffee, Milk",
          "dinner": "Chapathi, Dal, White Rice, Rasam, Sambar, Butter Milk, Banaras Aloo Baigan, Thai Veg Fried Rice, Garlic Sauce, Hot Badam Milk, Banana"
        },
        "2024-10-16": {
          "breakfast": "Plain Masala Dosa (Thin), Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Punjabi, White Rice, Sambar, Rasam, Curd, Fryums, Paneer Do Piaza, Poriyal, Sweet: Jangri/Jilebi",
          "snacks": "Pani Poori/Channa Chat, Tea, Coffee, Milk",
          "dinner": "Phulka, Dal Fry, White Rice, Rasam, Sambar, Curd Rice, Meal Maker & Capsicum Masala, Fruits: Watermelon"
        },
        "2024-10-17": {
          "breakfast": "Aloo Paratha, Curd, Pickle, Pongal, Chutney, B.B.J, Tea, Coffee, Milk, Sambar",
          "lunch": "Phulka, Dal Rajma, White Rice, Sambar, Rasam, Curd, Papad, Poriyal, Veg Kholapuri",
          "snacks": "Raw Banana Bajji, Coconut Chutney, Tea, Coffee, Milk",
          "dinner": "Poori, Channa Masala, White Rice, Rasam, Sambar, Butter Milk, Variety Rice, Green Poriyal, Fruits: Banana"
        },
        "2024-10-18": {
          "breakfast": "Paav Bhaji Masala, Pongal, Vada, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Rajasthani, White Rice, Sambar, Rasam, Curd, Masala Papad, Paneer Tikka Masala, Keerai Kootu, Sweet: Gulab Jamun",
          "snacks": "Eggless Cake, Tea, Coffee, Milk",
          "dinner": "Phulka, Variety Rice, Dal, White Rice, Rasam, Sambar, Butter Milk, Aloo Brinjal Drumstick Masala, Fruits: Seasonal Fruits"
        },
        "2024-10-19": {
          "breakfast": "Aloo Paratha, Curd, Kitchadi, Chutney, Sambar, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Thadka, White Rice, Kara Kozhambu, Rasam, Kadi Pakoda/Dahi Vada, Papad, Sambar, Capsicum Peas Masala",
          "snacks": "Croquette Potato, Sauce, Tea, Coffee, Milk",
          "dinner": "Phulka, Dal Masala, White Rice, Rasam, Sambar, Butter Milk, Schezwan Veg Fried Rice, Gobi Manchurian, Fruits: Papaya"
        },
        "2024-10-20": {
          "breakfast": "Podi Idly, Vada, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Rajma, White Rice, Sambar, Rasam, Curd, Fryums, Veg Biryani, Oil Brinjal, Onion Raitha, Sweet: Ice Cream",
          "snacks": "Vada Paav, Mint Chutney, Tea, Coffee, Milk",
          "dinner": "Phulka, Dal Thoor, White Rice, Rasam, Sambar, Butter Milk, Lemon Rice, Aloo Capsicum Muttar Masala, Seasonal Fruits"
        },
        "2024-10-21": {
          "breakfast": "Poori, Aloo Masala, Poha Nampkin, Chutney, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Panchmela, White Rice, Sambar, Rasam, Curd, Kadai Paneer",
          "snacks": "Masala Peanuts/Sundal, Tea, Coffee, Milk",
          "dinner": "Methi Roti, Plain Dosa, Sambar, Chutney, Rasam, Sambar, Butter Milk, Poriyal, White Rice, Channa Masala, Fruits: Papaya"
        },
        "2024-10-22": {
          "breakfast": "Gobi Paratha, Curd, Pickle, Kitchadi, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Thadka, White Rice, Sambar, Rasam, Curd, Papad, Veg Jal Frizhi, Sweet: Fruit Kesari",
          "snacks": "Stuffed Bread Roll, Veg Roll, Sauce, Tea, Coffee, Milk",
          "dinner": "Phulka, Dal Fry, White Rice, Rasam, Sambar, Curd, Variety Rice, Veg Kofta Curry, Fruits: Fruit Salad"
        },
        "2024-10-23": {
          "breakfast": "Plain Dosa, Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
          "lunch": "Ghee Phulka, Dal Fry, White Rice, Sambar, Rasam, Curd, Fryums, Veg Hyderabadi",
          "snacks": "Onion Pakoda, Chutney, Tea, Coffee, Milk",
          "dinner": "Phulka, Dal Thadka, White Rice, Rasam, Sambar, Butter Milk, Puliyodarai, Aloo Podimas, Bhindi Masala, Fruits: Watermelon"
        },
        "2024-10-24": {
          "breakfast": "Gobi Paratha, Curd, Pongal, Chutney, Sambar, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Masala, White Rice, Sambar, Rasam, Curd, Onion Rings, Green Veg Sabzi, Sweet: Badushai/Coconut Laddu",
          "snacks": "Dahi Papdi Chat/Dahi Poori Chat, Tea, Coffee, Milk",
          "dinner": "Poori, Channa Masala, White Rice, Rasam, Sambar, Loose Curd, Jeera Rice, Cabbage Poriyal, Fruits: Banana"
        },
        "2024-10-25": {
          "breakfast": "Kal Dosa, Vadacurry/Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Lasoni, White Rice, Sambar, Rasam, Loose Curd, Wheel Chips, Paneer Makhanwala",
          "snacks": "Eggless Cake, Tea, Coffee, Milk",
          "dinner": "Phulka, Dal Makhani, White Rice, Rasam, Sambar, Butter Milk, Chutney, Idly, Sambar, Beetroot Poriyal, Fruits: Seasonal Fruits"
        },
        "2024-10-26": {
          "breakfast": "Aloo Paratha, Curd, Kitchadi, Chutney, Sambar, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Maharani, White Rice, Sambar, Rasam, Karakozhambu/More Kozhambhu, Poriyal, Dahi Vada, Fryums, Sweet: Gulab Jamun",
          "snacks": "Onion Bajji/Onion Pakoda, Sauce, Tea, Coffee, Milk",
          "dinner": "Phulka, Dal Rajma, White Rice, Rasam, Sambar, Curd, Garlic Sauce, Veg Fried Rice, Thurai Tomato Sabzi, Fruits: Watermelon"
        },
        "2024-10-27": {
          "breakfast": "Vada Paav/Paav Bhaji, Pongal, Chutney, Sambar, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Rajma, White Rice, Sambar, Rasam, Papad, Veg Biryani, Paneer Bhurji, Onion Raitha, Sweet: Ice Cream",
          "snacks": "Veg Puffs, Sauce, Tea, Coffee, Milk",
          "dinner": "Phulka, Dal, White Rice, Rasam, Sambar, Loose Curd, Aloo Gobi Capsicum Masala, Fruit Salad"
        },
        "2024-10-28": {
          "breakfast": "Poori, Aloo Masala, Semiya, Chutney, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Ajwain, White Rice, Sambar, Rasam, Butter Milk, Onion Rings, Soya Chunk Tikka Masala, Sweet: Rava Laddu/Boondhi Laddu",
          "snacks": "Veg Cutlet, Tea, Coffee, Milk",
          "dinner": "Roti, Dosa, Chutney, Dal, White Rice, Rasam, Sambar, Loose Curd, Green Veg Sabzi, Seasonal Fruits"
        },
        "2024-10-29": {
          "breakfast": "Idly, Vada, Sambar, Chutney, Kitchadi, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Thadka, White Rice, Rasam, Loose Curd, Papad, Coconut Rice/Lemon Rice, Thuvayal, Soya Chunk Masala",
          "snacks": "Veg Samosa/Imly Sauce, Tea, Coffee, Milk",
          "dinner": "Chapathi, Dal, White Rice, Rasam, Sambar, Butter Milk, Banaras Aloo Baigan, Thai Veg Fried Rice, Garlic Sauce, Hot Badam Milk, Banana"
        },
        "2024-10-30": {
          "breakfast": "Plain Masala Dosa (Thin), Sambar, Chutney, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Punjabi, White Rice, Sambar, Rasam, Curd, Fryums, Paneer Do Piaza, Poriyal, Sweet: Jangri/Jilebi",
          "snacks": "Pani Poori/Channa Chat, Tea, Coffee, Milk",
          "dinner": "Phulka, Dal Fry, White Rice, Rasam, Sambar, Curd Rice, Meal Maker & Capsicum Masala, Fruits: Watermelon"
        },
        "2024-10-31": {
          "breakfast": "Aloo Paratha, Curd, Pickle, Pongal, Chutney, Sambar, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Rajma, White Rice, Sambar, Rasam, Curd, Papad, Poriyal, Veg Kholapuri",
          "snacks": "Raw Banana Bajji, Coconut Chutney, Tea, Coffee, Milk",
          "dinner": "Poori, Channa Masala, White Rice, Rasam, Sambar, Butter Milk, Variety Rice, Green Poriyal, Fruits: Banana"
        }
      
  };
  const vegLadiesMessMenu={
    "2024-10-11": {
      "breakfast": "Mixed Veg Paratha, Curd, Rava Kitchadi, Chutney",
      "lunch": "Phulka, Dal, Tamarind Rice, White Rice, Bottlegourd Sambar, Rasam, Avarakkai Poriyal, Papad",
      "snacks": "Dahi Papdi Chat",
      "dinner": "Chapathi, Dhal, Urad Dal, Upma, Sambar, Rasam, Butter Milk, White Rice, Sambar, Beetroot Poriyal"
    },
    "2024-10-12": {
      "breakfast": "Podi Dosa, Sambar, Red Chilli Chutney",
      "lunch": "Chapathi, Masoor Dhal, Veg Kofta Gravy, White Rice, Vendakkai Kara Kulambu, Rasam, Curd, Papad, Snakgourd Sabji",
      "snacks": "Veg Puff",
      "dinner": "Wheat Paratha, Veg Salan, White Rice, Sambar, Rasam, Loose Curd, Beans Carrot Poriyal"
    },
    "2024-10-13": {
      "breakfast": "Methi Poori, Channa Masala, Brown Bread",
      "lunch": "Phulka, Dal Fry, White Rice, Brinjal Gravy, Rasam, Fryums, Onion Raitha",
      "snacks": "Aloo Samosa",
      "dinner": "Chapathi, Dhal, Idli, Sambar, White Rice, Rasam, Loose Curd, Peerkangai Poriyal"
    },
    "2024-10-14": {
      "breakfast": "Mooli Paratha, Curd, Vermicelli Upma, Coconut Chutney",
      "lunch": "Phulka, Urad Dhal, White Rice, Chow Chow Sambar, Rasam, Cabbage Poriyal, Cup Curd, Papad",
      "snacks": "Raw Banana Bajji, Chutney",
      "dinner": "Roti, Rajma Masala, Ghee Rice, Dhal, White Rice, Rasam, Butter Milk, Aloe Jeera Poriyal, Fruits: Watermelon"
    },
    "2024-10-25": {
      "breakfast": "Mixed Veg Paratha, Curd, Rava Kitchadi, Chutney",
      "lunch": "Phulka, Dal, Tamarind Rice, White Rice, Bottlegourd Sambar, Rasam, Avarakkai Poriyal, Papad",
      "snacks": "Dahi Papdi Chat",
      "dinner": "Chapathi, Dhal, Urad Dhal, Upma, Sambar, Rasam, Butter Milk, White Rice, Sambar, Beetroot Poriyal"
    },
    "2024-10-26": {
      "breakfast": "Podi Dosa, Sambar, Red Chilli Chutney",
      "lunch": "Chapathi, Masoor Dhal, Veg Kofta Gravy, White Rice, Vendakkai Kara Kulambu, Rasam, Cup Curd, Snakgourd Sabji, Papad",
      "snacks": "Veg Puff",
      "dinner": "Wheat Paratha, Veg Salan, White Rice, Sambar, Rasam, Loose Curd, Beans Carrot Poriyal"
    },
    "2024-10-27": {
      "breakfast": "Methi Poori, Channa Masala, Brown Bread",
      "lunch": "Phulka, Dal Fry, White Rice, Brinjal Gravy, Rasam, Fryums, Onion Raitha",
      "snacks": "Aloo Samosa",
      "dinner": "Chapathi, Dhal, Idli, Sambar, White Rice, Rasam, Loose Curd, Peerkangai Poriyal"
    },
    "2024-10-28": {
      "breakfast": "Mooli Paratha, Curd, Vermicelli Upma, Coconut Chutney",
      "lunch": "Phulka, Urad Dhal, White Rice, Chow Chow Sambar, Rasam, Cabbage Poriyal, Cup Curd, Papad",
      "snacks": "Raw Banana Bajji, Chutney",
      "dinner": "Roti, Rajma Masala, Ghee Rice, Dhal, White Rice, Rasam, Butter Milk, Aloe Jeera Poriyal, Fruits: Watermelon"
    }
  };
  
  const specialMessMenu ={
    
        "2024-10-11": {
          "breakfast": "Kal Dosa, Vada Curry, Sambar, Chutney, Fresh Juice, Cold Milk, Cornflakes, B.B.J, Tea, Coffee, Milk, Moong Dal Sprout, Scrambled Egg(2)",
          "lunch": "Phulka, Dhal, Tandoori Chicken, Paneer Fingers, White Rice, Sambar, Gr. Veg Sabzhi (without potato), Curd, Fryums, Pineapple Rasam, Sweet: Gulab Jamun / Makhan Peda",
          "snacks": "Brownie Cake, Sauce, Hot Badam Milk, Tea",
          "dinner": "Phulka, Dal Makhani, Idly, Sambar, Chutney, White Rice, Dhum Aloo / Banaras Aloo, Loose Curd, Cream of Tomato, Fruits: Fresh Fruits"
        },
        "2024-10-12": {
          "breakfast": "Aloo Paratha, Pickle, Kitchadi, Sambar, B.B.J, Tea, Coffee, Milk",
          "lunch": "Phulka, Dal Maharani, Mushroom Peas Masala, Dahi Vada, Dal Rasam, Fryums, White Rice, Karakozhambu, Sweet: Gulab Jamun / Makhan Peda",
          "snacks": "French Fries, Sauce, Ice Lemon Tea, Coffee",
          "dinner": "Phulka, Dal Rajma, Veg & Egg Fried Rice, Aloo Capsicum Masala, Garlic Sauce, White Rice, Sambar, Rasam, Curd, Spring Onion Soup, Fruits: Fresh Fruits"
        },
        "2024-10-13": {
          "breakfast": "Paav Bhaji, Vada Paav, Pongal, Vada, Fresh Juice, Cold Milk, Cornflakes, B.B.J, Tea, Coffee, Milk, Sambar, Chutney, Green Salad, Egg Burji (2 nos)",
          "lunch": "Phulka, Dal Rajma, Chicken Biryani, Veg Biryani, Banaras Baigan, Crumb Fry Paneer, Onion Raitha, White Rice, Sambar, Tomato Rasam, Papad, Sweet: Assorted Ice Cream",
          "snacks": "Veg Puffs, Tea, Coffee, Milk",
          "dinner": "Phulka, Dal Banjara, Baby Corn Masala, White Rice, Drumstick Sambar, Poriyal, Butter Milk, Mint Pulav, Rasam, Minestrone Soup, Fruits: Papaya"
        },
        "2024-10-14": {
          "breakfast": "Poori, Aloo Masala, Semiya, Chutney, Banana Milk Shake, Cold Milk, Chocos, B.B.J, Tea, Coffee, Milk, Mint Chutney, Cow Peas Salad, French Toast",
          "lunch": "Phulka, Chilly Chicken, Dragon Paneer, Schezwan Fried Rice, Poriyal, Dal Fry, White Rice, Sambar, Rasam, Wheel Chips, Curd, Sweet: Lavangalatha",
          "snacks": "Spring Roll, Veg Franky, Sauce, Tea, Coffee, Milk",
          "dinner": "Plain Dosa, Dal Panchmela, Sambar, Chutney, Veg Jal Frizhi, Methi Roti, White Rice, Rasam, Butter Milk, Cream of Mushroom, Fruits: Fresh Fruits"
        },
        "2024-10-15": {
          "breakfast": "Idly, Vada, Sambar, Veg Kitchadi, Chutney, Fresh Juice, Cold Milk, Cornflakes, B.B.J, Tea, Coffee, Milk, Black Eye Peas Salad, Fried Eggs",
          "lunch": "Phulka, Dal Thadka, Channa Masala, White Rice, Pineapple Rasam, Curd, Poriyal, Bisibilla Huliyana, Potato Chips, Sweet: Carrot Halwa",
          "snacks": "Veg Samosa, Imly Chutney, Jal Jeera, Coffee, Milk",
          "dinner": "Chapathi, Veg & Egg Schezwan Fried Rice, Rajma Masala, Long Beans Sabzi, Garlic Sauce, White Rice, Sambar, Rasam, Butter Milk, Veg Manchow Soup, Hot Badam Milk, Banana"
        },
        "2024-10-16": {
          "breakfast": "Andhra Masala Dosa (Thin), Sambar, Chutney, Fresh Juice, Cold Milk, Chocos, B.B.J, Tea, Coffee, Milk, Green Salad, Egg Burji (2 nos)",
          "lunch": "Phulka, Murg Musallam, Nawabi Paneer, Peas Pulav, Arvi Fry, Dhal Lasoni, Curd, Fryums, White Rice, Kadhambam Sambar, Tomato Rasam, Sweet: Shahi Thukra / Basundi",
          "snacks": "Channa Chat, Masala Chat, Sauce, Tea, Coffee, Milk",
          "dinner": "Phulka, Dal Maharani, Bindi Jaipuri, Veg Jal Frizhi, White Rice, Sambar, Rasam, Curd Rice, Butter Milk, Coriander Soup, Papaya & Watermelon"
        },
        "2024-10-17": {
          "breakfast": "Paneer Paratha, Pongal, Sambar, Dates Milk Shake, Cold Milk, Cornflakes, B.B.J, Tea, Coffee, Milk, Chutney, Sweet Corn Salad, Fried Eggs (2 nos)",
          "lunch": "Phulka, Baked Egg Masala, Paneer Kofta, White Rice, Sambar, Rasam, Banaras Baigan, Fryums, Dal Panchamela, Loose Curd, Sweet: Rasmalai / Rasgulla",
          "snacks": "Boiled Peanuts, Masala Peanuts, Hot Badam Milk, Tea",
          "dinner": "Poori, Channa Masala, White Rice, Rasam, Jeera Rice, Poriyal, Loose Curd, Sweet Lassi, Mixed Veg Soup, Fruits: Orange"
        },
        "2024-10-18": {
          "breakfast": "Masala Ghee Roast Dosa (Thin), Sambar, Fresh Juice, Cold Milk, Chocos, Chutney, B.B.J, Tea, Coffee, Milk, Moong Dal Sprout, Scrambled Egg (2 nos)",
          "lunch": "Phulka, Dal Fry, Malai Chicken Tikka, Paneer Amritsari, White Rice, Sambar, Poondu Rasam, Loose Curd, Fryums, Keera Kootu, Sweet: Gulab Jamun / Makhan Peda",
          "snacks": "Brownie Cake, Sauce, Tea, Coffee, Milk",
          "dinner": "Phulka, Dal Maharani, White Rice, Dhum Aloo / Banaras Aloo, Rasam, Curd, Meal Maker Pulav, Cream of Tomato, Fruits: Papaya"
        },
        "2024-10-19": {
          "breakfast": "Aloo Paratha, Curd, Kitchadi, Chutney, Fresh Juice, Cold Milk, Chocos, Sambar, B.B.J, Tea, Coffee, Milk, Salad, Egg Burji (2 nos)",
          "lunch": "Phulka, Dal Makhani, Dingri Muttar, Lemon Rice, Dahi Vada, Poriyal, Sambar, Karakozhambu, White Rice, Paruppu Rasam, Fryums, Sweet: Ghee Mysore Paak",
          "snacks": "French Fries, Sauce, Masala Tea, Coffee, Milk",
          "dinner": "Phulka, Dal Fry, Schezwan Egg & Veg Rice, Baby Corn Manchurian, Poriyal, Loose Curd, White Rice, Sambar, Rasam, Fresh Garden Peas Soup, Fruits: Fresh Fruits"
        },
            "2024-10-20": {
              "breakfast": "Podi Idly, Medu Vada, Sambar, Chutney, Cold Milk, Cornflakes, Tea, Coffee, Milk, Fresh Juice, B.B.J, Sprouted Channa, Black Omelette Sandwich / Spanish Omelette",
              "lunch": "Phulka, Dal, Chicken Biryani, Veg Biryani, Banaras Baigan, Dragon Paneer, Onion Raitha, White Rice, Sambar, Tomato Rasam, Papad, Sweet: Ice Cream",
              "snacks": "Vada Paav, Dahi Papdi Chat, Jal Jeera, Tea, Coffee, Milk",
              "dinner": "Phulka, Dal Masala, Butter Peas Masala, White Rice, Sambar, Rasam, Aloo Jeera, Curd, Variety Rice, Sweet Corn Soup, Fruits: Cut Fruits"
            },
            "2024-10-21": {
              "breakfast": "Poori, Aloo Masala, Poha Nampkin, Chutney, Banana Milk Shake, Cold Milk, Chocos, B.B.J, Tea, Coffee, Milk, Cow Peas Salad, French Toast",
              "lunch": "Phulka, Chicken Tikka Lababdar, Dal Fry, Paneer Butter Masala, Poriyal, Butter Milk, White Rice, Sambar, Pepper Rasam, Wheel Chips, Sweet: Mothichoor Laddu / Rava Laddu",
              "snacks": "Mysore Bonda, Masala Sweet Corn (1 cup), Tea, Coffee, Milk",
              "dinner": "Pudhina Roti, Plain Dosa, Sambar, Chutney, Loose Curd, Dal Maharani, Channa Masala, White Rice, Rasam, Veg Mushroom Soup, Fruits: Seasonal Fruits"
            },
            "2024-10-22": {
              "breakfast": "Gobi Paratha, Curd, Kitchadi, Sambar, Date Milk Shake, Cold Milk, Cornflakes, B.B.J, Pickle, Tea, Coffee, Milk, Chutney, Black Eye Peas Salad, Fried Eggs",
              "lunch": "Phulka, Dal Ajwain, Veg Jal Frizhi, White Rice, Pineapple Rasam, Curd, Bisibilla Bath, Potato Chips, Sweet: Carrot Halwa",
              "snacks": "Onion Samosa, Veg Samosa, Imly Chutney, Tea, Coffee, Milk",
              "dinner": "Phulka, Dal Fry, Veg & Egg Fried Rice, Baby Corn Manchurian, Poriyal, White Rice, Sambar, Rasam, Curd, Veg Manchow Soup, Cut Fruits"
            },
            "2024-10-23": {
              "breakfast": "Mysore Masala Dosa (Thin), Sambar, Chutney, Fresh Juice, Cold Milk, Chocos, B.B.J, Tea, Coffee, Milk, Green Salad, Egg Burji (2 nos)",
              "lunch": "Diamond Chapathi, Dal Fry, Nilgiri Chicken, Paneer Hariyali, Curd, Aloo Methi / Aloo Saagwala, White Rice, Sambar, Rasam, Fryums, Sweet: Gova Jangri",
              "snacks": "Veg Burger, Potato Croissant Fry, Sauce, Tea, Coffee, Milk",
              "dinner": "Phulka, Dal Maharani, Bindi Do Piaza, Aloo Podimas, White Rice, Sambar, Rasam, Loose Curd, Puliyodarai, Milaguthunia Soup, Fruits: Papaya"
            },
            "2024-10-24": {
              "breakfast": "Paneer Paratha, Pongal, Vada, Sambar, Fresh Juice, Cold Milk, Cornflakes, Chutney, B.B.J, Tea, Coffee, Milk, Black Channa Sprout, Boiled Eggs (2 nos)",
              "lunch": "Phulka, Malabar Fish Curry / Masala Fried Fish, Nargesi Kofta Curry, White Rice, Sambar, Wheel Chips, Dal Rajma, Butter Milk, Rasam, Sweet: Rasmalai / Rasagulla",
              "snacks": "Veg Samosa, Sauce, Tea, Coffee, Milk",
              "dinner": "Poori, Channa Masala, White Rice, Rasam, Vaangi Baath, Poriyal, Curd, Cream of Broccoli Soup, Fruit Salad"
            },
            "2024-10-25": {
              "breakfast": "Kal Dosa, Vada Curry, Sambar, Chutney, Fresh Juice, Cold Milk, Cornflakes, B.B.J, Tea, Coffee, Milk, Moong Dal Sprout, Scrambled Egg (2 nos)",
              "lunch": "Phulka, Dhal, Tandoori Chicken, Paneer Fingers, White Rice, Sambar, Gr. Veg Sabzi (without potato), Curd, Fryums, Pineapple Rasam, Sweet: Gulab Jamun / Makhan Peda",
              "snacks": "Brownie Cake, Sauce, Hot Badam Milk, Tea",
              "dinner": "Phulka, Dal Makhani, Idly, Sambar, Chutney, White Rice, Dhum Aloo / Banaras Aloo, Rasam, Loose Curd, Cream of Tomato, Fruits: Fresh Fruits"
            },
            "2024-10-26": {
              "breakfast": "Aloo Paratha, Curd, Kitchadi, Chutney, Fresh Juice, Cold Milk, Chocos, Sambar, Pickle, B.B.J, Tea, Coffee, Milk, Salad, Boiled Egg Masala",
              "lunch": "Phulka, Dal Maharani, Mushroom Peas Masala, Dahi Vada, Dal Rasam, Fryums, White Rice, Karakozhambu, Sweet: Gulab Jamun / Makhan Peda",
              "snacks": "French Fries, Sauce, Ice Lemon Tea, Coffee",
              "dinner": "Phulka, Dal Rajma, Veg & Egg Fried Rice, Aloo Capsicum Masala, Garlic Sauce, White Rice, Sambar, Rasam, Curd, Spring Onion Soup, Fruits: Fresh Fruits"
            },
            "2024-10-27": {
              "breakfast": "Paav Bhaji, Vada Paav, Pongal, Vada, Fresh Juice, Cold Milk, Cornflakes, B.B.J, Tea, Coffee, Milk, Sambar, Chutney, Green Salad, Egg Burji (2 nos)",
              "lunch": "Phulka, Dal Rajma, Chicken Biryani, Veg Biryani, Banaras Baigan, Crumb Fry Paneer, Onion Raitha, White Rice, Sambar, Tomato Rasam, Papad, Sweet: Assorted Ice Cream",
              "snacks": "Veg Puffs, Tea, Coffee, Milk",
              "dinner": "Phulka, Dal Banjara, Baby Corn Masala, White Rice, Drumstick Sambar, Poriyal, Butter Milk, Mint Pulav, Rasam, Minestrone Soup, Fruits: Papaya"
            },
            "2024-10-28": {
              "breakfast": "Poori, Aloo Masala, Semiya, Chutney, Banana Milk Shake, Cold Milk, Chocos, B.B.J, Tea, Coffee, Milk, Mint Chutney, Cow Peas Salad, French Toast",
              "lunch": "Phulka, Chilly Chicken, Dragon Paneer, Schezwan Fried Rice, Poriyal, Dal Fry, White Rice, Sambar, Rasam, Wheel Chips, Curd, Sweet: Lavangalatha",
              "snacks": "Spring Roll, Veg Franky, Sauce, Tea, Coffee, Milk",
              "dinner": "Plain Dosa, Dal Panchmela, Sambar, Chutney, Veg Jal Frizhi, Methi Roti, White Rice, Rasam, Butter Milk, Cream of Mushroom, Fruits: Fresh Fruits"
            },
            "2024-10-29": {
              "breakfast": "Idly, Vada, Sambar, Veg Kitchadi, Chutney, Fresh Juice, Cold Milk, Cornflakes, B.B.J, Tea, Coffee, Milk, Black Eye Peas Salad, Fried Eggs",
              "lunch": "Phulka, Dal Thadka, Channa Masala, White Rice, Pineapple Rasam, Curd, Poriyal, Bisibilla Huliyana, Potato Chips, Sweet: Carrot Halwa",
              "snacks": "Veg Samosa, Imly Chutney, Jal Jeera, Coffee, Milk",
              "dinner": "Chapathi, Veg & Egg Schezwan Fried Rice, Rajma Masala, Long Beans Sabzi, Garlic Sauce, White Rice, Sambar, Rasam, Butter Milk, Veg Manchow Soup, Hot Badam Milk, Banana"
            },
            "2024-10-30": {
              "breakfast": "Andhra Masala Dosa (Thin), Sambar, Chutney, Fresh Juice, Cold Milk, Chocos, B.B.J, Tea, Coffee, Milk, Green Salad, Egg Burji (2 nos)",
              "lunch": "Phulka, Murg Musallam, Nawabi Paneer, Peas Pulav, Arvi Fry, Dhal Lasoni, Curd, Fryums, White Rice, Kadhambam Sambar, Tomato Rasam, Sweet: Shahi Thukra / Basundi",
              "snacks": "Channa Chat, Masala Chat, Sauce, Tea, Coffee, Milk",
              "dinner": "Phulka, Dal Maharani, Bindi Jaipuri, Veg Jal Frizhi, White Rice, Sambar, Rasam, Curd Rice, Butter Milk, Coriander Soup, Papaya & Watermelon"
            },
            "2024-10-31": {
              "breakfast": "Paneer Paratha, Pongal, Sambar, Dates Milk Shake, Cold Milk, Cornflakes, B.B.J, Tea, Coffee, Milk, Chutney, Sweet Corn Salad, Fried Eggs (2 nos)",
              "lunch": "Phulka, Baked Egg Masala, Paneer Kofta, White Rice, Sambar, Rasam, Banaras Baigan, Fryums, Dal Panchamela, Loose Curd, Sweet: Rasmalai / Rasgulla",
              "snacks": "Boiled Peanuts, Masala Peanuts, Hot Badam Milk, Tea",
              "dinner": "Poori, Channa Masala, White Rice, Rasam, Jeera Rice, Poriyal, Loose Curd, Sweet Lassi, Mixed Veg Soup, Fruits: Orange"
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

// Seeding function for Menu data
const seedMenuData = async () => {
    const hostelTypes = ["Men's Hostel", "Ladies' Hostel"];
    const messTypes = ["Veg Mess", "Special Mess", "Non-Veg Mess"];
    const dates = [...Array(31).keys()].map(i => `2024-10-${String(i + 1).padStart(2, '0')}`);
  
    for (const hostelType of hostelTypes) {
      for (const messType of messTypes) {
        for (const date of dates) {
          let menu = {};
  
          // Check for hostel and mess type to assign the right menu
          if (messType === "Veg Mess") {
            if (hostelType === "Men's Hostel") {
              menu = vegMessMenu[date];
            } else if (hostelType === "Ladies' Hostel") {
              menu = vegLadiesMessMenu[date];
            }
          } 
          else if (messType === "Special Mess") {
            if (hostelType === "Men's Hostel") {
              menu = specialMessMenu[date];
            } else {
              menu = {
                breakfast: "Send menu to us, click on Contact Me",
                lunch: "Send menu to us, click on Contact Me",
                snacks: "Send menu to us, click on Contact Me",
                dinner: "Send menu to us, click on Contact Me"
              };
            }
          } 
          else if (messType === "Non-Veg Mess") {
            if (hostelType === "Men's Hostel") {
              menu = nonVegMessMenu[date];
            } else {
              menu = {
                breakfast: "Send menu to us, click on Contact Me",
                lunch: "Send menu to us, click on Contact Me",
                snacks: "Send menu to us, click on Contact Me",
                dinner: "Send menu to us, click on Contact Me"
              };
            }
          }
  
          if (menu) {
            const newMenuDoc = doc(collection(db, 'Menu'));
            await setDoc(newMenuDoc, {
              hostelType,
              messType,
              date,
              breakfast: menu.breakfast,
              lunch: menu.lunch,
              snacks: menu.snacks,
              dinner: menu.dinner
            });
            console.log(`Inserted menu for ${hostelType}, ${messType}, ${date}`);
          }
        }
      }
    }
    console.log('Menu seeding completed.');
  };
  
  // Run the seeding function
  seedMenuData().catch(console.error);
  


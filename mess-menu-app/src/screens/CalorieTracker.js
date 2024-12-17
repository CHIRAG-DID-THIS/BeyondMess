import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase';
import { query, collection, where, getDocs, addDoc } from 'firebase/firestore';
import MealModal from './MealModal';
import AddNewItemModal from './AddNewItemModal';
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: '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' });

const CalorieTracker = ({ route, navigation }) => {
  const { menu, date } = route.params;

  const [menuItems, setMenuItems] = useState({
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: [],
    miscellaneous: [],
  });

  const [temporaryCalories, setTemporaryCalories] = useState({
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: [],
    miscellaneous: [],
  });

  const [totalCalories, setTotalCalories] = useState(0);
  const [openModal, setOpenModal] = useState({ visible: false, category: null });
  const [addItemModalVisible, setAddItemModalVisible] = useState(false);

  const removeDuplicates = (items) => {
    const uniqueItems = [];
    const itemNames = new Set();

    for (const item of items) {
      if (!itemNames.has(item.name)) {
        uniqueItems.push(item);
        itemNames.add(item.name);
      }
    }

    return uniqueItems;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatDate(date);

  const fetchCaloriesFromFirestore = async (items, category) => {
    try {
      const foodItemsCollection = collection(db, 'FoodItem');
      const q = query(foodItemsCollection, where('itemName', 'in', items));
      const querySnapshot = await getDocs(q);

      let updatedItems = querySnapshot.docs.map((doc) => ({
        name: doc.data().itemName,
        calories: doc.data().calories || 0,
        quantity: 0,
      }));

      const foundItemNames = updatedItems.map(item => item.name);
      const missingItems = items.filter(item => !foundItemNames.includes(item));

      if (missingItems.length > 0) {
        const fetchedItems = await fetchCaloriesFromGroq(missingItems);
        updatedItems = [...updatedItems, ...fetchedItems];
      }

      updatedItems = removeDuplicates(updatedItems);

      setTemporaryCalories((prevItems) => {
        const mergedItems = updatedItems.map((newItem) => {
          const existingItem = prevItems[category]?.find((i) => i.name === newItem.name);
          return existingItem ? { ...newItem, quantity: existingItem.quantity } : newItem;
        });

        return {
          ...prevItems,
          [category]: mergedItems,
        };
      });

      setMenuItems((prevItems) => ({
        ...prevItems,
        [category]: updatedItems,
      }));
    } catch (error) {
      console.error('Error fetching calories from Firestore:', error.message);
    }
  };

  const fetchCaloriesFromGroq = async (missingItems) => {
    const fetchedItems = [];

    for (const itemName of missingItems) {
      try {
        const response = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: `Calorie count for one serving of ${itemName} only return the calorie amount nothing else`,
            },
          ],
          model: "llama3-8b-8192",
        });

        const caloriesText = response.choices[0]?.message?.content;
        const calories = parseFloat(caloriesText.match(/\d+/)?.[0]) || 0;

        const newItem = {
          name: itemName,
          calories: calories || 0,
          quantity: 0,
        };

        await addDoc(collection(db, 'FoodItem'), {
          itemName: newItem.name,
          calories: newItem.calories,
        });

        fetchedItems.push(newItem);
      } catch (error) {
        console.error(`Error fetching item "${itemName}" from Groq API:`, error.message);
      }
    }

    return fetchedItems;
  };

  useEffect(() => {
    const total = Object.values(temporaryCalories)
      .flat()
      .reduce((sum, item) => sum + item.calories * item.quantity, 0);
    setTotalCalories(total);
  }, [temporaryCalories]);

  useEffect(() => {
    loadCalorieData();
    fetchCaloriesFromFirestore(menu.breakfast.split(', '), 'breakfast');
    fetchCaloriesFromFirestore(menu.lunch.split(', '), 'lunch');
    fetchCaloriesFromFirestore(menu.snacks.split(', '), 'snacks');
    fetchCaloriesFromFirestore(menu.dinner.split(', '), 'dinner');
  }, [menu]);

  const loadCalorieData = async () => {
    try {
      const savedData = await AsyncStorage.getItem(`calorieData_${formattedDate}`);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setTemporaryCalories(parsedData.temporaryCalories);
        setMenuItems(parsedData.menuItems);
        setTotalCalories(parsedData.totalCalories);
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const saveCalorieData = async () => {
    const data = {
      temporaryCalories,
      totalCalories,
      menuItems,
    };
    try {
      await AsyncStorage.setItem(`calorieData_${formattedDate}`, JSON.stringify(data));
  
      await updateFitnessTrackingData(totalCalories);
  
      Alert.alert('Calories Submitted!', `Total Calories: ${totalCalories}`);
    } catch (error) {
      console.error('Error saving calorie data:', error);
    }
  };
  
  const updateFitnessTrackingData = async (calories) => {
    try {
      const fitnessData = await AsyncStorage.getItem('fitnessHistory');
      const parsedFitnessData = fitnessData ? JSON.parse(fitnessData) : [];
      
      const newEntry = {
        date: formattedDate,
        calories,
      };
      
      const updatedFitnessData = [...parsedFitnessData, newEntry];
      await AsyncStorage.setItem('fitnessHistory', JSON.stringify(updatedFitnessData));
  
      console.log('Fitness Tracking data updated.');
    } catch (error) {
      console.error('Error updating fitness tracking data:', error);
    }
  };

  const openMealModal = (category) => {
    setOpenModal({ visible: true, category });
  };

  const closeMealModal = () => {
    setOpenModal({ visible: false, category: null });
  };

  const updateMealItems = (updatedItems, category) => {
    setTemporaryCalories((prevItems) => ({
      ...prevItems,
      [category]: updatedItems,
    }));
  };

  const addNewItem = (newItem) => {
    setTemporaryCalories((prevItems) => ({
      ...prevItems,
      miscellaneous: [...prevItems.miscellaneous, newItem],
    }));
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.gradient}>
      <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>CALORIE TRACKER</Text>

          <View style={styles.card}>
            <TouchableOpacity onPress={() => openMealModal('breakfast')} style={styles.cardButton}>
              <Text style={styles.cardTitle}>Breakfast</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity onPress={() => openMealModal('lunch')} style={styles.cardButton}>
              <Text style={styles.cardTitle}>Lunch</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity onPress={() => openMealModal('snacks')} style={styles.cardButton}>
              <Text style={styles.cardTitle}>Snacks</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity onPress={() => openMealModal('dinner')} style={styles.cardButton}>
              <Text style={styles.cardTitle}>Dinner</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity onPress={() => openMealModal('miscellaneous')} style={styles.cardButton}>
              <Text style={styles.cardTitle}>Miscellaneous</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.totalText}>Total Calories: {totalCalories}</Text>

          <TouchableOpacity style={styles.submitButton} onPress={saveCalorieData}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButton} onPress={() => setAddItemModalVisible(true)}>
            <Text style={styles.addButtonText}>Add New Miscellaneous Item</Text>
          </TouchableOpacity>

          <MealModal
            visible={openModal.visible}
            onClose={closeMealModal}
            mealItems={temporaryCalories[openModal.category] || []}
            onUpdateMeal={updateMealItems}
            category={openModal.category}
          />

          <AddNewItemModal
            visible={addItemModalVisible}
            onClose={() => setAddItemModalVisible(false)}
            onAddNewItem={addNewItem}
          />
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  cardButton: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    color: '#3498db',
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 26,
    color: '#3498db',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#1e3c72',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CalorieTracker;

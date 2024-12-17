import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FitnessTrackingScreen = () => {
  const [steps, setSteps] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [userCalories, setUserCalories] = useState(0); // Calories consumed by user
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [history, setHistory] = useState([]); 
  const [cumulativeAvg, setCumulativeAvg] = useState({ steps: 0, caloriesBurned: 0, userCalories: 0 });
  const [last30DaysAvg, setLast30DaysAvg] = useState({ steps: 0, caloriesBurned: 0, userCalories: 0 });

  // Initialize Google Fit API
  useEffect(() => {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_NUTRITION_READ,
      ],
    };

    GoogleFit.authorize(options)
      .then((authResult) => {
        if (authResult.success) {
          console.log('Google Fit authorized successfully');
          fetchGoogleFitData();
        } else {
          console.log('Google Fit authorization failed', authResult.message);
        }
      })
      .catch(() => {
        console.log('Google Fit authorization error');
      });
  }, []);

  // Fetch Google Fit data (steps, calories burned)
  const fetchGoogleFitData = () => {
    const today = new Date();
    const startDate = new Date(today.setHours(0, 0, 0, 0));
    const endDate = new Date();

    // Fetch Steps
    GoogleFit.getDailyStepCountSamples({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }).then((res) => {
      if (res.length > 0 && res[0].steps.length > 0) {
        setSteps(res[0].steps[res[0].steps.length - 1].value);
      } else {
        setSteps(0);
      }
    });

    // Fetch Calories Burned
    GoogleFit.getDailyCalorieSamples({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }).then((res) => {
      if (res.length > 0) {
        setCaloriesBurned(res[res.length - 1].calorie);
      } else {
        setCaloriesBurned(0);
      }
    });

    // Load user-added calories from AsyncStorage
    loadUserCalories();
  };

// Load user calories from AsyncStorage
const loadUserCalories = async () => {
  try {
    const fitnessHistory = await AsyncStorage.getItem('fitnessHistory');
    const parsedHistory = fitnessHistory ? JSON.parse(fitnessHistory) : [];

    // Find today's calorie entry
    const todayEntry = parsedHistory.find(entry => entry.date === date);
    const todayCalories = todayEntry ? todayEntry.calories : 0;
    
    setUserCalories(todayCalories);
    setHistory(parsedHistory);

    // Update the history with today's calories
    updateHistory(todayCalories, steps, caloriesBurned);
  } catch (error) {
    console.error('Error loading user calories:', error);
  }
};


  // Update history and store in AsyncStorage
  const updateHistory = async (userCalories, steps, caloriesBurned) => {
    const newEntry = {
      date: new Date().toLocaleDateString(),
      steps,
      caloriesBurned,
      userCalories,
    };

    const existingHistory = await AsyncStorage.getItem('fitnessHistory');
    const updatedHistory = existingHistory ? JSON.parse(existingHistory) : [];

    updatedHistory.push(newEntry);
    await AsyncStorage.setItem('fitnessHistory', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);

    calculateAverages(updatedHistory);
  };

  // Calculate cumulative and last 30 days average
  const calculateAverages = (history) => {
    let totalSteps = 0, totalCaloriesBurned = 0, totalUserCalories = 0;
    let last30DaysSteps = 0, last30DaysCaloriesBurned = 0, last30DaysUserCalories = 0;
    const last30Days = history.slice(-30); // Get last 30 days

    // Cumulative average
    history.forEach((entry) => {
      totalSteps += entry.steps;
      totalCaloriesBurned += entry.caloriesBurned;
      totalUserCalories += entry.userCalories;
    });

    // Last 30 days average
    last30Days.forEach((entry) => {
      last30DaysSteps += entry.steps;
      last30DaysCaloriesBurned += entry.caloriesBurned;
      last30DaysUserCalories += entry.userCalories;
    });

    setCumulativeAvg({
      steps: Math.round(totalSteps / history.length),
      caloriesBurned: Math.round(totalCaloriesBurned / history.length),
      userCalories: Math.round(totalUserCalories / history.length),
    });

    setLast30DaysAvg({
      steps: Math.round(last30DaysSteps / last30Days.length),
      caloriesBurned: Math.round(last30DaysCaloriesBurned / last30Days.length),
      userCalories: Math.round(last30DaysUserCalories / last30Days.length),
    });
  };

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Fitness Tracking for {date}</Text>

        {/* Display current stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.label}>Steps Today: {steps}</Text>
          <Text style={styles.label}>Calories Burned Today: {caloriesBurned} kcal</Text>
          <Text style={styles.label}>User Calories Today: {userCalories} kcal</Text>
        </View>

        {/* Display cumulative averages */}
        <Text style={styles.header}>Cumulative Average</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.label}>Avg Steps: {cumulativeAvg.steps}</Text>
          <Text style={styles.label}>Avg Calories Burned: {cumulativeAvg.caloriesBurned} kcal</Text>
          <Text style={styles.label}>Avg User Calories: {cumulativeAvg.userCalories} kcal</Text>
        </View>

        {/* Display last 30 days averages */}
        <Text style={styles.header}>Last 30 Days Average</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.label}>Avg Steps (Last 30 days): {last30DaysAvg.steps}</Text>
          <Text style={styles.label}>Avg Calories Burned (Last 30 days): {last30DaysAvg.caloriesBurned} kcal</Text>
          <Text style={styles.label}>Avg User Calories (Last 30 days): {last30DaysAvg.userCalories} kcal</Text>
        </View>

        {/* Display day-to-day history */}
        <Text style={styles.header}>Day to Day History</Text>
        {history.map((entry, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyText}>Date: {entry.date}</Text>
            <Text style={styles.historyText}>Steps: {entry.steps}</Text>
            <Text style={styles.historyText}>Calories Burned: {entry.caloriesBurned} kcal</Text>
            <Text style={styles.historyText}>User Calories: {entry.userCalories} kcal</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 20,
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    color: '#34495e',
    marginVertical: 10,
    fontWeight: '600',
  },
  historyItem: {
    padding: 15,
    backgroundColor: '#f0f4f7',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  historyText: {
    color: '#34495e',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default FitnessTrackingScreen;

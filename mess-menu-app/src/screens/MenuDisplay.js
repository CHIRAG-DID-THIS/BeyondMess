import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const MenuDisplay = ({ route, navigation }) => {
  const { hostelType, messType } = route.params;
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getLastDayOfMonth = (currentDate) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    return new Date(year, month, 0);
  };

  const lastDayOfMonth = getLastDayOfMonth(new Date());

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchMenu = async (selectedDate) => {
    try {
      const formattedDate = formatDate(selectedDate);
      const q = query(
        collection(db, 'Menu'),
        where('hostelType', '==', hostelType),
        where('messType', '==', messType),
        where('date', '==', formattedDate)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setMenu(null);
      } else {
        querySnapshot.forEach(doc => {
          setMenu(doc.data());
        });
      }
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch menu. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu(date);
  }, [hostelType, messType]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setLoading(true);
    fetchMenu(currentDate);
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading menu...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // No menu available
  if (!menu) {
    return (
      <View style={styles.center}>
        <Text style={styles.noMenuText}>No menu available for {formatDate(date)}.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Mess Menu Date Section */}
      <View style={styles.dateCard}>
        <Text style={styles.dateText}>Mess Menu</Text>
        <Text style={styles.dateSubText}>for {formatDate(date)}</Text>
      </View>

      {/* Date Picker Button */}
      <Button
        title="Select Another Date"
        onPress={() => setShowDatePicker(true)}
        color="#3498db"
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
          maximumDate={lastDayOfMonth}
        />
      )}

      {/* Display menu items */}
      {menu.breakfast && (
        <View style={styles.menuCard}>
          <Text style={styles.menuTitle}>Breakfast</Text>
          <Text style={styles.menuDetails}>{menu.breakfast}</Text>
        </View>
      )}
      {menu.lunch && (
        <View style={styles.menuCard}>
          <Text style={styles.menuTitle}>Lunch</Text>
          <Text style={styles.menuDetails}>{menu.lunch}</Text>
        </View>
      )}
      {menu.snacks && (
        <View style={styles.menuCard}>
          <Text style={styles.menuTitle}>Snacks</Text>
          <Text style={styles.menuDetails}>{menu.snacks}</Text>
        </View>
      )}
      {menu.dinner && (
        <View style={styles.menuCard}>
          <Text style={styles.menuTitle}>Dinner</Text>
          <Text style={styles.menuDetails}>{menu.dinner}</Text>
        </View>
      )}

      <Button
        title="Go to Calorie Tracker"
        onPress={() => navigation.navigate('CalorieTracker', { menu, date: date })}
        color="#3498db"
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f6f9',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Date Card Styling
  dateCard: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  dateText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  dateSubText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  menuTitle: {
    fontSize: 20,
    color: '#34495e',
    fontWeight: '600',
    marginBottom: 10,
  },
  menuDetails: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  loadingText: {
    color: '#2c3e50',
    fontSize: 18,
    marginTop: 10,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 18,
  },
  noMenuText: {
    color: '#7f8c8d',
    fontSize: 18,
  },
});

export default MenuDisplay;

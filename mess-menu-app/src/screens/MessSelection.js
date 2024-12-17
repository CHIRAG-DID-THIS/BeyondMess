import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessSelection = ({ route, navigation }) => {
  const { hostelType } = route.params;
  const [messType, setMessType] = useState('');

  // Save the hostelType and messType in AsyncStorage
  const proceed = async () => {
    if (messType) {
      try {
        await AsyncStorage.setItem('hostelType', hostelType);
        await AsyncStorage.setItem('messType', messType);
        navigation.navigate('MenuDisplay', { hostelType, messType });
      } catch (error) {
        Alert.alert('Error', 'Failed to save your selection');
      }
    }
  };

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.header}>Select Your Mess Type</Text>
        <Text style={styles.subHeader}>We will help you find the right mess menu</Text>

        {/* Custom Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={messType}
            onValueChange={(itemValue) => setMessType(itemValue)}
            style={styles.picker}
            dropdownIconColor="#fff"
          >
            <Picker.Item label="Select mess type" value="" color="#aaa" />
            <Picker.Item label="Veg Mess" value="Veg Mess" />
            <Picker.Item label="Non-Veg Mess" value="Non-Veg Mess" />
            <Picker.Item label="Special Mess" value="Special Mess" />
          </Picker>
        </View>

        <TouchableOpacity
          style={[styles.button, !messType && styles.disabledButton]}
          onPress={proceed}
          disabled={!messType}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  subHeader: {
    fontSize: 16,
    color: '#d9e3f0',
    marginBottom: 40,
    textAlign: 'center',
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#2a5298',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  picker: {
    color: '#fff',
    padding: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
});

export default MessSelection;

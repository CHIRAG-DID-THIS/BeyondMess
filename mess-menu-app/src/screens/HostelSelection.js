import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Gradient background
import { Ionicons } from '@expo/vector-icons'; // Icons for buttons

// Import your logo from the assets folder
// import BeyondMessLogo from '../assets/logo (2).png'; // Make sure the path is correct

const HostelSelection = ({ navigation }) => {
  const selectHostel = (hostelType) => {
    navigation.navigate('MessSelection', { hostelType });
  };

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.gradient}>
      <View style={styles.container}>

        {/* Display the logo instead of the title */}
        {/* <Image 
          source={BeyondMessLogo} 
          style={styles.logo} 
          resizeMode="contain" 
        /> */}

        <Text style={styles.subHeader}>Find the perfect mess menu tailored for you</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option} onPress={() => selectHostel("Men's Hostel")}>
            <Ionicons name="man" size={28} color="#fff" style={styles.icon} />
            <Text style={styles.optionText}>Men's Hostel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => selectHostel("Ladies' Hostel")}>
            <Ionicons name="woman" size={28} color="#fff" style={styles.icon} />
            <Text style={styles.optionText}>Ladies' Hostel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { 
    flex: 1 
  }, // Full-screen gradient background

  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },

  // Style for the logo
  logo: {
    width: 200, // Adjust width to fit the logo
    height: 80, // Adjust height to fit the logo proportionally
    marginBottom: 30, // Space between logo and subHeader
  },

  subHeader: { 
    fontSize: 16, 
    color: '#d9e3f0', 
    marginBottom: 40, 
    textAlign: 'center',
    paddingHorizontal: 10
  },

  optionsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%',
  },

  option: { 
    backgroundColor: '#00aaff', 
    paddingVertical: 20, 
    paddingHorizontal: 30, 
    borderRadius: 12, 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    marginHorizontal: 10,
    width: '45%',
  },

  optionText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '600', 
    marginLeft: 10 
  },

  icon: {
    marginRight: 5,
  }
});

export default HostelSelection;


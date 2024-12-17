import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, Text, View, StyleSheet, Button, Platform } from 'react-native';
import HostelSelection from './src/screens/HostelSelection';
import MessSelection from './src/screens/MessSelection';
import MenuDisplay from './src/screens/MenuDisplay';
import CalorieTracker from './src/screens/CalorieTracker';
import FitnessTrackingScreen from './src/screens/FitnessTrackingScreen';
import ContactUsModal from './src/ContactUsModal';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, sendNotificationsToAll } from './src/NotificationService';
import 'react-native-get-random-values'; // Required for UUID generation
import { v4 as uuidv4 } from 'uuid'; // UUID library

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('HostelSelection');
  const [userId, setUserId] = useState(null);  // Store userId
  const notificationListener = useRef();
  const responseListener = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    const checkStorage = async () => {
      try {
        const hostelType = await AsyncStorage.getItem('hostelType');
        const messType = await AsyncStorage.getItem('messType');
        if (hostelType && messType) {
          setInitialRoute('MenuDisplay'); 
        }

        // Generate or fetch userId
        let storedUserId = await AsyncStorage.getItem('userId');
        if (!storedUserId) {
          storedUserId = uuidv4(); // Generate a random UUID
          await AsyncStorage.setItem('userId', storedUserId);  // Store userId in AsyncStorage
        }
        setUserId(storedUserId);
      } catch (error) {
        console.error('Error loading stored selection or user ID:', error);
      }
    };

    checkStorage();

    if (userId) {
      // Register for push notifications and store token
      registerForPushNotificationsAsync(userId).then(token => {
        setExpoPushToken(token);
      });
    }

    // Listeners for notifications
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification Received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification Response:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [userId]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#1e3c72',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            color: '#fff',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.contactButton}
            >
              <Text style={styles.contactButtonText}>Contact Me</Text>
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen name="HostelSelection" component={HostelSelection} options={{ title: 'Hostels' }} />
        <Stack.Screen name="MessSelection" component={MessSelection} options={{ title: 'Messes' }} />
        <Stack.Screen name="MenuDisplay" component={MenuDisplay} options={{ title: 'Menu' }} />
        <Stack.Screen name="CalorieTracker" component={CalorieTracker} options={{ title: '' }} />
        <Stack.Screen name="FitnessTracking" component={FitnessTrackingScreen} options={{ title: 'Fitness Tracking' }} />
      </Stack.Navigator>

      <ContactUsModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  contactButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#00aaff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});

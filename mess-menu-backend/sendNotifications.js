(async () => {
    const fetch = (await import('node-fetch')).default;  // Use dynamic import for node-fetch
    const { db } = require('./firebase');  // Your Firebase setup
    const { doc, getDoc } = require('firebase/firestore');
    
    // Function to fetch tokens from the single user document in Firestore
    async function fetchTokens() {
      try {
        const tokens = [];
        const userId = 'hardcodedUserIdForAllTokens';  // Assuming all tokens are stored under this user ID
        const userDoc = await getDoc(doc(db, 'expoPushTokens', userId));  // Access the user document
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.tokens && Array.isArray(userData.tokens)) {
            tokens.push(...userData.tokens);  // Fetch tokens from the user document's `tokens` field
          } else {
            console.log('No tokens found in user document.');
          }
        } else {
          console.log('User document not found.');
        }
        
        return tokens;
      } catch (error) {
        console.error('Error fetching tokens:', error);
        return [];
      }
    }
  
    // Function to send push notifications
    async function sendPushNotification(expoPushToken, message) {
      const body = {
        to: expoPushToken,
        sound: 'default',
        title: message.title,
        body: message.body,
        data: { extraData: message.data },
      };
  
      try {
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
  
        const result = await response.json();
        console.log('Notification response:', result);
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    }
  
    // Main function to fetch tokens and send notifications
    async function main() {
      const tokens = await fetchTokens();
      console.log('Fetched Tokens:', tokens);
  
      // Example message to send
      const message = {
        title: 'test notification',
        body: 'chain kuli ki maine kuli',
        data: { type: 'menu', date: new Date().toLocaleDateString() },
      };
  
      if (tokens.length > 0) {
        tokens.forEach(async (token) => {
          await sendPushNotification(token, message);
        });
      } else {
        console.log('No tokens available to send notifications.');
      }
    }
  
    main();
  })();
  
import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const ContactUsModal = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Contact Me</Text>
          <Text style={styles.contactText}>Chirag Garg</Text>

          <Text style={styles.messageText}>
            Thank you for using this app! I hope it makes your experience easier and more enjoyable.
            Feel free to reach out for any suggestions or bug reports—your feedback helps improve the app.
          </Text>
          
          <TouchableOpacity 
            style={styles.linkButton} 
            onPress={() => Linking.openURL('https://www.linkedin.com/in/chirag-garg-a2b948237/')}
          >
            <Text style={styles.contactLink}>LinkedIn</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.linkButton} 
            onPress={() => Linking.openURL('https://www.instagram.com/chirag_did_this/')}
          >
            <Text style={styles.contactLink}>Instagram</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e3c72',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  contactText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  messageText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  linkButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  contactLink: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e3c72',
    textTransform: 'uppercase',
  },
  closeButton: {
    marginTop: 30,
    backgroundColor: '#1e3c72',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default ContactUsModal;

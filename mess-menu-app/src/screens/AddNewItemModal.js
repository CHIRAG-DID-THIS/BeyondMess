// AddNewItemModal.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const AddNewItemModal = ({ visible, onClose, onAddNewItem }) => {
  const [newItem, setNewItem] = useState({ name: '', calories: '', quantity: 1 });

  const handleAddItem = () => {
    const { name, calories, quantity } = newItem;
    if (name && calories > 0 && quantity > 0) {
      onAddNewItem({ name, calories: parseInt(calories), quantity });
      setNewItem({ name: '', calories: '', quantity: 1 });
      onClose();
    } else {
      alert("Please enter valid item details");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Add New Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={newItem.name}
            onChangeText={(text) => setNewItem((prev) => ({ ...prev, name: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Calories"
            keyboardType="numeric"
            value={newItem.calories}
            onChangeText={(text) => setNewItem((prev) => ({ ...prev, calories: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="numeric"
            value={newItem.quantity.toString()}
            onChangeText={(text) => setNewItem((prev) => ({ ...prev, quantity: parseInt(text) || 1 }))}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e3c72',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 15,
    textAlign: 'center',
    borderBottomColor: '#1e3c72',
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AddNewItemModal;

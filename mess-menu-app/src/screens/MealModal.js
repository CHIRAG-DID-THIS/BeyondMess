// MealModal.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';

const MealModal = ({ visible, onClose, mealItems, onUpdateMeal, category }) => {
  const [items, setItems] = useState(mealItems);

  useEffect(() => {
    setItems(mealItems);
  }, [mealItems]);

  const handleQuantityChange = (index, adjustment) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = Math.max(0, updatedItems[index].quantity + adjustment); // Ensure non-negative quantity
    setItems(updatedItems);
    onUpdateMeal(updatedItems, category);
  };

  const handleCalorieChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].calories = Math.max(0, value); // Ensure non-negative calories
    setItems(updatedItems);
    onUpdateMeal(updatedItems, category);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Items</Text>

          {/* Labels Row */}
          <View style={styles.labelRow}>
            <Text style={[styles.label, styles.itemLabel]}>Item</Text>
            <Text style={[styles.label, styles.caloriesLabel]}>Calories</Text>
            <Text style={[styles.label, styles.quantityLabel]}>Quantity</Text>
          </View>

          {/* Items List */}
          <FlatList
            data={items}
            renderItem={({ item, index }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.name}</Text>

                {/* Calories Input */}
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Calories"
                  value={item.calories.toString()}
                  onChangeText={(value) => handleCalorieChange(index, parseInt(value) || 0)}
                />

                {/* Quantity Controls */}
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(index, -1)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>

                  <TextInput
                    style={styles.quantityInput}
                    keyboardType="numeric"
                    value={item.quantity.toString()}
                    onChangeText={(value) => handleQuantityChange(index, parseInt(value) || 0)}
                  />

                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(index, 1)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />

          {/* Close Button */}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1e3c72',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
  },
  itemLabel: {
    flex: 2,
  },
  caloriesLabel: {
    flex: 1,
    textAlign: 'center',
  },
  quantityLabel: {
    flex: 2,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemName: {
    flex: 2,
    fontSize: 16,
    color: '#34495e',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#3498db',
    textAlign: 'center',
  },
  quantityControls: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#3498db',
    textAlign: 'center',
    width: 40,
  },
  quantityButton: {
    backgroundColor: '#3498db',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default MealModal;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';

const PostVehicleScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState('Car');
  const [withDriver, setWithDriver] = useState(false);

  const vehicleTypes = [
    { id: '1', name: 'Car', icon: 'directions-car' },
    { id: '2', name: 'Bike', icon: 'motorcycle' },
    { id: '3', name: 'Tuk-Tuk', icon: 'auto-rickshaw' },
    { id: '4', name: 'Van', icon: 'airport-shuttle' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Post a Vehicle</Text>
      </View>

      {/* Vehicle Type Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehicle Type</Text>
        <View style={styles.typeContainer}>
          {vehicleTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                selectedType === type.name && styles.selectedType,
              ]}
              onPress={() => setSelectedType(type.name)}
            >
              <Icon 
                name={type.icon} 
                size={24} 
                color={selectedType === type.name ? COLORS.white : COLORS.primary} 
              />
              <Text style={[
                styles.typeText,
                selectedType === type.name && styles.selectedTypeText,
              ]}>
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Images Upload */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Images</Text>
        <View style={styles.imagesContainer}>
          <TouchableOpacity style={styles.addImageButton}>
            <Icon name="add-a-photo" size={32} color={COLORS.gray} />
            <Text style={styles.addImageText}>Add Image</Text>
          </TouchableOpacity>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>+ Add more</Text>
          </View>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter vehicle description..."
          placeholderTextColor={COLORS.lightGray}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* With Driver Toggle */}
      <View style={styles.section}>
        <View style={styles.toggleContainer}>
          <Text style={styles.sectionTitle}>With Driver</Text>
          <TouchableOpacity
            style={[
              styles.toggle,
              withDriver && styles.toggleActive,
            ]}
            onPress={() => setWithDriver(!withDriver)}
          >
            <View style={[
              styles.toggleCircle,
              withDriver && styles.toggleCircleActive,
            ]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter pickup location..."
          placeholderTextColor={COLORS.lightGray}
        />
      </View>

      {/* Contact Number */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact number</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your phone number..."
          placeholderTextColor={COLORS.lightGray}
          keyboardType="phone-pad"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    flex: 1,
    minWidth: '45%',
    justifyContent: 'center',
  },
  selectedType: {
    backgroundColor: COLORS.primary,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
  },
  selectedTypeText: {
    color: COLORS.white,
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  addImageButton: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  addImageText: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.gray,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  placeholderText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  textInput: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: COLORS.black,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggle: {
    width: 50,
    height: 28,
    backgroundColor: COLORS.lightGray,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: COLORS.primary,
  },
  toggleCircle: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginLeft: 0,
  },
  toggleCircleActive: {
    marginLeft: 22,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PostVehicleScreen;
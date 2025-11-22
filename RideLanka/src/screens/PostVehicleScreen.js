import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';

const PostVehicleScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState('Car');
  const [withDriver, setWithDriver] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  const vehicleTypes = [
    { id: '1', name: 'Car', icon: 'directions-car' },
    { id: '2', name: 'Bike', icon: 'motorcycle' },
    { id: '3', name: 'Tuk-Tuk', icon: 'moped' },
    { id: '4', name: 'Van', icon: 'airport-shuttle' },
    { id: '5', name: 'Bicycle', icon: 'pedal-bike' },
    { id: '6', name: 'SUV', icon: 'directions-car' }, 
    { id: '7', name: 'Jeep', icon: 'directions-car' },
  ];

  const locations = [
    'Colombo', 'Kandy', 'Galle', 'Negombo', 'Jaffna', 
    'Trincomalee', 'Anuradhapura', 'Matara', 'Ratnapura', 'Badulla'
  ];

  const renderLocationItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.modalItem,
        selectedLocation === item && styles.modalItemSelected
      ]}
      onPress={() => {
        setSelectedLocation(item);
        setLocationModalVisible(false);
      }}
    >
      <Text style={[
        styles.modalItemText,
        selectedLocation === item && styles.modalItemTextSelected
      ]}>
        {item}
      </Text>
      {selectedLocation === item && (
        <Icon name="check" size={20} color={COLORS.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Post a Vehicle</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Vehicle Type Selection  */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehicle Type</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typeContainer}
        >
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
        </ScrollView>
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

      {/* Location Dropdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <TouchableOpacity 
          style={styles.locationInput}
          onPress={() => setLocationModalVisible(true)}
        >
          <Text style={selectedLocation ? styles.selectedLocationText : styles.placeholderText}>
            {selectedLocation || 'Select pickup location...'}
          </Text>
          <Icon name="keyboard-arrow-down" size={20} color={COLORS.gray} />
        </TouchableOpacity>
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

      {/* Location Modal */}
      <Modal
        visible={locationModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Location</Text>
              <TouchableOpacity onPress={() => setLocationModalVisible(false)}>
                <Icon name="close" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={locations}
              renderItem={renderLocationItem}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  placeholder: {
    width: 40,
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
    gap: 12,
    paddingVertical: 4,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    minWidth: 100,
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
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 16,
  },
  selectedLocationText: {
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E3ECEA',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalItemSelected: {
    backgroundColor: '#F4FFFB',
  },
  modalItemText: {
    fontSize: 16,
    color: COLORS.black,
  },
  modalItemTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default PostVehicleScreen;
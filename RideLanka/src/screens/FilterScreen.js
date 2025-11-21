import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';

const vehicleTypes = ['Car', 'Bike', 'Tuk-Tuk', 'Van', 'Bicycle'];
const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const years = ['2024', '2025', '2026'];
const fuels = ['All', 'Gas', 'Petrol', 'Diesel'];

const FilterScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState('Car');
  const [priceValue, setPriceValue] = useState(50);
  const [selectedMonth, setSelectedMonth] = useState('Sep');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [withAC, setWithAC] = useState(true);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Icon name="close" size={20} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filter</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications-none" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>Vehicle Type :</Text>
        <View style={styles.chipRow}>
          {vehicleTypes.map((type) => {
            const selected = selectedType === type;
            return (
              <TouchableOpacity
                key={type}
                style={[styles.typeChip, selected && styles.typeChipSelected]}
                onPress={() => setSelectedType(type)}
              >
                <Icon
                  name="directions-car"
                  size={16}
                  color={selected ? COLORS.white : COLORS.primary}
                />
                <Text style={[styles.typeText, selected && styles.typeTextSelected]}>
                  {type}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionLabel}>Price Range :</Text>
        <View style={styles.sliderWrapper}>
          <View style={styles.sliderTrack}>
            <View style={[styles.sliderFill, { width: `${priceValue}%` }]} />
            <View style={[styles.sliderThumb, { left: `${priceValue - 5}%` }]}>
              <Text style={styles.sliderValue}>{priceValue}</Text>
            </View>
          </View>
          <View style={styles.sliderDots}>
            {[...new Array(7)].map((_, index) => (
              <View key={index} style={styles.sliderDot} />
            ))}
          </View>
        </View>

        <Text style={styles.sectionLabel}>Location :</Text>
        <View style={styles.inputField}>
          <Text style={styles.placeholder}>Select location</Text>
          <Icon name="location-on" size={18} color={COLORS.gray} />
        </View>

        <Text style={styles.sectionLabel}>Availability dates :</Text>
        <View style={styles.dropdownRow}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownLabel}>Month</Text>
            <View style={styles.dropdownValue}>
              <Text style={styles.dropdownText}>{selectedMonth}</Text>
              <Icon name="keyboard-arrow-down" size={18} color={COLORS.gray} />
            </View>
          </View>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownLabel}>Year</Text>
            <View style={styles.dropdownValue}>
              <Text style={styles.dropdownText}>{selectedYear}</Text>
              <Icon name="keyboard-arrow-down" size={18} color={COLORS.gray} />
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Fuel Type :</Text>
        <View style={styles.chipRow}>
          {fuels.map((fuel) => {
            const selected = selectedFuel === fuel;
            return (
              <TouchableOpacity
                key={fuel}
                style={[styles.fuelChip, selected && styles.fuelChipSelected]}
                onPress={() => setSelectedFuel(fuel)}
              >
                <Text style={[styles.fuelText, selected && styles.fuelTextSelected]}>
                  {fuel}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.sectionLabel}>A/C :</Text>
          <TouchableOpacity
            style={[styles.toggle, withAC && styles.toggleActive]}
            onPress={() => setWithAC((prev) => !prev)}
          >
            <View style={[styles.toggleCircle, withAC && styles.toggleCircleActive]} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    gap: 8,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  typeChipSelected: {
    backgroundColor: COLORS.primary,
  },
  typeText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  typeTextSelected: {
    color: COLORS.white,
  },
  sliderWrapper: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sliderTrack: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D6E6E3',
    position: 'relative',
    overflow: 'hidden',
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.secondary,
  },
  sliderThumb: {
    position: 'absolute',
    top: -18,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderValue: {
    color: COLORS.white,
    fontWeight: '700',
  },
  sliderDots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  sliderDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C5D9D5',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#D7E6E3',
  },
  placeholder: {
    color: COLORS.gray,
  },
  dropdownRow: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  dropdown: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D7E6E3',
  },
  dropdownLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 6,
  },
  dropdownValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.black,
  },
  fuelChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E3ECEA',
  },
  fuelChipSelected: {
    backgroundColor: COLORS.hero,
    borderColor: COLORS.hero,
  },
  fuelText: {
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: '600',
  },
  fuelTextSelected: {
    color: COLORS.white,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  toggle: {
    width: 56,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.lightGray,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: COLORS.primary,
  },
  toggleCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.white,
  },
  toggleCircleActive: {
    alignSelf: 'flex-end',
  },
  applyButton: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 30,
    backgroundColor: COLORS.hero,
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  applyText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default FilterScreen;


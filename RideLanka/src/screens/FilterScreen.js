import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';

const vehicleTypes = ['Car', 'Bike', 'Tuk-Tuk', 'Van', 'Bicycle', 'SUV', 'Jeep'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const years = ['2024', '2025', '2026'];
const fuels = ['All', 'Gas', 'Petrol', 'Diesel'];
const locations = [
  'Colombo', 'Kandy', 'Galle', 'Negombo', 'Jaffna',
  'Trincomalee', 'Anuradhapura', 'Matara', 'Ratnapura', 'Badulla'
];

const FilterScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState('Car');
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedMonth, setSelectedMonth] = useState('Sep');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [withAC, setWithAC] = useState(true);
  const [withDriver, setWithDriver] = useState(false);

  // Modal states
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Colombo');
  const handleApply = () => {
    const filterData = {
      vehicleType: selectedType,
      withDriver,
      priceRange: {
        min: minPrice,
        max: maxPrice
      },
      location: selectedLocation,
      availability: {
        month: selectedMonth,
        year: selectedYear
      },
      fuelType: selectedFuel,
      withAC
    };


    navigation.navigate('MainTabs', {
      screen: 'Explore',
      params: { filters: filterData }
    });
  };

  const handleReset = () => {
    setSelectedType('Car');
    setMinPrice(500);
    setMaxPrice(5000);
    setSelectedMonth('Sep');
    setSelectedYear('2025');
    setSelectedFuel('All');
    setWithAC(true);
    setWithDriver(false);
    setSelectedLocation('Colombo');
  };

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

  const renderMonthItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.modalItem,
        selectedMonth === item && styles.modalItemSelected
      ]}
      onPress={() => {
        setSelectedMonth(item);
        setMonthModalVisible(false);
      }}
    >
      <Text style={[
        styles.modalItemText,
        selectedMonth === item && styles.modalItemTextSelected
      ]}>
        {item}
      </Text>
      {selectedMonth === item && (
        <Icon name="check" size={20} color={COLORS.primary} />
      )}
    </TouchableOpacity>
  );

  const renderYearItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.modalItem,
        selectedYear === item && styles.modalItemSelected
      ]}
      onPress={() => {
        setSelectedYear(item);
        setYearModalVisible(false);
      }}
    >
      <Text style={[
        styles.modalItemText,
        selectedYear === item && styles.modalItemTextSelected
      ]}>
        {item}
      </Text>
      {selectedYear === item && (
        <Icon name="check" size={20} color={COLORS.primary} />
      )}
    </TouchableOpacity>
  );

  const PriceRangeSlider = () => {
    const min = 0;
    const max = 10000;
    const step = 100;

    const handleMinChange = (value) => {
      if (value <= maxPrice - 500) {
        setMinPrice(Math.round(value / step) * step);
      }
    };

    const handleMaxChange = (value) => {
      if (value >= minPrice + 500) {
        setMaxPrice(Math.round(value / step) * step);
      }
    };

    const getPercentage = (value) => ((value - min) / (max - min)) * 100;

    return (
      <View style={styles.priceSliderContainer}>
        <View style={styles.priceLabels}>
          <Text style={styles.priceLabel}>LKR {minPrice}</Text>
          <Text style={styles.priceLabel}>LKR {maxPrice}</Text>
        </View>

        <View style={styles.sliderTrack}>
          <View
            style={[
              styles.sliderRange,
              {
                left: `${getPercentage(minPrice)}%`,
                width: `${getPercentage(maxPrice) - getPercentage(minPrice)}%`
              }
            ]}
          />

          {/* Min Thumb */}
          <TouchableOpacity
            style={[
              styles.sliderThumb,
              styles.minThumb,
              { left: `${getPercentage(minPrice) - 2}%` }
            ]}
            activeOpacity={1}
          >
            <View style={styles.thumbCircle} />
          </TouchableOpacity>

          {/* Max Thumb */}
          <TouchableOpacity
            style={[
              styles.sliderThumb,
              styles.maxThumb,
              { left: `${getPercentage(maxPrice) - 2}%` }
            ]}
            activeOpacity={1}
          >
            <View style={styles.thumbCircle} />
          </TouchableOpacity>
        </View>

        <View style={styles.priceScale}>
          <Text style={styles.scaleText}>0</Text>
          <Text style={styles.scaleText}>2,500</Text>
          <Text style={styles.scaleText}>5,000</Text>
          <Text style={styles.scaleText}>7,500</Text>
          <Text style={styles.scaleText}>10,000</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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

      {/* Month Modal */}
      <Modal
        visible={monthModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMonthModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Month</Text>
              <TouchableOpacity onPress={() => setMonthModalVisible(false)}>
                <Icon name="close" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={months}
              renderItem={renderMonthItem}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              numColumns={3}
              contentContainerStyle={styles.gridContainer}
            />
          </View>
        </View>
      </Modal>

      {/* Year Modal */}
      <Modal
        visible={yearModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setYearModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Year</Text>
              <TouchableOpacity onPress={() => setYearModalVisible(false)}>
                <Icon name="close" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={years}
              renderItem={renderYearItem}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Icon name="close" size={20} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filter</Text>
          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Vehicle Type */}
        <Text style={styles.sectionLabel}>Vehicle Type :</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
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
        </ScrollView>

        {/* With/Without Driver */}
        <View style={styles.toggleSection}>
          <Text style={styles.sectionLabel}>With Driver :</Text>
          <TouchableOpacity
            style={[styles.toggle, withDriver && styles.toggleActive]}
            onPress={() => setWithDriver((prev) => !prev)}
          >
            <View style={[styles.toggleCircle, withDriver && styles.toggleCircleActive]} />
          </TouchableOpacity>
        </View>

        {/* Price Range */}
        <Text style={styles.sectionLabel}>Price Range (LKR/day) :</Text>
        <View style={styles.priceSection}>
          <PriceRangeSlider />
        </View>

        {/* Location Dropdown */}
        <Text style={styles.sectionLabel}>Location :</Text>
        <TouchableOpacity
          style={styles.inputField}
          onPress={() => setLocationModalVisible(true)}
        >
          <Text style={selectedLocation ? styles.selectedText : styles.placeholder}>
            {selectedLocation || 'Select location'}
          </Text>
          <Icon name="keyboard-arrow-down" size={18} color={COLORS.gray} />
        </TouchableOpacity>

        {/* Availability Dates */}
        <Text style={styles.sectionLabel}>Availability dates :</Text>
        <View style={styles.dropdownRow}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setMonthModalVisible(true)}
          >
            <Text style={styles.dropdownLabel}>Month</Text>
            <View style={styles.dropdownValue}>
              <Text style={styles.dropdownText}>{selectedMonth}</Text>
              <Icon name="keyboard-arrow-down" size={18} color={COLORS.gray} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setYearModalVisible(true)}
          >
            <Text style={styles.dropdownLabel}>Year</Text>
            <View style={styles.dropdownValue}>
              <Text style={styles.dropdownText}>{selectedYear}</Text>
              <Icon name="keyboard-arrow-down" size={18} color={COLORS.gray} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Fuel Type */}
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

        {/* A/C Toggle */}
        <View style={styles.toggleSection}>
          <Text style={styles.sectionLabel}>A/C :</Text>
          <TouchableOpacity
            style={[styles.toggle, withAC && styles.toggleActive]}
            onPress={() => setWithAC((prev) => !prev)}
          >
            <View style={[styles.toggleCircle, withAC && styles.toggleCircleActive]} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Apply Button */}
      <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
        <Text style={styles.applyText}>Apply Filters</Text>
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
  resetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  resetText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
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
  horizontalScroll: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 12,
    marginBottom: 24, 
  },
  toggleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24, 
  },
  priceSection: {
    marginBottom: 24, 
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
    marginRight: 8,
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
  priceSliderContainer: {
    paddingHorizontal: 20,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D6E6E3',
    position: 'relative',
    marginBottom: 8,
  },
  sliderRange: {
    position: 'absolute',
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    top: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  thumbCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  priceScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  scaleText: {
    fontSize: 10,
    color: COLORS.gray,
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
  selectedText: {
    color: COLORS.black,
    fontWeight: '500',
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
    fontWeight: '500',
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
  gridContainer: {
    padding: 10,
  },
});

export default FilterScreen;
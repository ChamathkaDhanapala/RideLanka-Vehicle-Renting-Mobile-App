import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';

const ExploreScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Car');

  const categories = [
    { id: '1', name: 'Car', icon: 'directions-car' },
    { id: '2', name: 'Bike', icon: 'motorcycle' },
    { id: '3', name: 'Tuk-Tuk', icon: 'auto-rickshaw' },
    { id: '4', name: 'Van', icon: 'airport-shuttle' },
  ] || [];

  const vehicles = [
    {
      id: '1',
      name: 'BMW X5',
      type: 'SUV',
      price: '1000 LKR /day',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
    },
    {
      id: '2',
      name: 'Toyota Prius',
      type: 'Car',
      price: '800 LKR /day',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
    },
    {
      id: '3',
      name: 'Honda Civic',
      type: 'Car',
      price: '750 LKR /day',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
    },
  ];

  const renderVehicleCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.vehicleCard}
      onPress={() => navigation.navigate('VehicleDetails', { vehicle: item })}
    >
      <Image source={{ uri: item.image }} style={styles.vehicleImage} />
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleName}>{item.name}</Text>
        <Text style={styles.vehicleType}>{item.type}</Text>
        <Text style={styles.vehiclePrice}>{item.price}</Text>
        <TouchableOpacity
          style={styles.seeMoreButton}
          onPress={() => navigation.navigate('VehicleDetails', { vehicle: item })}
        >
          <Text style={styles.seeMoreText}>See more</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Vehicle Rent</Text>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Icon name="notifications" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInput}>
            <Icon name="search" size={20} color={COLORS.gray} />
            <Text style={styles.searchText}>Search vehicles...</Text>
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate('Filter')}
          >
            <Icon name="tune" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Vehicle Type</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.name && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Icon 
                name={category.icon} 
                size={20} 
                color={selectedCategory === category.name ? COLORS.white : COLORS.primary} 
              />
              <Text style={[
                styles.categoryText,
                selectedCategory === category.name && styles.selectedCategoryText,
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Cars */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Cars</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={vehicles}
          renderItem={renderVehicleCard}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
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
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  filterButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  searchText: {
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.gray,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    marginBottom: 16,
  },
  seeAllText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  categoryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
  },
  selectedCategoryText: {
    color: COLORS.white,
  },
  vehicleCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  vehicleImage: {
    width: '100%',
    height: 150,
  },
  vehicleInfo: {
    padding: 16,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  vehicleType: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 8,
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary,
    marginBottom: 12,
  },
  seeMoreButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  seeMoreText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ExploreScreen;
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const VEHICLES_BY_CATEGORY = {
  Car: [
    {
      id: 'car-1',
      name: 'BMW M4',
      price: '1000 LKR /day',
      location: 'Colombo',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=900',
      features: ['Automatic', 'Petrol', '5 Seats'],
    },
    {
      id: 'car-2',
      name: 'Mini Cooper',
      price: '900 LKR /day',
      location: 'Kandy',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800',
      features: ['Automatic', 'Hybrid', '4 Seats'],
    },
  ],
  Bike: [
    {
      id: 'bike-1',
      name: 'Yamaha MT 15',
      price: '300 LKR /day',
      location: 'Galle',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&auto=format&fit=crop&q=80',
      features: ['Manual', 'Petrol', '2 Seats'],
    },
    {
      id: 'bike-2',
      name: 'Honda CBR',
      price: '350 LKR /day',
      location: 'Matara',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&auto=format&fit=crop&q=80',
      features: ['Manual', 'Petrol', '2 Seats'],
    },
  ],
  'Tuk-Tuk': [
    {
      id: 'tuk-1',
      name: 'Bajaj RE',
      price: '250 LKR /day',
      location: 'Colombo',
      image: 'https://images.unsplash.com/photo-1592222722943-6bc4e115b592?w=400&auto=format&fit=crop&q=80',
      features: ['Manual', 'Petrol', '3 Seats'],
    },
  ],
  Van: [
    {
      id: 'van-1',
      name: 'Toyota Hiace',
      price: '1500 LKR /day',
      location: 'Negombo',
      image: 'https://images.unsplash.com/photo-1529429617124-aee711a70486?w=900',
      features: ['Automatic', 'Diesel', '8 Seats'],
    },
  ],
  Bicycle: [
    {
      id: 'bicycle-1',
      name: 'Giant Escape',
      price: '120 LKR /day',
      location: 'Galle Face',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=700',
      features: ['Manual', 'No Fuel', '1 Seat'],
    },
  ],
  SUV: [
    {
      id: 'suv-1',
      name: 'Range Rover Sport',
      price: '1800 LKR /day',
      location: 'Colombo 7',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=950',
      features: ['Automatic', 'Diesel', '7 Seats'],
    },
  ],
  Jeep: [
    {
      id: 'jeep-1',
      name: 'Jeep Wrangler',
      price: '1600 LKR /day',
      location: 'Ella',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=880',
      features: ['Automatic', 'Petrol', '5 Seats'],
    },
  ],
};

const CategoryListingScreen = ({ navigation, route }) => {
  const category = route?.params?.category || 'Car';
  const list = VEHICLES_BY_CATEGORY[category] || [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={20} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{category}</Text>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={18} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchInput}>
            <Ionicons name="search" size={18} color={COLORS.gray} />
            <Text style={styles.searchPlaceholder}>Search {category}...</Text>
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate('Filter')}
          >
            <MaterialIcons name="tune" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {list.map((vehicle) => (
          <TouchableOpacity
            key={vehicle.id}
            style={styles.card}
            onPress={() => navigation.navigate('VehicleDetails', { vehicle })}
          >
            <Image source={{ uri: vehicle.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{vehicle.name}</Text>
                <Text style={styles.price}>{vehicle.price}</Text>
              </View>
              <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={14} color={COLORS.secondary} />
                <Text style={styles.locationText}>{vehicle.location}</Text>
              </View>
              <View style={styles.featureRow}>
                {vehicle.features.map((feature, index) => (
                  <View key={index} style={styles.featureChip}>
                    <MaterialIcons name="check-circle" size={14} color={COLORS.primary} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.cardFooter}>
                <TouchableOpacity
                  style={styles.seeMoreButton}
                  onPress={() => navigation.navigate('VehicleDetails', { vehicle })}
                >
                  <Text style={styles.seeMoreText}>See more</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerIcon: {
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: COLORS.gray,
    fontSize: 15,
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  locationText: {
    color: COLORS.gray,
    fontSize: 13,
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  featureText: {
    fontSize: 12,
    color: COLORS.black,
  },
  cardFooter: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  seeMoreButton: {
    backgroundColor: COLORS.hero,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  seeMoreText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CategoryListingScreen;


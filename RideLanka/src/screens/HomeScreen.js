import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const avatar =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80';

const categories = [
  { id: '1', name: 'Car', icon: 'directions-car', route: 'CategoryCar' },
  { id: '2', name: 'Bike', icon: 'two-wheeler', route: 'CategoryBike' },
  { id: '3', name: 'Tuk-Tuk', icon: 'airport-shuttle', route: 'CategoryTukTuk' },
  { id: '4', name: 'Van', icon: 'directions-transit-filled', route: 'CategoryVan' },
  { id: '5', name: 'Bicycle', icon: 'pedal-bike', route: 'CategoryBicycle' },
  { id: '6', name: 'SUV', icon: 'directions-car-filled', route: 'CategorySUV' },
  { id: '7', name: 'Jeep', icon: 'directions-car', route: 'CategoryJeep' },
];

const popularVehicles = [
  {
    id: '1',
    name: 'BMW X5',
    location: 'Colombo',
    price: '1000 LKR /hr',
    rating: 4.9,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    features: [
      { icon: 'settings', label: 'Manual' },
      { icon: 'local-gas-station', label: 'Petrol' },
      { icon: 'airline-seat-recline-normal', label: '5 Seats' },
    ],
  },
  {
    id: '2',
    name: 'Honda CBR',
    location: 'Galle',
    price: '500 LKR /hr',
    rating: 4.5,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
    features: [
      { icon: 'settings', label: 'Manual' },
      { icon: 'speed', label: '200 CC' },
      { icon: 'airline-seat-recline-normal', label: '2 Seats' },
    ],
  },
];

const HomeScreen = ({ navigation }) => {
  const renderCategory = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.categoryCard}
      onPress={() => navigation.navigate(item.route, { category: item.name })}
    >
      <View style={styles.categoryIcon}>
        <MaterialIcons name={item.icon} size={26} color={COLORS.primary} />
      </View>
      <Text style={styles.categoryLabel}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderVehicleCard = (vehicle) => (
    <TouchableOpacity
      key={vehicle.id}
      style={styles.vehicleCard}
      onPress={() => navigation.navigate('VehicleDetails', { vehicle })}
    >
      <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} />
      <View style={styles.ratingBadge}>
        <Ionicons name="star" size={12} color="#FBBF24" />
        <Text style={styles.ratingText}>{vehicle.rating}</Text>
      </View>
      <View style={styles.vehicleContent}>
        <View style={styles.vehicleHeader}>
          <View>
            <View style={styles.vehicleLocation}>
              <Ionicons name="location-sharp" size={14} color={COLORS.secondary} />
              <Text style={styles.vehicleLocationText}>{vehicle.location}</Text>
            </View>
            <Text style={styles.vehicleName}>{vehicle.name}</Text>
            <Text style={styles.vehiclePrice}>{vehicle.price}</Text>
          </View>
          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>{vehicle.status}</Text>
            <View style={styles.statusDot} />
          </View>
        </View>

        <View style={styles.featureRow}>
          {vehicle.features.map((feature, index) => (
            <View key={index} style={styles.featureChip}>
              <MaterialIcons name={feature.icon} size={14} color={COLORS.gray} />
              <Text style={styles.featureChipText}>{feature.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.hero} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.greeting}>Hi! David</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={14} color={COLORS.white} />
                <Text style={styles.locationText}>Colombo, Sri Lanka</Text>
                <Ionicons name="chevron-down" size={14} color={COLORS.white} />
              </View>
            </View>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Ionicons name="notifications-outline" size={20} color={COLORS.hero} />
            </TouchableOpacity>
          </View>
          <Text style={styles.heroHeadline}>Find Your Ride. Feel the Island.</Text>
        </View>

        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Explore')}
        >
          <View style={styles.searchIconWrapper}>
            <Ionicons name="search" size={18} color={COLORS.white} />
          </View>
          <Text style={styles.searchPlaceholder}>Search</Text>
        </TouchableOpacity>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          <View style={styles.categoryGrid}>
            {categories.map(renderCategory)}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Vehicles</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {popularVehicles.map(renderVehicleCard)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  heroCard: {
    backgroundColor: COLORS.hero,
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.white,
    padding: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    color: COLORS.white,
    fontSize: 12,
    opacity: 0.9,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroHeadline: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    marginTop: 24,
    lineHeight: 32,
  },
  searchBar: {
    marginHorizontal: 24,
    marginTop: -22,
    marginBottom: 24,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  searchIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: COLORS.gray,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  seeAll: {
    color: COLORS.secondary,
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryCard: {
    width: '30%',
    alignItems: 'center',
    gap: 8,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.black,
  },
  vehicleCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  vehicleImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.black,
  },
  vehicleContent: {
    padding: 16,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  vehicleLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  vehicleLocationText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    marginTop: 4,
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginTop: 4,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.softTeal,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
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
  featureChipText: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '500',
  },
});

export default HomeScreen;
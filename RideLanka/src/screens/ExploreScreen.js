import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';
import { VEHICLE_DATA, ALL_VEHICLES } from '../data/vehicles';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 40 - CARD_MARGIN) / 2;

const ExploreScreen = ({ navigation, route }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);

  const filters = route.params?.filters;

  const categories = [
    { id: '1', name: 'All', icon: 'all-inclusive' },
    { id: '2', name: 'Car', icon: 'directions-car' },
    { id: '3', name: 'Bike', icon: 'motorcycle' },
    { id: '4', name: 'Tuk-Tuk', icon: 'moped' },
    { id: '5', name: 'Van', icon: 'airport-shuttle' },
    { id: '6', name: 'Bicycle', icon: 'pedal-bike' },
    { id: '7', name: 'SUV', icon: 'suv' },
    { id: '8', name: 'Jeep', icon: 'jeep' },
  ];


  let filteredVehicles = selectedCategory === 'All'
    ? ALL_VEHICLES
    : VEHICLE_DATA[selectedCategory] || [];

  if (filters) {
    filteredVehicles = filteredVehicles.filter(vehicle => {
      if (filters.vehicleType && filters.vehicleType !== 'All' && vehicle.type !== filters.vehicleType) {
        return false;
      }
      if (filters.location && vehicle.location !== filters.location) {
        return false;
      }
      if (filters.priceRange) {
        const price = parseInt(vehicle.price.replace(/[^0-9]/g, ''));
        if (price < filters.priceRange.min || price > filters.priceRange.max) {
          return false;
        }
      }
      return true;
    });
  }

  const toggleFavorite = (vehicleId) => {
    if (favorites.includes(vehicleId)) {
      setFavorites(favorites.filter(id => id !== vehicleId));
    } else {
      setFavorites([...favorites, vehicleId]);
    }
  };

  const renderVehicleCard = ({ item }) => (
    <TouchableOpacity
      style={styles.vehicleCard}
      onPress={() => navigation.navigate('VehicleDetails', { vehicle: item })}
    >
      <Image source={{ uri: item.image }} style={styles.vehicleImage} />

      {/* Favorite Button */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Icon
          name={favorites.includes(item.id) ? "favorite" : "favorite-border"}
          size={20}
          color={favorites.includes(item.id) ? COLORS.error : COLORS.white}
        />
      </TouchableOpacity>

      <View style={styles.ratingBadge}>
        <Icon name="star" size={12} color="#FBBF24" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>

      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleName} numberOfLines={1}>{item.name}</Text>

        {/* Location */}
        <View style={styles.locationRow}>
          <Icon name="location-on" size={12} color={COLORS.gray} />
          <Text style={styles.vehicleLocation}>{item.location}</Text>
        </View>

        <Text style={styles.vehiclePrice}>{item.price}</Text>

        {/* Features as tags */}
        <View style={styles.features}>
          {item.features.slice(0, 2).map((feature, index) => (
            <View key={index} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

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
          <Text style={styles.title}>Explore Vehicles</Text>
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

        {/* Applied Filters Indicator */}
        {filters && (
          <View style={styles.filtersIndicator}>
            <Text style={styles.filtersText}>
              Filters applied: {filters.vehicleType} • {filters.location}
            </Text>
            <TouchableOpacity onPress={() => navigation.setParams({ filters: null })}>
              <Text style={styles.clearFiltersText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
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
        </ScrollView>

        {/* Vehicles Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Vehicles' : selectedCategory + 's'}
          </Text>
          <Text style={styles.vehicleCount}>({filteredVehicles.length})</Text>
        </View>

        {filteredVehicles.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="search-off" size={60} color={COLORS.gray} />
            <Text style={styles.emptyStateText}>No vehicles found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your filters or search criteria
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredVehicles}
            renderItem={renderVehicleCard}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.vehiclesGrid}
          />
        )}
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
    marginBottom: 16,
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
  filtersIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
  },
  filtersText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  clearFiltersText: {
    fontSize: 14,
    color: COLORS.error,
    fontWeight: '600',
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
  vehicleCount: {
    color: COLORS.gray,
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    marginRight: 12,
    minWidth: 100,
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
  vehiclesGrid: {
    paddingHorizontal: 12,
  },
  vehicleCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    margin: CARD_MARGIN,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  vehicleImage: {
    width: '100%',
    height: 120,
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.black,
  },
  vehicleInfo: {
    padding: 12,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  vehicleLocation: {
    fontSize: 12,
    color: COLORS.gray,
  },
  vehiclePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.secondary,
    marginBottom: 8,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 8,
  },
  featureTag: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  featureText: {
    fontSize: 10,
    color: COLORS.gray,
    fontWeight: '500',
  },
  seeMoreButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  seeMoreText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ExploreScreen;
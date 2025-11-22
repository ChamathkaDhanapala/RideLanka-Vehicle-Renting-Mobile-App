import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { VEHICLE_DATA } from '../data/vehicles';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 40 - CARD_MARGIN) / 2;

const CategoryListingScreen = ({ navigation, route }) => {
  const category = route?.params?.category || 'Car';
  const [favorites, setFavorites] = useState([]);
  
  const list = VEHICLE_DATA[category] || [];

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
        <MaterialIcons 
          name={favorites.includes(item.id) ? "favorite" : "favorite-border"} 
          size={20} 
          color={favorites.includes(item.id) ? COLORS.error : COLORS.white} 
        />
      </TouchableOpacity>
      
      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.vehicleType}>{item.location}</Text>
        <Text style={styles.vehiclePrice}>{item.price}</Text>
        
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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
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

      {/* Search Bar */}
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

      {/* Vehicle Count */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {list.length} {category}{list.length !== 1 ? 's' : ''} Available
        </Text>
      </View>

      {/* 2-Column Grid */}
      <FlatList
        data={list}
        renderItem={renderVehicleCard}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.vehiclesGrid}
      />
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
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  vehiclesGrid: {
    paddingHorizontal: 12,
    paddingBottom: 20,
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
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
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
    marginBottom: 2,
  },
  vehicleType: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 4,
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
});

export default CategoryListingScreen;
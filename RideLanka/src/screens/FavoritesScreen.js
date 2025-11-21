import React from 'react';
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

const FavoritesScreen = ({ navigation }) => {
  const favoriteVehicles = [
    {
      id: '1',
      name: 'BMW X5',
      type: 'SUV',
      price: '1000 LKR /hr',
      location: 'Colombo',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
      transmission: 'Manual',
      fuel: 'Petrol',
      seats: '5 Seats',
      available: true,
    },
    {
      id: '2',
      name: 'Honda Scoopy',
      type: 'Scooter',
      price: '500 LKR /hr',
      location: 'Colombo',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&auto=format&fit=crop',
      transmission: 'Manual',
      fuel: 'Petrol',
      seats: '2 Seats',
      available: true,
    },
  ];

  const renderFavoriteCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.favoriteCard}
      onPress={() => navigation.navigate('VehicleDetails', { vehicle: item })}
    >
      <Image source={{ uri: item.image }} style={styles.vehicleImage} />
      
      <View style={styles.vehicleContent}>
        <View style={styles.vehicleHeader}>
          <View>
            <Text style={styles.location}>{item.location}</Text>
            <View style={styles.namePriceRow}>
              <Text style={styles.vehicleName}>{item.name}</Text>
              <Text style={styles.vehiclePrice}>{item.price}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.removeButton}>
            <Icon name="favorite" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.features}>
          <View style={styles.featureTag}>
            <Icon name="settings" size={14} color={COLORS.gray} />
            <Text style={styles.featureText}>{item.transmission}</Text>
          </View>
          <View style={styles.featureTag}>
            <Icon name="local-gas-station" size={14} color={COLORS.gray} />
            <Text style={styles.featureText}>{item.fuel}</Text>
          </View>
          <View style={styles.featureTag}>
            <Icon name="person" size={14} color={COLORS.gray} />
            <Text style={styles.featureText}>{item.seats}</Text>
          </View>
        </View>

        <View style={styles.availability}>
          <View style={styles.availableDot} />
          <Text style={styles.availableText}>Available</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Favorite vehicles</Text>
        </View>

        {favoriteVehicles.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="favorite-border" size={64} color={COLORS.lightGray} />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyText}>
              Start adding vehicles to your favorites list
            </Text>
          </View>
        ) : (
          <FlatList
            data={favoriteVehicles}
            renderItem={renderFavoriteCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.lightGray,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  favoriteCard: {
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
    height: 160,
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
  location: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
    marginBottom: 4,
  },
  namePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  removeButton: {
    padding: 4,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  featureTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  featureText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  availability: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  availableDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
  availableText: {
    fontSize: 14,
    color: COLORS.success,
    fontWeight: '500',
  },
});

export default FavoritesScreen;
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
      image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=380&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
        {/* Header with Back Button and Notification Icon */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={20} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Favorite vehicles</Text>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Icon name="notifications" size={20} color={COLORS.white} />
          </TouchableOpacity>
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
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
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
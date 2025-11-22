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

const FALLBACK_VEHICLE = {
  id: '1',
  name: 'BMW M4',
  type: 'Coupe',
  price: '1000 LKR /day',
  location: 'Colombo',
  rating: 4.9,
  reviews: '5 ratings',
  status: 'Available',
  image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200',
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.',
  features: [
    { label: 'Automatic', icon: 'settings' },
    { label: 'Petrol', icon: 'local-gas-station' },
    { label: 'A/C', icon: 'ac-unit' },
  ],
  owner: 'Nihal Senarathne',
  ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
};

const normalizeFeatures = (features = []) => {
  return features.map((feature) => {
    if (typeof feature === 'string') {
      const lower = feature.toLowerCase();
      const icon =
        lower.includes('auto') ? 'settings' :
        lower.includes('petrol') || lower.includes('fuel') ? 'local-gas-station' :
        lower.includes('seat') ? 'airline-seat-recline-normal' :
        lower.includes('a/c') ? 'ac-unit' :
        'check';
      return { label: feature, icon };
    }
    return feature;
  });
};

const VehicleDetailsScreen = ({ navigation, route }) => {
  const vehicle = { ...FALLBACK_VEHICLE, ...(route?.params?.vehicle || {}) };
  const features = normalizeFeatures(vehicle.features || FALLBACK_VEHICLE.features);
  const galleryImages = vehicle.images || [
    vehicle.image || FALLBACK_VEHICLE.image,
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Vehicle Detail</Text>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <Image source={{ uri: galleryImages[0] }} style={styles.heroImage} />
          <View style={styles.dotsRow}>
            {galleryImages.slice(0, 4).map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === 0 && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryLeft}>
            <Text style={styles.vehicleTitle}>{vehicle.name}</Text>
            <Text style={styles.vehiclePrice}>{vehicle.price}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={14} color={COLORS.secondary} />
              <Text style={styles.locationText}>{vehicle.location}</Text>
            </View>
          </View>
          <View style={styles.summaryRight}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#FBBF24" />
              <Text style={styles.ratingText}>{vehicle.rating || 4.9}</Text>
              <Text style={styles.ratingSub}>{vehicle.reviews || '5 ratings'}</Text>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>{vehicle.status || 'Available'}</Text>
              <View style={styles.statusDot} />
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Description :</Text>
          <Text style={styles.sectionBody}>{vehicle.description}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Highlights :</Text>
          <View style={styles.featuresRow}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureChip}>
                <MaterialIcons
                  name={feature.icon}
                  size={16}
                  color={COLORS.primary}
                />
                <Text style={styles.featureLabel}>{feature.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.ownerCard}>
          <Text style={styles.sectionTitle}>Owner :</Text>
          <View style={styles.ownerRow}>
            <Image
              source={{ uri: vehicle.ownerAvatar || FALLBACK_VEHICLE.ownerAvatar }}
              style={styles.ownerAvatar}
            />
            <View>
              <Text style={styles.ownerName}>{vehicle.owner}</Text>
              <Text style={styles.ownerMeta}>Verified host</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.ctaContainer}>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => navigation.navigate('Contact', { vehicle })}
        >
          <Text style={styles.contactText}>Contact Owner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    marginBottom: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  heroCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 220,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: COLORS.primary,
  },
  summaryCard: {
    flexDirection: 'row',
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginBottom: 20,
    gap: 16,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  summaryLeft: {
    flex: 1,
  },
  vehicleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 4,
  },
  vehiclePrice: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  locationText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  summaryRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.black,
  },
  ratingSub: {
    fontSize: 12,
    color: COLORS.gray,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.softTeal,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
  sectionCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 12,
  },
  sectionBody: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 22,
  },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F4FFFB',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#D7F2EA',
  },
  featureLabel: {
    fontSize: 13,
    color: COLORS.black,
    fontWeight: '500',
  },
  ownerCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#DFF2ED',
    marginBottom: 20,
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ownerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
  },
  ownerMeta: {
    fontSize: 12,
    color: COLORS.gray,
  },
  ctaContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 30,
  },
  contactButton: {
    backgroundColor: COLORS.hero,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  contactText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default VehicleDetailsScreen;
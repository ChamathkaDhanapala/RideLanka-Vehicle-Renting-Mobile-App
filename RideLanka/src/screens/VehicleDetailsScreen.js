import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Modal,
  FlatList,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const { width: screenWidth } = Dimensions.get('window');

const FALLBACK_VEHICLE = {
  id: '1',
  name: 'BMW M4',
  type: 'Coupe',
  price: '1000 LKR /day',
  location: 'Colombo Fort',
  coordinates: {
    latitude: 6.9271,
    longitude: 79.8612,
  },
  rating: 4.9,
  reviews: '5 ratings',
  status: 'Available',
  images: [
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200',
  ],
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.',
  features: [
    { label: 'Automatic', icon: 'settings' },
    { label: 'Petrol', icon: 'local-gas-station' },
    { label: 'A/C', icon: 'ac-unit' },
    { label: '4 Seats', icon: 'airline-seat-recline-normal' },
    { label: 'Bluetooth', icon: 'bluetooth' },
    { label: 'GPS', icon: 'gps-fixed' },
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
                lower.includes('bluetooth') ? 'bluetooth' :
                  lower.includes('gps') ? 'gps-fixed' :
                    'check';
      return { label: feature, icon };
    }
    return feature;
  });
};

const VehicleDetailsScreen = ({ navigation, route }) => {
  const vehicle = { ...FALLBACK_VEHICLE, ...(route?.params?.vehicle || {}) };
  const features = normalizeFeatures(vehicle.features || FALLBACK_VEHICLE.features);
  const galleryImages = vehicle.images || FALLBACK_VEHICLE.images;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const handleOpenMaps = () => {
    const { latitude, longitude } = vehicle.coordinates || FALLBACK_VEHICLE.coordinates;

    if (Platform.OS === 'ios') {
      // Apple Maps
      Linking.openURL(`http://maps.apple.com/?ll=${latitude},${longitude}&q=${encodeURIComponent(vehicle.location)}`);
    } else {
      // Android - Google Maps
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`);
    }
  };

  const handleImagePress = (index) => {
    setModalIndex(index);
    setModalVisible(true);
  };

  const renderImageItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.galleryImageContainer,
        index === 0 && styles.firstGalleryImage
      ]}
      onPress={() => handleImagePress(index)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item }} style={styles.galleryImage} />
      {index === 3 && galleryImages.length > 4 && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>+{galleryImages.length - 4}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderModalItem = ({ item }) => (
    <View style={styles.modalImageContainer}>
      <Image source={{ uri: item }} style={styles.modalImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Image Gallery Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={28} color={COLORS.white} />
          </TouchableOpacity>

          <FlatList
            data={galleryImages}
            renderItem={renderModalItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={modalIndex}
            getItemLayout={(data, index) => ({
              length: screenWidth,
              offset: screenWidth * index,
              index,
            })}
          />

          <View style={styles.modalPagination}>
            <Text style={styles.modalPaginationText}>
              {modalIndex + 1} / {galleryImages.length}
            </Text>
          </View>
        </View>
      </Modal>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Header */}
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

        {/* Main Hero Image */}
        <View style={styles.heroCard}>
          <TouchableOpacity onPress={() => handleImagePress(0)} activeOpacity={0.9}>
            <Image source={{ uri: galleryImages[0] }} style={styles.heroImage} />
          </TouchableOpacity>
          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>
              1 / {galleryImages.length}
            </Text>
          </View>
          <View style={styles.dotsRow}>
            {galleryImages.slice(0, 4).map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === activeImageIndex && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        {/* Gallery Grid */}
        {galleryImages.length > 1 && (
          <View style={styles.gallerySection}>
            <Text style={styles.galleryTitle}>More Photos</Text>
            <FlatList
              data={galleryImages.slice(1, 4)}
              renderItem={renderImageItem}
              keyExtractor={(item, index) => `gallery-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.galleryList}
            />
          </View>
        )}

        {/* Vehicle Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryLeft}>
            <Text style={styles.vehicleTitle}>{vehicle.name}</Text>
            <Text style={styles.vehicleType}>{vehicle.type}</Text>
            <Text style={styles.vehiclePrice}>{vehicle.price}</Text>

            <TouchableOpacity
              style={styles.locationRow}
              onPress={handleOpenMaps}
              activeOpacity={0.7}
            >
              <Ionicons name="location-sharp" size={16} color={COLORS.secondary} />
              <Text style={styles.locationText}>{vehicle.location}</Text>
              <Ionicons name="open-outline" size={14} color={COLORS.gray} />
            </TouchableOpacity>
          </View>

          <View style={styles.summaryRight}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#FBBF24" />
              <Text style={styles.ratingText}>{vehicle.rating || 4.9}</Text>
              <Text style={styles.ratingSub}>{vehicle.reviews || '5 ratings'}</Text>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>{vehicle.status || 'Available'}</Text>
              <View style={styles.statusDot} />
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionBody}>{vehicle.description}</Text>
        </View>

        {/* Features */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureChip}>
                <MaterialIcons
                  name={feature.icon}
                  size={18}
                  color={COLORS.primary}
                />
                <Text style={styles.featureLabel}>{feature.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Owner Info */}
        <View style={styles.ownerCard}>
          <Text style={styles.sectionTitle}>Owner Information</Text>
          <View style={styles.ownerRow}>
            <Image
              source={{ uri: vehicle.ownerAvatar || FALLBACK_VEHICLE.ownerAvatar }}
              style={styles.ownerAvatar}
            />
            <View style={styles.ownerInfo}>
              <Text style={styles.ownerName}>{vehicle.owner}</Text>
              <Text style={styles.ownerMeta}>Verified host • 5+ rentals</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* CTA Button */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => navigation.navigate('Contact', { vehicle })}
        >
          <Text style={styles.contactText}>View Contact Details</Text>
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
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: 240,
  },
  imageCounter: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  imageCounterText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
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
  },// Gallery Styles
  gallerySection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  galleryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 12,
  },
  galleryList: {
    gap: 12,
  },
  galleryImageContainer: {
    width: 120,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
  },
  firstGalleryImage: {
    marginLeft: 0,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImageContainer: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: screenWidth,
    height: '100%',
    resizeMode: 'contain',
  },
  modalPagination: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  modalPaginationText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 2,
  },
  vehicleType: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 4,
  },
  vehiclePrice: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.secondary,
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  locationText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '500',
  },
  summaryRight: {
    alignItems: 'flex-end',
    gap: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 16,
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
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 12,
  },
  sectionBody: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 22,
  },
  featuresGrid: {
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D7F2EA',
    minWidth: 100,
  },
  featureLabel: {
    fontSize: 14,
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
  ownerInfo: {
    flex: 1,
  },
  ownerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  ownerName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 2,
  },
  ownerMeta: {
    fontSize: 14,
    color: COLORS.gray,
  },
  verifiedBadge: {
    padding: 8,
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
    paddingVertical: 18,
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
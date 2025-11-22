import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const DEFAULT_VEHICLE = {
  name: 'BMW X5',
  owner: 'Nihal Senarathne',
  phone: '+94 76 2222 222',
  location: 'Colombo Fort',
  address: 'Colombo Fort, Colombo, Sri Lanka',
  coordinates: {
    latitude: 6.9271,
    longitude: 79.8612,
  },
  notes: 'Please call 15 minutes before arrival. Parking available in front of the building.',
};

const ContactScreen = ({ navigation, route }) => {
  const vehicle = {
    ...DEFAULT_VEHICLE,
    ...(route?.params?.vehicle || {}),
  };

  const safePhone = vehicle.phone || DEFAULT_VEHICLE.phone;

  const handleCall = () => {
    Linking.openURL(`tel:${safePhone}`);
  };

  const handleWhatsApp = () => {
    Linking.openURL(`whatsapp://send?phone=${safePhone.replace(/\s/g, '')}`);
  };

  const handleOpenMaps = () => {
    const { latitude, longitude } = vehicle.coordinates;
    
    const scheme = Platform.select({
      ios: 'http://maps.apple.com/?',
      android: 'geo:',
    });
    
    const latLng = `${latitude},${longitude}`;
    const label = vehicle.location;
    
    if (Platform.OS === 'ios') {
      // Apple Maps
      Linking.openURL(`http://maps.apple.com/?daddr=${latLng}&dirflg=d`);
    } else {
      // Android 
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latLng}&travelmode=driving`;
      const geoUrl = `geo:${latLng}?q=${latLng}(${encodeURIComponent(label)})`;
      
      Linking.openURL(googleMapsUrl).catch(() => {
        Linking.openURL(geoUrl);
      });
    }
  };

  const handleViewOnMap = () => {
    const { latitude, longitude } = vehicle.coordinates;
    
    if (Platform.OS === 'ios') {
      // Apple Maps
      Linking.openURL(`http://maps.apple.com/?ll=${latitude},${longitude}&q=${encodeURIComponent(vehicle.location)}`);
    } else {
      // Android - Google Maps
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Back Button and Notification Icon */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Owner</Text>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications-outline" size={20} color={COLORS.hero} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Owner Information</Text>
        
        <View style={styles.infoRow}>
          <MaterialIcons name="person" size={20} color={COLORS.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Owner Name</Text>
            <Text style={styles.infoValue}>{vehicle.owner}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="phone" size={20} color={COLORS.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Phone Number</Text>
            <Text style={styles.infoValue}>{vehicle.phone}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={20} color={COLORS.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Pickup Location</Text>
            <Text style={styles.infoValue}>{vehicle.location}</Text>
            <Text style={styles.addressText}>{vehicle.address}</Text>
          </View>
        </View>
      </View>

      {/* Location Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pickup Location</Text>
        
        <View style={styles.locationCard}>
          <MaterialIcons name="place" size={40} color={COLORS.primary} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>{vehicle.location}</Text>
            <Text style={styles.locationAddress}>{vehicle.address}</Text>
            <Text style={styles.coordinates}>
              Coordinates: {vehicle.coordinates.latitude.toFixed(4)}, {vehicle.coordinates.longitude.toFixed(4)}
            </Text>
          </View>
        </View>

        <View style={styles.locationButtons}>
          <TouchableOpacity style={styles.directionsButton} onPress={handleOpenMaps}>
            <MaterialIcons name="directions" size={20} color={COLORS.white} />
            <Text style={styles.directionsButtonText}>Get Directions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.viewMapButton} onPress={handleViewOnMap}>
            <MaterialIcons name="map" size={20} color={COLORS.primary} />
            <Text style={styles.viewMapButtonText}>View on Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Owner Notes */}
      {vehicle.notes && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Owner Notes</Text>
          <View style={styles.notesContainer}>
            <MaterialIcons name="notes" size={20} color={COLORS.primary} style={styles.notesIcon} />
            <Text style={styles.notesText}>{vehicle.notes}</Text>
          </View>
        </View>
      )}

      {/* Important Note */}
      <View style={styles.noteCard}>
        <MaterialIcons name="info" size={20} color={COLORS.warning} />
        <Text style={styles.noteText}>
          Call owner before arrival for exact location.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <MaterialIcons name="call" size={24} color={COLORS.white} />
          <Text style={styles.buttonText}>Call Owner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
          <MaterialIcons name="chat" size={24} color={COLORS.white} />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>

      {/* Safety Tips */}
      <View style={styles.safetyCard}>
        <Text style={styles.safetyTitle}>Safety Tips</Text>
        <View style={styles.tipItem}>
          <MaterialIcons name="check-circle" size={16} color={COLORS.success} />
          <Text style={styles.tipText}>Meet in a public place</Text>
        </View>
        <View style={styles.tipItem}>
          <MaterialIcons name="check-circle" size={16} color={COLORS.success} />
          <Text style={styles.tipText}>Verify vehicle documents</Text>
        </View>
        <View style={styles.tipItem}>
          <MaterialIcons name="check-circle" size={16} color={COLORS.success} />
          <Text style={styles.tipText}>Inspect vehicle thoroughly</Text>
        </View>
        <View style={styles.tipItem}>
          <MaterialIcons name="check-circle" size={16} color={COLORS.success} />
          <Text style={styles.tipText}>Share your location with friends/family</Text>
        </View>
      </View>
    </ScrollView>
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
  backButton: {
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
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 12,
  },
  notificationButton: {
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
  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
  // Location Styles
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    gap: 15,
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 4,
  },
  coordinates: {
    fontSize: 12,
    color: COLORS.gray,
    fontFamily: 'monospace',
  },
  locationButtons: {
    gap: 10,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    gap: 8,
  },
  directionsButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    gap: 8,
  },
  viewMapButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Notes Styles
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  notesIcon: {
    marginTop: 2,
  },
  notesText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: '#856404',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  whatsappButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  safetyCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
  },
  safetyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 15,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  tipText: {
    fontSize: 14,
    color: COLORS.gray,
    flex: 1,
  },
});

export default ContactScreen;
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  StatusBar,
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
    
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`);
    } else {
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
      Linking.openURL(googleMapsUrl).catch(() => {
        Linking.openURL(`geo:${latitude},${longitude}`);
      });
    }
  };

  const handleViewOnMap = () => {
    const { latitude, longitude } = vehicle.coordinates;
    
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/?ll=${latitude},${longitude}&q=${encodeURIComponent(vehicle.location)}`);
    } else {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`);
    }
  };

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
        <Text style={styles.headerTitle}>Contact Owner</Text>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications-outline" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Owner Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Owner Information</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="person" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Owner Name</Text>
              <Text style={styles.infoValue}>{vehicle.owner}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="phone" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>{vehicle.phone}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="location-on" size={20} color={COLORS.primary} />
            </View>
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
            <View style={styles.locationIcon}>
              <MaterialIcons name="place" size={32} color={COLORS.primary} />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>{vehicle.location}</Text>
              <Text style={styles.locationAddress}>{vehicle.address}</Text>
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
              <View style={styles.notesIcon}>
                <MaterialIcons name="notes" size={20} color={COLORS.primary} />
              </View>
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
          <View style={styles.tipsContainer}>
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
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.background,
  },
  headerIcon: {
    width: 40,
    height: 40,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 4,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: COLORS.gray,
  },
  locationButtons: {
    gap: 12,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  directionsButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  viewMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    gap: 8,
  },
  viewMapButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notesIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
    borderRadius: 16,
    marginBottom: 16,
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
    marginBottom: 16,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  whatsappButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    padding: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  safetyCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  safetyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 16,
  },
  tipsContainer: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipText: {
    fontSize: 14,
    color: COLORS.gray,
    flex: 1,
  },
});

export default ContactScreen;
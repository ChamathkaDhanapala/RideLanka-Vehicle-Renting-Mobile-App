import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';

const DEFAULT_VEHICLE = {
  name: 'BMW X5',
  owner: 'Nihal Senarathne',
  phone: '+94 76 4533 239',
  location: 'Colombo Fort',
};

const ContactScreen = ({ route }) => {
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contact Owner</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Owner Information</Text>
        
        <View style={styles.infoRow}>
          <Icon name="person" size={20} color={COLORS.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Owner Name</Text>
            <Text style={styles.infoValue}>{vehicle.owner}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Icon name="phone" size={20} color={COLORS.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Phone Number</Text>
            <Text style={styles.infoValue}>{vehicle.phone}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Icon name="location-on" size={20} color={COLORS.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Pickup Location</Text>
            <Text style={styles.infoValue}>{vehicle.location}</Text>
          </View>
        </View>
      </View>

      {/* Important Note */}
      <View style={styles.noteCard}>
        <Icon name="info" size={20} color={COLORS.warning} />
        <Text style={styles.noteText}>
          Call owner before arrival for exact location.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Icon name="call" size={24} color={COLORS.white} />
          <Text style={styles.buttonText}>Call Owner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
          <Icon name="chat" size={24} color={COLORS.white} />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>

      {/* Safety Tips */}
      <View style={styles.safetyCard}>
        <Text style={styles.safetyTitle}>Safety Tips</Text>
        <View style={styles.tipItem}>
          <Icon name="check-circle" size={16} color={COLORS.success} />
          <Text style={styles.tipText}>Meet in a public place</Text>
        </View>
        <View style={styles.tipItem}>
          <Icon name="check-circle" size={16} color={COLORS.success} />
          <Text style={styles.tipText}>Verify vehicle documents</Text>
        </View>
        <View style={styles.tipItem}>
          <Icon name="check-circle" size={16} color={COLORS.success} />
          <Text style={styles.tipText}>Inspect vehicle thoroughly</Text>
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
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
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
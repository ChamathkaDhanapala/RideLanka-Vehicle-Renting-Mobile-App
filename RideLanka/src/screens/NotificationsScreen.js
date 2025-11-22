import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const notifications = [
  {
    id: '1',
    title: 'Booking Confirmed',
    message: 'Your BMW M4 is ready for pick-up tomorrow at 9.00 AM.',
    time: '2h ago',
    icon: 'checkmark-circle',
    color: '#0EA5E9',
  },
  {
    id: '2',
    title: 'Price Drop Alert',
    message: 'Jeep Wrangler dropped to 1400 LKR /day. Reserve now!',
    time: '5h ago',
    icon: 'pricetag',
    color: '#EC4899',
  },
  {
    id: '3',
    title: 'Message from Nihal',
    message: 'Owner sent you additional info about pick-up location.',
    time: '1d ago',
    icon: 'chatbubbles',
    color: '#22C55E',
  },
];

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Ionicons name='chevron-back' size={20} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name='settings-outline' size={18} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.card}>
            <View style={[styles.iconBadge, { backgroundColor: `${notification.color}22` }]}>
              <Ionicons name={notification.icon} size={20} color={notification.color} />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{notification.title}</Text>
              <Text style={styles.cardMessage}>{notification.message}</Text>
              <Text style={styles.cardTime}>{notification.time}</Text>
            </View>
            <TouchableOpacity style={styles.cardAction}>
              <Ionicons name='ellipsis-horizontal' size={18} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
        ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
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
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 6,
  },
  cardMessage: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 6,
  },
  cardTime: {
    fontSize: 12,
    color: COLORS.lightGray,
  },
  cardAction: {
    paddingLeft: 10,
  },
});

export default NotificationsScreen;


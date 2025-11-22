import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const ProfileScreen = ({ navigation }) => {
  const userInfo = {
    name: 'David Smith',
    nationality: 'United Kingdom',
    phone: '+94 76 4533 239',
    email: 'David@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
  };

  const infoRows = [
    { label: 'Nationality', value: userInfo.nationality },
    { label: 'TP No', value: userInfo.phone },
    { label: 'Email', value: userInfo.email },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={20} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Profile</Text>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
          </View>
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Ionicons name="chevron-down" size={16} color={COLORS.muted} />
        </View>

        <View style={styles.infoContainer}>
          {infoRows.map((row) => (
            <View key={row.label} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{row.label} :</Text>
              <Text style={styles.infoValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  scrollContent: {
    paddingBottom: 40,
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
  profileCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 24,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F2DFD7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 8,
  },
  infoContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    gap: 18,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.black,
    flex: 1,
    textAlign: 'right',
  },
  logoutButton: {
    marginTop: 32,
    alignSelf: 'center',
    backgroundColor: COLORS.hero,
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 24,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  logoutText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProfileScreen;
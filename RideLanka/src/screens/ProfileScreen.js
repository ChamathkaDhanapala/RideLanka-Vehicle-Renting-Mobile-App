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
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const ProfileScreen = ({ navigation }) => {
  const userInfo = {
    name: 'David Smith',
    nationality: 'United Kingdom',
    phone: '+94 76 4533 239',
    email: 'David@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    isOwner: false, // Default is tourist
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
          
          {/* User Type Badge */}
          <View style={[
            styles.userTypeBadge,
            userInfo.isOwner ? styles.ownerBadge : styles.touristBadge
          ]}>
            <MaterialIcons 
              name={userInfo.isOwner ? "directions-car" : "person"} 
              size={14} 
              color={userInfo.isOwner ? COLORS.white : COLORS.primary} 
            />
            <Text style={[
              styles.userTypeText,
              userInfo.isOwner ? styles.ownerText : styles.touristText
            ]}>
              {userInfo.isOwner ? 'Vehicle Owner' : 'Tourist'}
            </Text>
          </View>
        </View>

        {/* Become an Owner Section - Only show if user is NOT an owner */}
        {!userInfo.isOwner && (
          <View style={styles.becomeOwnerSection}>
            <Text style={styles.sectionTitle}>Become a Vehicle Owner</Text>
            <Text style={styles.sectionSubtitle}>
              List your vehicle and earn money from tourists
            </Text>
            
            <TouchableOpacity 
              style={styles.becomeOwnerButton}
              onPress={() => navigation.navigate('PostVehicle')}
            >
              <View style={styles.becomeOwnerContent}>
                <View style={styles.ownerIcon}>
                  <MaterialIcons name="add-business" size={24} color={COLORS.primary} />
                </View>
                <View style={styles.ownerTextContent}>
                  <Text style={styles.becomeOwnerTitle}>Start Renting Your Vehicle</Text>
                  <Text style={styles.becomeOwnerSubtitle}>Post your first vehicle in minutes</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
            </TouchableOpacity>

            <View style={styles.benefits}>
              <View style={styles.benefitItem}>
                <MaterialIcons name="attach-money" size={16} color={COLORS.success} />
                <Text style={styles.benefitText}>Earn extra income</Text>
              </View>
              <View style={styles.benefitItem}>
                <MaterialIcons name="groups" size={16} color={COLORS.success} />
                <Text style={styles.benefitText}>Connect with tourists</Text>
              </View>
              <View style={styles.benefitItem}>
                <MaterialIcons name="schedule" size={16} color={COLORS.success} />
                <Text style={styles.benefitText}>Flexible timing</Text>
              </View>
            </View>
          </View>
        )}

        {/* Owner Dashboard - Only show if user IS an owner */}
        {userInfo.isOwner && (
          <View style={styles.ownerSection}>
            <Text style={styles.sectionTitle}>Owner Dashboard</Text>
            
            <TouchableOpacity 
              style={styles.ownerButton}
              onPress={() => navigation.navigate('PostVehicle')}
            >
              <View style={styles.ownerButtonLeft}>
                <View style={styles.ownerIcon}>
                  <MaterialIcons name="add" size={20} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.ownerButtonTitle}>Post a Vehicle</Text>
                  <Text style={styles.ownerButtonSubtitle}>List your vehicle for rent</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.ownerButton}>
              <View style={styles.ownerButtonLeft}>
                <View style={styles.ownerIcon}>
                  <MaterialIcons name="list-alt" size={20} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.ownerButtonTitle}>My Listings</Text>
                  <Text style={styles.ownerButtonSubtitle}>3 vehicles listed</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
        )}

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
    marginBottom: 16,
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
  userTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  touristBadge: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  ownerBadge: {
    backgroundColor: COLORS.primary,
  },
  userTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  touristText: {
    color: COLORS.primary,
  },
  ownerText: {
    color: COLORS.white,
  },
  becomeOwnerSection: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#0F3D3E',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 16,
    lineHeight: 20,
  },
  becomeOwnerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  becomeOwnerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  ownerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ownerTextContent: {
    flex: 1,
  },
  becomeOwnerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 4,
  },
  becomeOwnerSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
  },
  benefits: {
    gap: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  benefitText: {
    fontSize: 12,
    color: COLORS.gray,
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
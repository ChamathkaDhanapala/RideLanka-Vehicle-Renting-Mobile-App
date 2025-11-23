import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  useEffect(() => {
    // Auto navigate to SplashScreen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Splash');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B2C2D" />
      
      {/* White Coconut Tree Icon */}
      <MaterialCommunityIcons name="palm-tree" size={80} color={COLORS.white} style={styles.treeIcon} />
      
      {/* Ride Lanka Text */}
      <Text style={styles.title}>Ride Lanka</Text>
      {/* Manual skip button */}
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={() => navigation.replace('Splash')}
      >
        <Ionicons name="chevron-forward" size={20} color={COLORS.white} />
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B2C2D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  treeIcon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 4,
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.8,
  },
});

export default OnboardingScreen;
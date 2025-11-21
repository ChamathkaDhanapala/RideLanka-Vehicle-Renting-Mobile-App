import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';

const SplashScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/download (1).png')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.overlay} />
      
      {/* Center Content */}
      <View style={styles.centerContent}>
        <Text style={styles.title}>
          <Text style={styles.brandLight}>Ride </Text>
          <Text style={styles.brandBold}>Lanka</Text>
        </Text>
        <Text style={styles.subtitle}>Where Your Adventure Begins.</Text>
      </View>

      {/* Bottom CTA Button */}
      <View style={styles.bottomContent}>
        <TouchableOpacity
          style={styles.cta}
          onPress={() => navigation.replace('MainTabs')}
        >
          <Text style={styles.ctaText}>Get Started</Text>
          <Icon name="arrow-forward" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: -200, 
  },
  bottomContent: {
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  title: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 12,
    textAlign: 'center',
  },
  brandLight: {
    color: COLORS.white,
    fontWeight: '400',
  },
  brandBold: {
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 20,
    color: COLORS.white,
    textAlign: 'center',
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.hero,
    paddingVertical: 16,
    borderRadius: 30,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  ctaText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SplashScreen;
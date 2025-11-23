import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image, 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
      <StatusBar barStyle="dark-content" backgroundColor="#E8F4F4" />
      
      <Image 
        source={require('../../assets/icon.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      
      {/* Manual skip button */}
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={() => navigation.replace('Splash')}
      >
        <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    width: 350, 
    height: 350, 
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
    color: COLORS.primary, 
    fontSize: 16,
    opacity: 0.8,
  },
});

export default OnboardingScreen;
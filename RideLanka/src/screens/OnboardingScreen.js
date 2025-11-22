import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
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
      <StatusBar barStyle="light-content" backgroundColor="#0B2C2D" />
      
      {/* Coconut Tree Emoji */}
      <Text style={styles.treeEmoji}>🌴</Text>
      
      {/* Ride Lanka Text */}
      <Text style={styles.title}>Ride Lanka</Text>
      
      
      {/*Manual skip button */}
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={() => navigation.replace('Splash')}
      >
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
  treeEmoji: {
    fontSize: 80,
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
    padding: 10,
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.8,
  },
});

export default OnboardingScreen;
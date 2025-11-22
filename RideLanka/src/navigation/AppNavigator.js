import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VehicleDetailsScreen from '../screens/VehicleDetailsScreen';
import ContactScreen from '../screens/ContactScreen';
import PostVehicleScreen from '../screens/PostVehicleScreen';
import FilterScreen from '../screens/FilterScreen';
import CategoryListingScreen from '../screens/CategoryListingScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const categoryStackScreens = [
  { name: 'CategoryCar', title: 'Cars', category: 'Car' },
  { name: 'CategoryBike', title: 'Bikes', category: 'Bike' },
  { name: 'CategoryTukTuk', title: 'Tuk-Tuks', category: 'Tuk-Tuk' },
  { name: 'CategoryVan', title: 'Vans', category: 'Van' },
  { name: 'CategoryBicycle', title: 'Bicycles', category: 'Bicycle' },
  { name: 'CategorySUV', title: 'SUVs', category: 'SUV' },
  { name: 'CategoryJeep', title: 'Jeeps', category: 'Jeep' },
];

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Explore') {
            iconName = 'explore';
          } else if (route.name === 'Favorites') {
            iconName = 'favorite';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0B2C2D',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding" 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0B2C2D',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* ONBOARDING SCREEN  */}
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />

        {/* SPLASH SCREEN */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        {/* MAIN APP */}
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />


        <Stack.Screen
          name="VehicleDetails"
          component={VehicleDetailsScreen}
          options={{ title: 'Vehicle Details' }}
        />
        <Stack.Screen
          name="Contact"
          component={ContactScreen}
          options={{ title: 'Contact Owner' }}
        />
        <Stack.Screen
          name="PostVehicle"
          component={PostVehicleScreen}
          options={{ title: 'List Your Vehicle' }}
        />
        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          options={{ title: 'Filter' }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ title: 'Notifications' }}
        />
        {categoryStackScreens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={CategoryListingScreen}
            initialParams={{ category: screen.category }}
            options={{ title: screen.title }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
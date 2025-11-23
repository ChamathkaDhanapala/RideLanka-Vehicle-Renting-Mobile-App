# RideLanka - Design System Documentation

## 🎨 Color Palette Used

```
export const COLORS = {
    primary: '#1E3C38',
    secondary: '#0F766E',
    accent: '#EA580C',
    background: '#E9F3F1',
    white: '#FFFFFF',
    black: '#1F2937',
    gray: '#6B7280',
    lightGray: '#9CA3AF',
    border: '#E5E7EB',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    heroDark: '#0B2C2D',
    hero: '#0F3D3E',
    softTeal: '#DFF2ED',
    muted: '#7D918C',
  };

```

##  📐 Heading Styles

```
const typography = {
  // Large Headings
  heroHeadline: { fontSize: 24, fontWeight: '700', lineHeight: 32 }, // "Find Your Ride"
  greeting: { fontSize: 18, fontWeight: '600' }, // "Hi! David"
  
  // Section Headers
  sectionTitle: { fontSize: 18, fontWeight: '700' }, // "Categories", "Popular Vehicles"
  
  // Card Content
  vehicleName: { fontSize: 18, fontWeight: '700' }, // "BMW X5"
  vehiclePrice: { fontSize: 16, fontWeight: '600' }, // "1000 LKR /D"
  categoryLabel: { fontSize: 13, fontWeight: '500' }, // "Car", "Bike"
  
  // Body Text
  locationText: { fontSize: 12, fontWeight: 'normal' }, // "Colombo, Sri Lanka"
  vehicleLocationText: { fontSize: 12, fontWeight: 'normal' }, // Location in cards
  searchPlaceholder: { fontSize: 16, fontWeight: 'normal' }, // "Search"
  
  // Small Text
  ratingText: { fontSize: 12, fontWeight: '600' }, // "4.9"
  statusPillText: { fontSize: 12, fontWeight: '600' }, // "Available"
  featureChipText: { fontSize: 12, fontWeight: '500' }, // "Manual", "Petrol"
  seeAll: { fontSize: 14, fontWeight: '600' } // "See All"
};

```
## 📏 Spacing System

```
const spacing = {
  // Screen Layout
  screenPadding: 20,       // Horizontal padding for sections
  cardMargin: 16,          // Margin between vehicle cards
  sectionMargin: 24,       // Margin bottom for sections
  
  // Component Spacing
  elementGap: 4,           // Small gaps (location row, feature chips)
  mediumGap: 8,            // Category icon margin, rating badge
  largeGap: 12,            // User info margin, search icon
  xlGap: 24,               // Hero headline margin top
  
  // Component Dimensions
  iconButton: 40,          // Notification button size
  categoryIcon: 64,        // Category circle size
  avatarSize: 48,          // Profile image size
  searchBarHeight: 56      // Search bar height
};

````

## 🧩 Component Patterns

```
// Vehicle Card 
<View style={{
  backgroundColor: COLORS.white,
  borderRadius: 20,
  marginBottom: 16,
  shadowColor: '#0F3D3E',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.08,
  shadowRadius: 16,
  elevation: 5
}}>
  {/* Card content with consistent 16px padding */}
</View>

// Consistent icon button across app
<TouchableOpacity style={{
  width: 40,
  height: 40,
  borderRadius: 12,
  backgroundColor: COLORS.white,
  alignItems: 'center',
  justifyContent: 'center'
}}>
  <Ionicons name="notifications-outline" size={20} color={COLORS.hero} />
</TouchableOpacity>


// Category Grid Pattern
<View style={{
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 16
}}>
  {categories.map(category => (
    <View key={category.id} style={{ width: '23%' }}>
      {/* Category content */}
    </View>
  ))}
</View>
````

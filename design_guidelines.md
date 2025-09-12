# Safar Saarthi Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from travel and safety apps like Airbnb (for travel context) and emergency services apps, combined with modern mobile-first design principles. The app serves both utility (safety features) and experience (travel planning) needs.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Safety Red: 355 85% 50% (emergency alerts, danger zones)
- Trust Blue: 210 90% 55% (primary actions, safe zones)
- Success Green: 145 70% 45% (safe areas, confirmations)

**Supporting Colors:**
- Neutral Gray: 220 10% 95% (backgrounds, cards)
- Warning Orange: 35 90% 60% (caution alerts)
- Deep Navy: 210 25% 15% (text, headers)

### Typography
**Font Stack**: Inter (Google Fonts) for excellent readability across all screen sizes
- Headers: 700 weight, 24-32px
- Body: 400 weight, 16-18px
- Captions: 500 weight, 14px

### Layout System
**Spacing**: Consistent 4, 8, 16, 24px units (Tailwind: p-1, p-2, p-4, p-6)
- Cards use p-4 internal padding
- Section spacing with mb-6 or mb-8
- Icon-text pairs with gap-2

### Component Library

**Navigation:**
- Bottom tab bar with 5 main sections: Dashboard, Safety Map, Emergency, Travel Plans, Profile
- Persistent emergency button (floating action button style)

**Cards & Data Display:**
- Safety status cards with color-coded borders
- Location cards with embedded mini-maps
- Alert notification cards with priority indicators
- Weather/condition summary cards

**Interactive Elements:**
- Primary CTAs use Trust Blue with rounded corners
- Emergency buttons use Safety Red with high contrast
- Form inputs with soft shadows and focus states
- Toggle switches for safety preferences

**Safety-Specific Components:**
- Real-time safety meter/gauge
- Interactive safety map with zone overlays
- Emergency contact quick-dial interface
- Location sharing status indicator

### Animations
Minimal, purposeful animations only:
- Subtle loading states for safety data
- Gentle pulsing for emergency button
- Smooth transitions between map states

## Mobile-First Considerations
- Touch targets minimum 44px
- Single-thumb navigation priority
- Clear visual hierarchy for quick scanning
- Offline-friendly design patterns

## Images
**Hero Elements:**
- Dashboard features a location-based hero card (not full-screen) showing current safety status
- Safety map as primary visual element
- Icons from Heroicons for consistency
- User profile photos in circular frames
- Location thumbnails in travel planning cards

The design prioritizes immediate safety information accessibility while maintaining an approachable, travel-friendly aesthetic that builds user confidence and trust.
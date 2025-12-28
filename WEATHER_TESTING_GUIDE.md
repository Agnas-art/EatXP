# 🧪 Weather Food Suggestion - Testing Guide

## Quick Test Locations

Use these locations to test different weather conditions and food recommendations:

### Hot, Sunny Locations
- **Miami, Florida** (USA) - Sunny, warm year-round
- **Dubai, UAE** - Very hot and sunny
- **Phoenix, Arizona** (USA) - Desert, very hot
- **Cairo, Egypt** - Hot and sunny
- **Bangkok, Thailand** - Tropical, warm

**Expected Foods**: Watermelon, Ice Cream, Salad, Popsicles

---

### Cold, Snowy Locations
- **Montreal, Canada** - Cold winters, snowy
- **Oslo, Norway** - Cold and snowy
- **Moscow, Russia** - Freezing winters
- **Stockholm, Sweden** - Cold climate
- **Reykjavik, Iceland** - Very cold

**Expected Foods**: Hot Oatmeal, Stew, Baked Potato, Hot Chocolate

---

### Rainy Locations
- **Seattle, Washington** (USA) - Rainy Pacific Northwest
- **Dublin, Ireland** - Rainy and cloudy
- **London, UK** - Often rainy
- **Singapore** - Tropical, rainy
- **Bali, Indonesia** - Tropical rainforest

**Expected Foods**: Hot Soup, Hot Cocoa, Grilled Cheese, Bread & Butter

---

### Cloudy Locations
- **Copenhagen, Denmark** - Often cloudy
- **San Francisco, California** - Cloudy coastal
- **Berlin, Germany** - Frequently cloudy
- **Vancouver, Canada** - Cloudy coast

**Expected Foods**: Sandwich, Smoothie, Pasta

---

## Testing Scenarios

### Scenario 1: Automatic Location Detection
1. Open the app in your browser
2. Grant location permission when prompted
3. Verify:
   - ✅ Location is detected automatically
   - ✅ Weather data is fetched for your location
   - ✅ Food recommendations match the weather
   - ✅ All weather details are displayed (temp, humidity, wind, visibility)

### Scenario 2: Manual Location Search
1. Clear the location input field
2. Type "Tokyo, Japan"
3. Click "Search" button
4. Verify:
   - ✅ Loading animation shows
   - ✅ Weather data updates for Tokyo
   - ✅ Food recommendations change
   - ✅ Location displays as "Tokyo, Japan"

### Scenario 3: Invalid Location
1. Type "XYZNotAPlace123"
2. Click "Search"
3. Verify:
   - ✅ Error message appears: "Could not find weather for..."
   - ✅ Previous weather remains displayed
   - ✅ User can try another location

### Scenario 4: Food Selection
1. Click on any food card (e.g., 🍉 Watermelon)
2. Verify:
   - ✅ Card gets highlighted with blue ring
   - ✅ Detail panel appears below
   - ✅ Shows food name, reason, and recipe
   - ✅ Detail panel animates in smoothly

### Scenario 5: Multiple Locations
1. Search "London, UK" → Verify rainy foods
2. Search "Dubai, UAE" → Verify sunny foods
3. Search "Oslo, Norway" → Verify cold foods
4. Verify all transitions are smooth

### Scenario 6: Temperature-Based Recommendations
1. Search a location with temp > 28°C (e.g., Dubai)
2. Verify:
   - ✅ Extra "Popsicles" food suggestion appears
   - ✅ Other foods remain the same

### Scenario 7: Weather Details Display
1. Verify all these details are visible:
   - ✅ Location name and country
   - ✅ Current temperature (e.g., "22°C")
   - ✅ "Feels like" temperature
   - ✅ Weather condition (Sunny/Cloudy/Rainy/etc.)
   - ✅ Humidity percentage
   - ✅ Wind speed in km/h
   - ✅ Visibility in km
   - ✅ Animated weather icon

---

## Expected UI Elements

### Header Section
```
📍 Location Search
└─ Input field with MapPin icon
└─ Search button with Search icon
└─ Error message area (when needed)
```

### Weather Card
```
Weather Gradient Background
├─ 📍 City, Country
├─ 🌡️ 22°C (large bold text)
├─ Sunny Weather (condition)
├─ Feels like: 20°C
│
└─ Weather Details Grid
   ├─ 💧 Humidity: 65%
   ├─ 💨 Wind: 10 km/h
   └─ 👁️ Visibility: 10 km
```

### Food Suggestions
```
🍽️ Perfect Foods for Today!
Perfect foods based on today's sunny weather in London

[🍉] [🍦] [🥗]
Watermelon | Ice Cream | Salad

(When clicked)
↓
[Selected Food Detail Panel]
🍉 Watermelon
Stay cool and hydrated!
👨‍🍳 Recipe: Watermelon Pops
```

---

## Browser Testing Checklist

### Chrome/Edge
- [ ] Location permission prompt works
- [ ] API calls succeed
- [ ] Animations are smooth
- [ ] Responsive on mobile view
- [ ] Search works immediately
- [ ] Error handling works

### Firefox
- [ ] All features work
- [ ] Styling displays correctly
- [ ] No console errors

### Safari
- [ ] Location services work
- [ ] Animations perform well
- [ ] Responsive layout works

### Mobile (iOS/Android)
- [ ] Touch interactions work
- [ ] Location permission works
- [ ] Search bar is accessible
- [ ] Food cards are tappable
- [ ] Detail panel is readable

---

## Console Debugging

Open browser DevTools (F12) and check:

### Clear Logs
```
// No errors should appear
// Some logs will show API calls:
"API call to: https://geocoding-api.open-meteo.com/v1/search..."
"Weather API response: { condition: 'sunny', ... }"
```

### Common Issues
1. **CORS Error**: If you see CORS errors, the APIs might be blocked
   - Solution: Ensure you're using HTTPS or localhost
   
2. **Geolocation Error**: "User denied geolocation"
   - This is normal if user doesn't grant permission
   - App should still work with default location

3. **Slow API Response**: Takes > 3 seconds
   - Normal on slow connections
   - Loading animation shows during this time

---

## Mobile Testing

### iOS
1. Open Safari
2. Go to http://localhost:5173/EatXP/ (or deployed URL)
3. Tap location icon in address bar → "Allow" location access
4. Test search and food selections

### Android
1. Open Chrome
2. Go to the app URL
3. Grant location permission when prompted
4. Test all features

---

## Performance Testing

### Load Time
- Initial load: < 2 seconds
- Weather fetch: < 1 second
- Location search: < 2 seconds
- Food selection animation: < 300ms

### API Calls
Each action should make expected API calls:
- **On Load**: 1 reverse geocoding + 1 weather call
- **On Search**: 1 geocoding + 1 weather call
- **On Food Select**: No API calls (client-side only)

---

## Weather Variations

The foods should change based on:

| Weather | Expected Foods |
|---------|-----------------|
| ☀️ Sunny | Watermelon, Ice Cream, Salad, (Popsicles if hot) |
| ☁️ Cloudy | Sandwich, Smoothie, Pasta |
| 🌧️ Rainy | Hot Soup, Hot Cocoa, Grilled Cheese, Bread |
| ❄️ Snowy | Hot Oatmeal, Stew, Baked Potato, Hot Chocolate |
| 💨 Windy | Energy Bars, Warm Milk, Rice Bowl, Nuts & Seeds |

---

## Accessibility Testing

- [ ] All buttons have proper labels
- [ ] Color contrast is sufficient
- [ ] Keyboard navigation works
- [ ] Screen reader can read food names
- [ ] Touch targets are at least 44x44px

---

## Known Limitations

1. **Geolocation**: May not work in some browsers without HTTPS
2. **API Rate Limits**: Open-Meteo allows 10,000 calls/day per IP
3. **Weather Accuracy**: Open-Meteo uses forecast data, not real-time observations for some locations
4. **Location Precision**: Some small towns may not be recognized

---

## Reporting Issues

If you find bugs, include:
- [ ] Location being tested
- [ ] Expected weather/foods
- [ ] Actual weather/foods
- [ ] Browser and OS
- [ ] Console errors (if any)
- [ ] Screenshots

Example Issue Report:
```
Location: "Paris, France"
Expected Foods: Hot Soup, Hot Cocoa (rainy weather)
Actual Foods: Watermelon, Ice Cream (sunny weather)
Browser: Chrome 120 on Windows 11
Error: None in console
```

---

## Success Criteria

✅ The weather section is considered fully working when:
1. Location search works for any worldwide location
2. Foods change based on real weather conditions
3. Temperature affects recommendations (hot > 28°C gets popsicles)
4. Weather details display correctly
5. UI is responsive and animations are smooth
6. No console errors appear
7. Error messages handle invalid locations gracefully

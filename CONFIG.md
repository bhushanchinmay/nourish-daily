# Configuration Guide

## Overview
`config.js` contains all configurable settings for Nourish Daily. Modify values here to customize the app without editing core code.

## Feature Flags
Enable/disable features:
```javascript
features: {
    darkMode: true,              // Toggle dark mode feature
    customMeals: true,            // Allow custom meal creation
    dietFriendlyMeals: true,      // Diet-friendly meal option
    weeklyView: true,             // Weekly plan tab
    customizeToday: true          // Meal customization
}
```

## UI Settings
Customize the interface:
```javascript
ui: {
    maxIngredientsPerMeal: 5,     // Max ingredients per meal
    defaultTheme: 'light',        // 'light' or 'dark'
    timeBasedGreeting: true,      // Time-based greetings
    animationsEnabled: true       // UI animations
}
```

## Time Ranges
Define time periods (24-hour format):
```javascript
timeRanges: {
    morning: { start: 6, end: 11 },
    afternoon: { start: 11, end: 15 },
    evening: { start: 15, end: 19 },
    night: { start: 19, end: 24 }
}
```

## Validation Rules
Control input validation:
```javascript
validation: {
    minMealNameLength: 1,
    requireMealType: true,
    requireRecipeContent: true,
    allowEmptyIngredients: true
}
```

## Helper Functions

### `isFeatureEnabled(featureName)`
Check if a feature is enabled:
```javascript
if (isFeatureEnabled('darkMode')) {
    // Dark mode code
}
```

### `getTimeRange(period)`
Get time range for a period:
```javascript
const morningRange = getTimeRange('morning');
// Returns: { start: 6, end: 11 }
```

### `getCurrentTimePeriod(hour)`
Get current time period:
```javascript
const period = getCurrentTimePeriod(14);
// Returns: 'afternoon'
```

## Quick Examples

### Example 1: Disable Dark Mode
```javascript
features: {
    darkMode: false  // Users won't see dark mode toggle
}
```

### Example 2: Change Meal Times
```javascript
mealTimes: {
    breakfast: { start: 7, end: 10 },  // Later breakfast
    lunch: { start: 12, end: 14 },      // Shorter lunch window
    dinner: { start: 18, end: 21 }      // Earlier dinner
}
```

### Example 3: Custom Labels
```javascript
labels: {
    appName: 'My Meal Planner',
    morningGreeting: 'Rise and Shine!',
    breakfastFocus: 'Time for Breakfast!'
}
```

### Example 4: Enable Debug Mode
```javascript
developer: {
    debugMode: true,              // See console logs
    logStorageChanges: true       // Track storage updates
}
```

## Integration

Load config in `index.html` BEFORE other scripts:
```html
<script src="config.js"></script>
<script src="data.js"></script>
<script src="script.js"></script>
```

Use in `script.js`:
```javascript
if (CONFIG.features.darkMode) {
    initTheme();
}

const maxIngredients = CONFIG.ui.maxIngredientsPerMeal;
```

## Best Practices

1. **Don't edit core files** - Keep changes in `config.js`
2. **Test after changes** - Verify the app works correctly  
3. **Document custom values** - Add comments for team members
4. **Use feature flags** - Progressively enable new features

## Common Use Cases

### For Developers
- Toggle features during development
- Test different configurations
- Debug with enhanced logging

### For Deployment
- Disable beta features in production
- Customize time ranges for different regions
- Adjust validation for specific requirements

### For Customization
- Rebrand with custom labels
- Adjust UI behavior
- Modify time-based logic

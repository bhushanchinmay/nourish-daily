/**
 * NOURISH DAILY - CONFIGURATION FILE
 * 
 * This file contains all configurable settings for the application.
 * Modify values here to customize behavior without changing core code.
 */

const CONFIG = {
    // ===== FEATURE FLAGS =====
    features: {
        darkMode: true,              // Enable/disable dark mode toggle
        customMeals: true,            // Allow users to add custom meals
        customRecipes: true,          // Allow users to add custom recipes
        dietFriendlyMeals: true,      // Enable diet-friendly meal option
        weeklyView: true,             // Show weekly meal plan tab
        customizeToday: true,         // Allow customizing today's meals
        mealRotation: true,           // Track and rotate meal selections
        ingredientManagement: true,   // Allow adding/removing ingredients
        pwaMode: true                 // Enable Progressive Web App features
    },

    // ===== UI SETTINGS =====
    ui: {
        maxIngredientsPerMeal: 5,     // Maximum ingredients allowed per meal
        defaultTheme: 'light',        // 'light' or 'dark'
        timeBasedGreeting: true,      // Show time-appropriate greetings
        timeBasedHighlight: true,     // Highlight current meal card
        animationsEnabled: true       // Enable UI animations
    },

    // ===== TIME RANGES (24-hour format) =====
    timeRanges: {
        morning: { start: 6, end: 11 },      // 6 AM - 11 AM
        afternoon: { start: 11, end: 15 },   // 11 AM - 3 PM
        evening: { start: 15, end: 19 },     // 3 PM - 7 PM
        night: { start: 19, end: 24 }        // 7 PM - Midnight
    },

    // ===== MEAL TIMES (for highlighting) =====
    mealTimes: {
        breakfast: { start: 6, end: 11 },    // Breakfast time window
        lunch: { start: 11, end: 15 },       // Lunch time window
        dinner: { start: 15, end: 22 }       // Dinner time window
    },

    // ===== TEXT & LABELS =====
    labels: {
        appName: 'Nourish Daily',
        appShortName: 'Nourish',
        addMealButton: 'Add New Meal',
        addRecipeButton: 'Add New Recipe',
        customizeTodayButton: 'Customize Today\'s Meals',

        // Greetings
        morningGreeting: 'Good Morning!',
        afternoonGreeting: 'Good Afternoon!',
        eveningGreeting: 'Good Evening!',

        // Focus messages
        breakfastFocus: 'Focus: Breakfast',
        lunchFocus: 'Focus: Lunch',
        dinnerFocus: 'Focus: Dinner',
        restFocus: 'Focus: Rest & Prep'
    },

    // ===== VALIDATION RULES =====
    validation: {
        minMealNameLength: 1,
        maxMealNameLength: 50,
        requireMealType: true,           // Require meal type for normal meals
        requireRecipeContent: true,      // Require recipe content for diet meals
        allowEmptyDescription: true,     // Allow meals without description
        allowEmptyIngredients: true      // Allow meals without ingredients
    },

    // ===== STORAGE KEYS =====
    storage: {
        selections: 'nd_selections',
        usedMeals: 'nd_used_meals',
        weekStart: 'nd_week_start',
        customMeals: 'nd_custom_meals',
        customRecipes: 'nd_custom_recipes',
        theme: 'nd_theme'
    },

    // ===== PWA SETTINGS =====
    pwa: {
        cacheName: 'nourish-daily-v1',
        themeColor: '#34C759',
        backgroundColor: '#FFFFFF',
        display: 'standalone'
    },

    // ===== DEVELOPER OPTIONS =====
    developer: {
        debugMode: false,                // Enable console logging
        showTestData: false,             // Show test data in UI
        enablePerformanceMonitoring: false,  // Track performance metrics
        logStorageChanges: false         // Log localStorage changes
    }
};

// ===== HELPER FUNCTIONS =====
/**
 * Check if a feature is enabled
 * @param {string} featureName - Name of the feature to check
 * @returns {boolean}
 */
function isFeatureEnabled(featureName) {
    return CONFIG.features[featureName] === true;
}

/**
 * Get time range for a specific period
 * @param {string} period - 'morning', 'afternoon', 'evening', or 'night'
 * @returns {object} - {start, end}
 */
function getTimeRange(period) {
    return CONFIG.timeRanges[period] || { start: 0, end: 24 };
}

/**
 * Get current time period based on hour
 * @param {number} hour - Current hour (0-23)
 * @returns {string} - 'morning', 'afternoon', 'evening', or 'night'
 */
function getCurrentTimePeriod(hour) {
    if (hour >= CONFIG.timeRanges.morning.start && hour < CONFIG.timeRanges.morning.end) return 'morning';
    if (hour >= CONFIG.timeRanges.afternoon.start && hour < CONFIG.timeRanges.afternoon.end) return 'afternoon';
    if (hour >= CONFIG.timeRanges.evening.start && hour < CONFIG.timeRanges.evening.end) return 'evening';
    return 'night';
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, isFeatureEnabled, getTimeRange, getCurrentTimePeriod };
}

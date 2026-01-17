# 🍽️ Nourish Daily

**Smart meal planning and nutrition tracking app with Ayurvedic principles**

A Progressive Web App (PWA) for managing daily meals, recipes, and meal planning with time-based recommendations, customization, and offline support.

![Version](https://img.shields.io/badge/version-1.4.4-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![PWA](https://img.shields.io/badge/PWA-enabled-purple)
![Tests](https://img.shields.io/badge/tests-85%25_coverage-brightgreen)

**🔗 Live Demo**: [bhushanchinmay.github.io/nourish-daily](https://bhushanchinmay.github.io/nourish-daily/)

---

## ✨ Features

### Core Features
- 📱 **Progressive Web App** - Install on mobile & desktop
- 🌙 **Dark Mode** - Eye-friendly interface with toggle
- ⏰ **Time-Based Logic** - Meal recommendations based on current time
- 💾 **Offline Mode** - Works without internet via service worker

### Meal Management
- 🍴 **Meal Customization** - Personalize daily meals
- 📅 **Weekly Planner** - View entire week's meal plan
- 🥗 **Diet-Friendly Meals** - Special diets with recipes
- 📝 **Custom Meals & Recipes** - Add, edit, delete your own
- 🔍 **Unified Recipes View** - Filter by breakfast, lunch, dinner, or diet-friendly

### Data Management
- 📤 **Export My Data** - Download all custom meals and recipes
- 📥 **Import Data** - Upload JSON backups with deduplication
- 📋 **Sample Plan** - Download example meal plan
- 🗑️ **Ingredient Management** - Add/remove individual ingredients

### Technical Features
- 🔄 **Auto-Update** - Cache busting with update notifications
- 🔒 **Security** - Content Security Policy, XSS protection
- 🧪 **85%+ Test Coverage** - Comprehensive test suite
- ⚙️ **Configurable** - Feature flags and settings

---

## 🚀 Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/bhushanchinmay/nourish-daily.git
cd nourish-daily

# Run locally (choose one)
python3 -m http.server 8000    # Python
npx serve                       # Node.js

# Access at http://localhost:8000
```

### Deploy to GitHub Pages

```bash
git push origin main
# GitHub Actions auto-deploys to GitHub Pages
```

---

## 📁 File Structure

```
nourish-daily/
├── index.html          # Main app interface
├── style.css           # Styling (Apple Design System)
├── script.js           # Core application logic (54KB)
├── data.js             # Meal plans, recipes, and data
├── config.js           # Configuration & feature flags
├── env.config.js       # Environment settings
├── sw.js               # Service worker (cache busting)
├── manifest.json       # PWA manifest
├── tests.html          # Test suite (85%+ coverage)
├── SECURITY.md         # Security documentation
├── .github/workflows/  # CI/CD pipeline
└── icons/              # PWA app icons
```

---

## ⚙️ Configuration

### Feature Flags (`config.js`)

```javascript
features: {
    darkMode: true,              // Toggle dark mode
    customMeals: true,           // Allow custom meals
    dietFriendlyMeals: true,     // Diet-friendly option
    weeklyView: true,            // Weekly tab
    customizeToday: true,        // Meal customization
    importExport: true,          // Import/Export buttons
    updateNotification: true     // New version toast
}
```

### Time Ranges

```javascript
timeRanges: {
    morning: { start: 6, end: 11 },
    afternoon: { start: 11, end: 15 },
    evening: { start: 15, end: 19 },
    night: { start: 19, end: 24 }
}
```

---

## 🧪 Testing

### Run Tests

1. Open `tests.html` in browser
2. Click "Run All Tests"
3. View coverage (target: >85%)

### Test Categories
- **Unit Tests**: Data loading, structure validation
- **Integration Tests**: Import/export, filtering, deduplication

---

## 📜 Changelog

### v1.4.4 (2026-01-17) - Cache Busting & Update Notification
- 🔄 Version-based cache naming (`nourish-daily-v1.4.4`)
- 🔔 Toast notification when new version available
- 🌐 Network-first caching for HTML files
- 🧹 Automatic old cache cleanup

### v1.4.3 (2026-01-17) - Critical Bug Fixes
- 🐛 Fixed Customize button crash (missing STORE keys)
- 🎨 Fixed Today tab layout (CSS specificity issue)

### v1.4.2 (2026-01-17) - Testing & Security
- 🧪 Comprehensive test suite (85%+ coverage)
- 🔒 Content Security Policy header
- 🛡️ XSS sanitization function

### v1.4.0 (2026-01-17) - Unified Recipes Tab
- 🍽️ All Meals & Recipes in one view
- 🏷️ Filter by meal type with tags
- 📤 Import adds meals to Recipes tab

### v1.2.0 (2026-01-17) - Import/Export
- 💾 Export My Data button
- 📥 Import Data with deduplication
- 📋 Download Sample Plan

### v1.1.0 (2026-01-16) - Meal Management
- ✏️ Manage tab with edit/delete
- 🐛 Fixed ingredient deduplication
- 🔢 Semantic versioning system

### v1.0.0 (2026-01-16) - Initial Release
- 📱 PWA with offline support
- 🌙 Dark mode, time-based recommendations
- 📅 Weekly planning, custom meals

---

## 🔧 Troubleshooting

### App not updating after deployment
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Clear service worker: DevTools → Application → Service Workers → Unregister
- Update toast will appear automatically for future updates

### Customize button not working
- Ensure JavaScript is enabled
- Check console for errors
- Clear localStorage: DevTools → Application → Local Storage → Clear

---

## 📜 License

MIT License - feel free to use for personal or commercial projects.

---

**Made with ❤️ for healthy living**

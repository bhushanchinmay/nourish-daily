# 🍽️ Nourish Daily

**Smart meal planning and nutrition tracking web app with Ayurvedic principles**

A Progressive Web App for managing daily meals, recipes, and meal planning with time-based recommendations, customization, and offline support.

![Version](https://img.shields.io/badge/version-1.6.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![PWA](https://img.shields.io/badge/installable-yes-purple)
![Tests](https://img.shields.io/badge/tests-90%25_coverage-brightgreen)
![Security](https://img.shields.io/badge/security-CSP_enabled-orange)

**🔗 Live Demo**: [bhushanchinmay.github.io/nourish-daily](https://bhushanchinmay.github.io/nourish-daily/)

---

## ✨ Features

### Core Features
- 📱 **Progressive Web App** - Add to home screen on mobile & desktop
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
- 📤 **Export Data** - Download all meals, recipes, and selections as JSON
- 📥 **Import Data** - Restore backups with full data recovery
- 🗑️ **Ingredient Management** - Add/remove individual ingredients

### Security & Technical
- 🔒 **Content Security Policy** - CSP headers prevent XSS attacks
- 🛡️ **Input Sanitization** - All user inputs are sanitized
- 🔄 **Auto-Update** - Cache busting with update notifications
- 🧪 **90%+ Test Coverage** - Comprehensive test suite
- ⚙️ **Configurable** - Feature flags and settings in config.js

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
├── script.js           # Core application logic
├── data.js             # Meal plans, recipes, and data
├── config.js           # Configuration & feature flags
├── env.config.js       # Environment settings (paths, deployment)
├── sw.js               # Service worker (offline + cache busting)
├── manifest.json       # Web app manifest (installability)
├── tests.html          # Test suite (90%+ coverage)
├── SECURITY.md         # Security documentation
└── .github/workflows/  # CI/CD pipeline
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
    pwaMode: true                // Enable installable features
}
```

### Deployment Settings (`env.config.js`)

```javascript
deployment: {
    repoName: 'nourish-daily',   // GitHub repo name
    basePath: '/nourish-daily/', // URL path
    environment: 'production'    // production/development
}
```

---

## 🔒 Security

| Feature | Status | Description |
|---------|--------|-------------|
| CSP Headers | ✅ Enabled | Content Security Policy meta tag |
| Input Sanitization | ✅ Enabled | All user inputs sanitized before storage |
| No External CDNs | ✅ | All code self-contained |
| HTTPS Only | ✅ | GitHub Pages enforces HTTPS |

See [SECURITY.md](SECURITY.md) for details.

---

## 🧪 Testing

### Run Tests

1. Open `tests.html` in browser
2. Click "Run All Tests"
3. View coverage (target: 90%+)

### Test Categories
- **Unit Tests**: Data loading, structure validation, sanitization
- **Integration Tests**: Import/export, filtering, deduplication, storage

---

## 📜 Changelog

### v1.6.0 (2026-01-17) - Simplified Add Meal Form
- 🍽️ Always show meal type selector (Breakfast/Lunch/Dinner)
- 🥗 Diet-friendly option now just adds a tag
- 📋 Single unified form for all meals

### v1.5.1 (2026-01-17) - Improved Export
- 📤 Export includes all meal options (editable backup)
- 🔄 Edit JSON and reimport workflow

### v1.5.0 (2026-01-17) - Export & Data Persistence
- 📤 Export button to download all user data
- 🔄 Import now restores meal selections
- 🐛 Fixed deleted meals appearing in Today tab
- 🧪 Selection validation tests added

### v1.4.4 (2026-01-17) - Security & Quality
- 🔒 Input sanitization on all user inputs
- 🔄 Cache version synced to v1.4.4
- 📝 README updated, renamed to "Web App"
- 🧪 90%+ test coverage

### v1.4.3 (2026-01-17) - Critical Bug Fixes
- 🐛 Fixed Customize button crash
- 🎨 Fixed Today tab layout

### v1.4.2 (2026-01-17) - Testing & Security
- 🧪 Comprehensive test suite
- 🔒 Content Security Policy header

### v1.4.0 (2026-01-17) - Unified Recipes Tab
- 🍽️ All Meals & Recipes in one view
- 🏷️ Filter by meal type with tags

### v1.2.0 (2026-01-17) - Import/Export
- 💾 Import/Export functionality
- 📋 Download Sample Plan

### v1.1.0 (2026-01-16) - Meal Management
- ✏️ Manage tab with edit/delete
- 🐛 Fixed ingredient deduplication

### v1.0.0 (2026-01-16) - Initial Release
- 📱 Installable web app with offline support
- 🌙 Dark mode, time-based recommendations

---

## 🔧 Troubleshooting

### App not updating
- Hard refresh: `Cmd+Shift+R` (Mac) / `Ctrl+Shift+R` (Windows)
- Clear service worker: DevTools → Application → Service Workers → Unregister
- Update toast appears automatically for future updates

### Is this a PWA?
Yes! This is an installable Progressive Web App with:
- Service Worker (`sw.js`) for offline support
- Web App Manifest (`manifest.json`) for installation
- HTTPS (required for service workers)

---

## 📜 License

MIT License - feel free to use for personal or commercial projects.

---

**Made with ❤️ for healthy living**

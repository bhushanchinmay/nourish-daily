# 🍽️ Nourish Daily

**Smart meal planning and nutrition tracking app with Ayurvedic principles**

A Progressive Web App (PWA) for managing daily meals, recipes, and meal planning with time-based recommendations, customization, and offline support.

![Version](https://img.shields.io/badge/version-1.1.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![PWA](https://img.shields.io/badge/PWA-enabled-purple)

---

## ✨ Features

- 📱 **Progressive Web App** - Install on mobile & desktop
- 🌙 **Dark Mode** - Eye-friendly interface
- ⏰ **Time-Based Logic** - Meal recommendations based on current time
- 🍴 **Meal Customization** - Personalize daily meals
- 📅 **Weekly Planner** - View entire week's meal plan
- 🥗 **Diet-Friendly Meals** - Special diets with recipes
- 📝 **Custom Meals & Recipes** - Add your own
- ✏️ **Edit & Manage** - Full CRUD operations for custom items (v1.1.0)
- 🗑️ **Ingredient Management** - Add/remove individual ingredients
- 💾 **Offline Mode** - Works without internet
- ⚙️ **Configurable** - Feature flags and settings

---

## 🚀 Quick Start

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/nourish-daily.git
   cd nourish-daily
   ```

2. **Run locally**:
   ```bash
   # Option 1: Python
   python3 -m http.server 8000
   
   # Option 2: Node.js
   npx serve
   
   # Option 3: VS Code Live Server
   # Install "Live Server" extension and click "Go Live"
   ```

3. **Access the app**:
   ```
   http://localhost:8000
   ```

### Deploy to GitHub Pages

See [DEPLOYMENT.md](/Users/chinmaybhushan/.gemini/antigravity/brain/a62d440e-9faa-4e7b-b397-52b6b54f2c2e/DEPLOYMENT.md) for complete deployment guide.

**TL;DR**:
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
├── sw.js               # Service worker (offline support)
├── manifest.json       # PWA manifest
├── tests.html          # Test suite
├── CONFIG.md           # Configuration documentation
├── .github/
│   └── workflows/
│       └── deploy.yml  # CI/CD pipeline
└── icons/              # PWA app icons (optional)
```

---

## ⚙️ Configuration

All configurable settings are in `config.js`.

### Feature Flags

Enable/disable features:

```javascript
features: {
    darkMode: true,              // Toggle dark mode
    customMeals: true,            // Allow custom meals
    dietFriendlyMeals: true,      // Diet-friendly option
    weeklyView: true,             // Weekly tab
    customizeToday: true          // Meal customization
}
```

### Time Ranges

Customize time periods (24-hour format):

```javascript
timeRanges: {
    morning: { start: 6, end: 11 },
    afternoon: { start: 11, end: 15 },
    evening: { start: 15, end: 19 },
    night: { start: 19, end: 24 }
}
```

See [CONFIG.md](CONFIG.md) for complete configuration guide.

---

## 📝 Editing Data

### Adding Meals to Weekly Plan

Edit `data.js`:

```javascript
MEAL_DATA: {
    monday: {
        breakfast: { 
            id: 'bf_1', 
            title: 'Oatmeal', 
            desc: 'Healthy start' 
        },
        lunch: { 
            id: 'ln_1', 
            title: 'Salad Bowl', 
            desc: 'Fresh greens' 
        },
        // ... more meals
    }
}
```

### Adding Recipes

```javascript
RECIPES: [
    {
        title: "My Recipe",
        desc: "Short description",
        content: "Step 1: ...\nStep 2: ..."
    }
]
```

### Adding Meal Options

Options appear in "Customize Today's Meals":

```javascript
MEAL_OPTIONS: {
    breakfast: [
        { id: 'bf_opt1', title: 'Poha', desc: 'Light breakfast' }
    ]
}
```

---

## 🧪 Testing

### Run Tests

1. Open `tests.html` in browser
2. View test results (target: >85% coverage)
3. All tests should pass

### Manual Testing Checklist

- [ ] Dark mode toggle works
- [ ] Add custom meal (normal)
- [ ] Add diet-friendly meal
- [ ] Customize today's meals
- [ ] Verify Weekly tab updates after customization
- [ ] Add/remove ingredients
- [ ] Delete custom meals/recipes
- [ ] Test offline mode (disable network)
- [ ] Install as PWA

---

## 🎨 Customization

### Branding

1. **App Name**: Edit `config.js` → `labels.appName`
2. **Theme Color**: Edit `config.js` → `pwa.themeColor`
3. **Icons**: Add PNG files to `/icons/` directory

### Time Behavior

Adjust when meals are highlighted:

```javascript
// config.js
mealTimes: {
    breakfast: { start: 7, end: 10 },  // Customize times
    lunch: { start: 12, end: 14 },
    dinner: { start: 18, end: 21 }
}
```

---

## 🔧 Troubleshooting

### App not updating after deployment

- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear service worker: DevTools → Application → Service Workers → Unregister

### Weekly tab not showing customizations

- Ensure `initWeekly()` is called after `saveSelections()`
- Check browser console for errors
- Verify localStorage is not disabled

### Service worker errors

- Check `sw.js` paths match your deployment URL
- Verify `manifest.json` `start_url`equals `/nourish-daily/` (or your repo name)
- Clear cache: DevTools → Application → Clear storage

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📊 Development Standards

### Code Style

- Use ES6+ JavaScript
- Semantic HTML5
- BEM-like CSS class naming
- Apple Human Interface Guidelines for design

### Before Committing

1. Run tests (`tests.html`)
2. Check browser console for errors
3. Test dark mode
4. Verify PWA installability
5. Test on mobile viewport

---

## 📚 Documentation

- [CONFIG.md](CONFIG.md) - Configuration guide
- [DEPLOYMENT.md](/Users/chinmaybhushan/.gemini/antigravity/brain/a62d440e-9faa-4e7b-b397-52b6b54f2c2e/DEPLOYMENT.md) - GitHub Pages deployment
- [icons/README.md](icons/README.md) - Icon generation guide

---

## 📜 Changelog

### v1.1.0 (2026-01-16) - Meal Management & Bug Fixes

**✨ New Features**:
- **Manage Tab**: New dedicated tab to view, edit, and delete all custom meals and recipes
- **Edit Functionality**: Edit any custom meal or recipe with pre-populated forms
- **Delete Confirmations**: Safe deletion with confirmation dialogs
- **Semantic Versioning**: Version display in header (v1.1.0) and package.json with changelog

**🐛 Bug Fixes**:
- **Ingredient Deduplication**: Fixed 3x duplication of ingredients in Prep tab for diet-friendly meals
  - Implemented Map/Set based deduplication
  - Diet-friendly meals now grouped in Manage tab (appear once instead of 3x)
- **Delete Cascade**: Deleting meals now properly removes ingredients from Prep tab
- **Weekly Tab Updates**: Fixed issue where customizations weren't immediately visible (from v1.0.0)

**🔧 Improvements**:
- Diet-friendly meals update all 3 instances when edited (breakfast, lunch, dinner)
- Delete removes all related data (meals + recipes + ingredients)
- Better UX with clearly visible Edit/Delete buttons in Manage tab

**🧪 Testing**:
- Added comprehensive integration test suite (20+ tests)
- Tests for deduplication, editing, deletion, and versioning

---

### v1.0.0 (2026-01-16) - Initial PWA Release

**✨ Features**:
- Progressive Web App with offline support
- Dark mode toggle
- Time-based meal recommendations
- Weekly meal planning view
- Customizable daily meals
- Add custom meals and recipes
- Diet-friendly meal options
- Individual ingredient management with remove buttons
- Prepare tab with grocery list
- GitHub Pages deployment with CI/CD

**🎨 Design**:
- Apple Human Interface Guidelines inspired
- Responsive design for mobile and desktop
- Smooth animations and transitions
- Glassmorphism effects

**⚙️ Configuration**:
- Feature flags system (config.js)
- Environment configuration (env.config.js)
- Customizable time ranges
- Configurable validation rules

**🚀 Deployment**:
- GitHub Actions workflow for auto-deployment
- Service worker for offline functionality
- PWA manifest for installability

---

## 🐛 Known Issues

None currently. Report issues on GitHub.

---

## 📜 License

MIT License - feel free to use for personal or commercial projects.

---

## 🙏 Acknowledgments

- Design inspired by Apple Human Interface Guidelines
- Ayurvedic meal planning principles
- Progressive Web App best practices

---

**Made with ❤️ for healthy living**

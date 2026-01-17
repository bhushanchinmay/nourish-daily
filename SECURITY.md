# Security Considerations for Nourish Daily

## Important Limitations

**This is a static frontend application (HTML/CSS/JavaScript) hosted on GitHub Pages.** 

### What CANNOT Be Hidden
- **JavaScript source code** - Browsers must execute JS, so it's always visible via DevTools
- **Data structures** - MEAL_OPTIONS, RECIPES, etc. are loaded in the browser
- **Logic flow** - All business logic is client-side

### Why This Is OK
1. **No sensitive data** - This app stores personal preferences, not passwords or financial info
2. **No backend** - No server-side secrets exist to protect
3. **Personal use** - Data stays in the user's browser (localStorage)

---

## Security Measures Implemented

### 1. Input Sanitization
All user inputs (meal names, descriptions, ingredients) should be sanitized before display to prevent XSS:

```javascript
// Recommended sanitization (add to script.js)
function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
```

### 2. Content Security Policy (CSP)
Add to `index.html` `<head>`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: blob:;">
```

### 3. localStorage Security
- Data stored in localStorage is domain-specific
- Cannot be accessed by other websites
- Cleared when user clears browser data

### 4. No External Dependencies
- No external CDN scripts (reduces supply chain risk)
- All code is self-contained
- No third-party analytics or tracking

### 5. HTTPS Only
GitHub Pages enforces HTTPS, preventing:
- Man-in-the-middle attacks
- Data interception
- Cookie hijacking

---

## Recommended Hardening Steps

### Already Done ✅
1. No external CDNs
2. HTTPS via GitHub Pages
3. No sensitive data collection
4. All data stays client-side

### To Consider 🔄
1. **Minify JavaScript** - Makes code harder to read (not truly secure but obfuscates)
   ```bash
   npx terser script.js -o script.min.js --mangle
   ```

2. **Add CSP Header** - Already recommended above

3. **Validate Import Data** - Check structure before processing

### Not Applicable ❌
1. Authentication (no backend)
2. API key protection (no APIs)
3. Database encryption (no database)
4. Rate limiting (client-side only)

---

## File Cleanup Recommendations

### Files to Keep
- `index.html` - Main app
- `style.css` - Styles
- `script.js` - App logic
- `data.js` - Meal data
- `env.config.js` - Configuration
- `sw.js` - Service worker
- `manifest.json` - PWA manifest
- `tests.html` - Test suite

### Files That Could Be Removed
- `example-backup.json` - Documentation only
- `CONFIG.md` - Documentation only
- `GIT_PUSH_FIX.md` - One-time fix
- `WEEKLY_PLAN.md` - Static reference

### Do NOT Remove
- Any `.github/` files (needed for deployment)
- Any icon files (needed for PWA)

---

## Summary

**Security for this app is inherently limited because it's a static frontend.** The good news is:
- No sensitive data exists
- No attack surface for server vulnerabilities
- All data stays on user's device

The best security is:
1. Keep dependencies minimal ✅
2. Use HTTPS ✅
3. Sanitize user input ⚠️ (should add)
4. Add CSP headers ⚠️ (should add)

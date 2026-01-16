/**
 * ENVIRONMENT CONFIGURATION
 * 
 * This file contains deployment-specific settings that may vary
 * between development, staging, and production environments.
 * 
 * IMPORTANT: Copy this file to create your own environment config
 * DO NOT commit sensitive information to version control
 */

const ENV = {
    // ===== DEPLOYMENT SETTINGS =====
    deployment: {
        /**
         * Repository name for GitHub Pages deployment
         * Format: 'repo-name' (without username)
         * 
         * GitHub Pages URL will be: https://USERNAME.github.io/REPO_NAME/
         * 
         * CHANGE THIS to match your repository name
         */
        repoName: 'nourish-daily',

        /**
         * Base URL path for the application
         * - For GitHub Pages: '/repo-name/'
         * - For custom domain or root: '/'
         * - For subdirectory: '/path/to/app/'
         */
        basePath: '/nourish-daily/',

        /**
         * Environment type
         * Options: 'development', 'staging', 'production'
         */
        environment: 'production'
    },

    // ===== PWA SETTINGS =====
    pwa: {
        /**
         * Service worker cache version
         * Increment this when you want to force cache refresh
         */
        cacheVersion: 'v1',

        /**
         * Full cache name (combining app name + version)
         */
        get cacheName() {
            return `${ENV.deployment.repoName}-${this.cacheVersion}`;
        }
    },

    // ===== API SETTINGS (for future use) =====
    api: {
        /**
         * API base URL (if using external APIs)
         * Leave empty if not using APIs
         */
        baseUrl: '',

        /**
         * API timeout in milliseconds
         */
        timeout: 5000
    },

    // ===== FEATURE FLAGS (environment-specific) =====
    features: {
        /**
         * Enable debug logging
         * Set to true in development, false in production
         */
        debugMode: false,

        /**
         * Enable service worker
         * Set to false in local development if you want instant updates
         */
        enableServiceWorker: true,

        /**
         * Enable analytics (if implemented)
         */
        enableAnalytics: false
    },

    // ===== HELPER METHODS =====

    /**
     * Get full URL path for a resource
     * @param {string} path - Relative path (e.g., 'index.html')
     * @returns {string} - Full URL path
     */
    getFullPath(path) {
        // Remove leading slash if present
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${this.deployment.basePath}${cleanPath}`;
    },

    /**
     * Check if running in production
     * @returns {boolean}
     */
    isProduction() {
        return this.deployment.environment === 'production';
    },

    /**
     * Check if running in development
     * @returns {boolean}
     */
    isDevelopment() {
        return this.deployment.environment === 'development';
    }
};

// Make ENV globally available
if (typeof window !== 'undefined') {
    window.ENV = ENV;
}

// Export for modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ENV;
}

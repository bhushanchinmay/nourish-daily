/**
 * ENVIRONMENT CONFIGURATION - EXAMPLE
 * 
 * This is an example configuration file.
 * Copy this to 'env.config.js' and customize for your deployment.
 * 
 * USAGE:
 * 1. Copy this file: cp env.config.example.js env.config.js
 * 2. Edit env.config.js with your settings
 * 3. Add env.config.js to .gitignore if it contains sensitive data
 */

const ENV = {
    deployment: {
        // CHANGE THIS: Your GitHub repository name
        repoName: 'your-repo-name',

        // CHANGE THIS: Base path for your deployment
        // GitHub Pages: '/your-repo-name/'
        // Custom domain/root: '/'
        basePath: '/your-repo-name/',

        // Environment: 'development', 'staging', or 'production'
        environment: 'production'
    },

    pwa: {
        // Cache version - increment to force cache refresh
        cacheVersion: 'v1',

        get cacheName() {
            return `${ENV.deployment.repoName}-${this.cacheVersion}`;
        }
    },

    api: {
        // If using external APIs, add base URL here
        baseUrl: '',
        timeout: 5000
    },

    features: {
        // Enable debug mode for development
        debugMode: false,

        // Enable service worker
        enableServiceWorker: true,

        // Enable analytics (if implemented)
        enableAnalytics: false
    },

    // Helper methods
    getFullPath(path) {
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${this.deployment.basePath}${cleanPath}`;
    },

    isProduction() {
        return this.deployment.environment === 'production';
    },

    isDevelopment() {
        return this.deployment.environment === 'development';
    }
};

if (typeof window !== 'undefined') {
    window.ENV = ENV;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ENV;
}

/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      includeAssets: [
        'favicon.ico',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'apple-touch-icon.png',
        'robots.txt'
      ],
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: '/offline.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          // MAP CHUNKS CACHING
          {
            urlPattern: /^https:\/\/[a-z]\.tile\.openstreetmap\.org\/\d+\/\d+\/\d+\.png$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'osm-tiles',
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 10 * 24 * 60 * 60,
              },
            },
          },

          // CACHE DYNAMIC AVATARS OF FAKER
          {
            urlPattern: ({ url }) =>
                url.hostname.includes('githubusercontent.com') ||
                url.hostname.includes('jsdelivr.net'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'avatar-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 14, // 14 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // CACHE STATIC FILES
          {
            urlPattern: ({ request }) =>
                ['style', 'script', 'worker'].includes(request.destination),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
            },
          },

          // CACHE HTML
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
            },
          },
        ],
      },

      manifest: {
        name: 'SolarSync',
        short_name: 'SolarSync',
        description: 'Offline-first field reporting for solar technicians.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        screenshots: [
          {
            src: '/screenshots/1.jpg',
            sizes: '1080x1920',
            type: 'image/jpeg',
            label: 'Offline-ready report overview',
            form_factor: 'narrow'
          },
          {
            src: '/screenshots/1.jpg',
            sizes: '1080x1920',
            type: 'image/jpeg',
            label: 'Offline-ready report overview',
            form_factor: 'wide'
          },
          {
            src: '/screenshots/2.jpg',
            sizes: '1080x1920',
            type: 'image/jpeg',
            label: 'Site map & technician log',
            form_factor: 'narrow'
          },
          {
            src: '/screenshots/2.jpg',
            sizes: '1080x1920',
            type: 'image/jpeg',
            label: 'Site map & technician log',
            form_factor: 'wide'
          }
        ],
        icons: [
          {
            src: '/icons/android/android-launchericon-192-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/android/android-launchericon-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            "src": "/icons/android/android-launchericon-192-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/icons/android/android-launchericon-192-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            src: '/icons/ios/180.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/ios/144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any'
          }
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

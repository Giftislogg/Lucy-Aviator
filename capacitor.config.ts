import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lucy.aviator',
  appName: 'Lucy Aviator',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-3940256099942544~3347511713',
      requestTrackingAuthorization: true,
      testingDevices: [],
      initializeForTesting: true
    }
  }
};

export default config;

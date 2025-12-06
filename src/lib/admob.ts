import { Capacitor } from '@capacitor/core';
import { AdMob } from '@capacitor-community/admob';

const BANNER_ID = 'ca-app-pub-3940256099942544/6300978111';
const INTERSTITIAL_ID = 'ca-app-pub-3940256099942544/1033173712';

export const initAdMob = async () => {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: [],
      initializeForTesting: true,
    });

    await AdMob.showBanner({
      adId: BANNER_ID,
      adSize: 'BANNER',
      position: 'BOTTOM_CENTER',
    });
  } catch (err) {
    console.log('AdMob init error', err);
  }
};

export const showInterstitial = async () => {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await AdMob.prepareInterstitial({
      adId: INTERSTITIAL_ID,
    });
    await AdMob.showInterstitial();
  } catch (err) {
    console.log('showInterstitial error', err);
  }
};

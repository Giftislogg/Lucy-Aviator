# Replit Prompt: Build Hybrid Android App (Lucy Aviator)

**Objective:**
Transform this React/Capacitor codebase into a professional, installable Android APK. The app must feel like a "native" app, supporting offline UI, native push notifications, badges, and a special "Web Version" toggle.

## 1. Infrastructure & Environment Setup
- Ensure the Android environment is ready (Java 21, Gradle, Android SDK).
- Initialize and sync Capacitor for Android: `npx cap add android` (if not present) and `npx cap sync android`.
- Install the following Capacitor plugins:
  - `@capacitor/local-notifications` (for native signals/announcements)
  - `@capacitor/badge` (for app icon badges)
  - `@capacitor/preferences` (for persistent settings and login)
  - `@capacitor/app` (for handling app state)

## 2. Implement Native Notifications & Permissions
- **Modify `src/utils/notifications.ts`**: Replace the current browser-based `window.Notification` API with `@capacitor/local-notifications`.
- **First Launch Permissions**: Modify `src/App.tsx` to check and request `notifications` and `audio` permissions the first time the app is opened.
- **Native Badges**: Every time a new signal or announcement is received via Supabase Realtime, increment the app badge count using `@capacitor/badge`.

## 3. Web Version Backup Switch
- **Settings Toggle**: In `src/pages/Settings.tsx`, add a new "Advanced" section with a switch labeled "Load Web Version (Backup)".
- **Functionality**: If this switch is ON, the app should persist this choice and redirect the user to `https://inquisitive-bombolone-9b2452.netlify.app`.
- **Offline Logic**: Ensure that by default, the app loads from the local `dist` folder so the UI works even without internet.

## 4. Admin "Remember Me" & Auto-Login
- **Control Panel Update**: In `src/pages/ControlPanel.tsx`, add a "Remember Me" checkbox to the login form.
- **Persistence**: Use `@capacitor/preferences` to store the admin password securely if "Remember Me" is checked.
- **Auto-Login**: When the user opens the Control Panel, check if a password is saved and automatically grant access if it matches the current Supabase `app_settings` password.

## 5. Real-Time Features & Buttons
- Ensure all buttons in the "Index", "VIP Dashboard", and "Control Panel" are optimized for touch interactions (no hover states that get stuck).
- Use Supabase Realtime listeners in `App.tsx` to trigger native notifications even when the user is on a different page or the app is in the background.

## 6. Android Configuration
- Update `capacitor.config.ts`:
  - Set `appId` to `com.lucy.aviator`.
  - Set `appName` to `Lucy Aviator`.
  - Ensure `bundledWebRuntime` is `false`.
- Update `AndroidManifest.xml`:
  - Add `<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />`.
  - Add `<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />`.

## 7. Final Build Step
1. Run `npm install`.
2. Run `npm run build`.
3. Run `npx cap sync android`.
4. Navigate to the `android/` directory and run `./gradlew assembleDebug` to generate the installable APK.
5. Provide the link to download the final `app-debug.apk`.

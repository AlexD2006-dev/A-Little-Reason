# A Little Reason

A Little Reason is a small, low-pressure activity app built with React Native, TypeScript, and Expo. It suggests simple missions based on a user's mood and what feels manageable, then keeps a local record of completed missions.

## Features

- Check in with a mood and practical preferences such as energy, available time, setting, social comfort, and budget.
- Get three matching mission suggestions from a locally bundled mission list.
- Open a mission for instructions, complete it, and record an after-mission mood and optional reflection.
- View local progress statistics and recent mission history.
- Restore saved completion history and resume an unfinished selected mission after restarting the app.
- Refresh mission suggestions with the **Try another set** button or by shaking the phone while the recommendations screen is active.

## Technology

- React Native
- TypeScript and TSX
- Expo SDK 57
- `expo-sensors` for accelerometer input
- `@react-native-async-storage/async-storage` for on-device persistence

The app does not use an account or backend. Mission data is included in the app, and completion history and the active mission session are stored locally on the device. Accelerometer readings are used on-device to detect a shake; they are not saved or sent to a server. Sensor listening is limited to the recommendations screen while the app is active, and a button remains available as a fallback.

## Project structure

```text
App.tsx                    App navigation, startup restoration, and save flow
App.styles.ts              App-level loading styles
app.json                   Expo app configuration
src/
  components/               Reusable interface components
  data/                     Check-in options and mission catalogue
  screens/                  Check-in, recommendations, mission, completion,
                            and progress screens, with screen styles
  services/                 Recommendation logic and local persistence
  types/                    TypeScript domain types
```

## Requirements

- Node.js and npm
- Expo Go on a compatible iOS or Android device for device testing

## Install and run

From this repository's root directory:

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go. If Expo asks to use another port because the default is occupied, accept the suggested port and scan the newly displayed QR code.

If the phone cannot connect over the local network, make sure the phone and computer are on the same Wi-Fi. You can also try starting an Expo tunnel:

```bash
npx expo start --tunnel
```

A tunnel requires a working network connection to the tunnel service. For a cache rebuild when troubleshooting, stop Expo and run:

```bash
npx expo start --tunnel --clear
```

## Notes on persistence and sensor use

Completed mission entries and an unfinished selected mission are stored with AsyncStorage so they can be restored after an app restart. Temporary check-in selections and an unfinished reflection are not saved. The accelerometer listener is removed when the recommendations screen is left and paused when the app is not active; it resumes when the app returns to the foreground.

## Possible future improvements

- Expand the mission catalogue and the available check-in choices, especially for combinations of low energy, limited time, indoor settings, and different levels of social comfort.
- Add a section where users can revisit their saved mini-reflections.
- Add automated tests for recommendation filtering, progress storage, and restoration after an app restart.
- Test the layout and sensor behavior on a wider range of iOS and Android devices, then adjust where needed.
- Give users clearer controls for managing or deleting their locally stored progress.

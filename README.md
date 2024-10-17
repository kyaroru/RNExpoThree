# RNExpoThree

Note: This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

Other that that, this is also a newer example of 3D rendering using

- [React Native](https://reactnative.dev/)
- [expo-three](https://github.com/expo/expo-three)
- [three.js](https://threejs.org/docs/)

Old version with Bare React Native is at [RNExpoThreeOld](https://github.com/kyaroru/RNExpoThreeOld)

## Clone

```
git clone https://github.com/kyaroru/RNExpoThree
cd RNExpoThree
yarn install
npx expo prebuild --clean
```

Note: using npx expo prebuild ensure you're always having clean `android` and `ios` folder

## Start

### Note: it only works in Physical iPhone & Physical Android devices

Automatic Way (always fails to build on first attempt)

```
yarn ios
or
yarn android
```

Manual way (my preferred method)

```
Run yarn start & then install using Android Studio or Xcode
```

## Android APK

[Download APK](https://drive.google.com/file/d/1z_fxXSXMcV8uCidUWFYeZkzKCTvN7D9u/view?usp=sharing)

## Demo

- Demo is laggy because it is in `.gif`, in actual device it would be much smoother 😉

### iOS

- Tested on Actual iPhone 15 in Release mode
  ![iOS Demo](expo-three-ios.gif)

### Android

- Tested on Actual Google Pixel 5 with release apk
  ![Android Demo](expo-three-android.gif)

Have fun & wishing all newbies (like me) found happiness in programming! :p

## Credits

- [Shiba](https://sketchfab.com/3d-models/shiba-faef9fe5ace445e7b2989d1c1ece361c) Model from [zixisun02](https://sketchfab.com/dogerlo) @ [Sketchfab](https://sketchfab.com/)
- [Ice Bear](https://sketchfab.com/3d-models/ice-bear-we-bare-bears-77f6d43d4dc740dfb8a500743676a18c) Model from [nissato](https://sketchfab.com/Nissato) @ [Sketchfab](https://sketchfab.com/)
- [Hamburger](https://github.com/BonnierNews/react-native-3d-model-view/tree/master/example/obj) Model from [react-native-3d-model-view](https://github.com/BonnierNews/react-native-3d-model-view)

module.exports = ({ config }) => {
  const IS_DEV = process.env.APP_VARIANT === "development";
  const IS_STAGING = process.env.APP_VARIANT === "staging";
  return {
    name: IS_DEV || IS_STAGING ? "RNExpoThree (Dev)" : "RNExpoThree",
    slug: "rn-expo-three",
    version: config.version,
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "rn-expo-three",
    userInterfaceStyle: "automatic",
    splash: {
      resizeMode: "contain",
      backgroundColor: "#FFFFFF",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      buildNumber: config.ios.buildNumber,
      supportsTablet: true,
      bundleIdentifier:
        IS_DEV || IS_STAGING
          ? "com.example.rnexpothree.dev"
          : "com.example.rnexpothree",
    },
    android: {
      versionCode: parseInt(config.android.versionCode, 10),
      icon: "./assets/images/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
      splash: {
        resizeMode: "contain",
        backgroundColor: "#FFFFFF",
      },
      permissions: ["android.permission.ACCESS_NETWORK_STATE"],
      package:
        IS_DEV || IS_STAGING
          ? "com.example.rnexpothree.dev"
          : "com.example.rnexpothree",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
  };
};

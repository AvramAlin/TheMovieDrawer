// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // remove any accidental .cjs in assetExts
  config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => ext !== "cjs"
  );

  // tell Metro that .cjs is a valid *source* file extension
  config.resolver.sourceExts.push("cjs");

  // This is the new line you should add in, after the previous lines
  config.resolver.unstable_enablePackageExports = false;

  return config;
})();

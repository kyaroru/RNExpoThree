const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  "obj",
  "dae",
  "scn",
  "zip",
  "png",
  "svg",
  "jpg",
  "glb",
  "gltf",
  "fbx",
  "lib",
  "mtl",
  "bin",
  "tif",
  "xpng",
  "xjpg",
  "xjpeg"
);

module.exports = config;

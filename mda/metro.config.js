// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require('expo/metro-config')

// module.exports = getDefaultConfig(__dirname);

const defaultConfig = getDefaultConfig(__dirname)
const {assetExts} = defaultConfig.resolver
const config = defaultConfig
config.resolver.assetExts = [...assetExts, 'bin']

module.exports = config

// module.exports = (async () => {
//   return {
//     resolver: {
//       // Add bin to assetExts
//       assetExts: [...assetExts, 'bin']
//     }
//   }
// })()

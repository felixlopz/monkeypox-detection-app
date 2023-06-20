// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require('expo/metro-config')

const defaultConfig = getDefaultConfig(__dirname)
const {assetExts} = defaultConfig.resolver
const config = defaultConfig
config.resolver.assetExts = [...assetExts, 'bin']

module.exports = config

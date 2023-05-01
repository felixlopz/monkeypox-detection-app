import * as tf from '@tensorflow/tfjs'
import * as RNFS from 'react-native-fs'

// Load the model architecture and weights
const modelJson = require('../models/tfjs/model.json')

async function listFilesInMainBundle() {
  try {
    // Get the path to the app's main bundle
    const dirPath = RNFS.MainBundlePath

    // List the contents of the directory
    const contents = await RNFS.readDir(dirPath)

    // Map the contents to an array of file names
    const fileNames = contents.map(file => file.name)

    console.log(fileNames)

    return fileNames
  } catch (err: any) {
    console.log('Error listing files:', err.message)
    return []
  }
}

listFilesInMainBundle()

export const loadModel = async () => {}

import * as tf from '@tensorflow/tfjs'
import {bundleResourceIO} from '@tensorflow/tfjs-react-native'

const modelJson = require('../assets/tfjs/model.json')

const modelWeights = [
  require('../assets/tfjs/group1-shard1of3.bin'),
  require('../assets/tfjs/group1-shard2of3.bin'),
  require('../assets/tfjs/group1-shard3of3.bin')
]

export async function loadModel() {
  try {
    await tf.ready()
    const model = await tf.loadLayersModel(bundleResourceIO(modelJson, [...modelWeights]))
    console.log(model.summary())
  } catch (error) {
    console.log(error)
  }
}

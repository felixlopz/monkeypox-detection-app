import * as tf from '@tensorflow/tfjs'
import * as jpeg from 'jpeg-js'
import {LayersModel} from '@tensorflow/tfjs'
import {
  bundleResourceIO,
  decodeJpeg,
  fetch
} from '@tensorflow/tfjs-react-native'
import {ImageResult} from 'expo-image-manipulator'
import {DiagnoseLabels} from 'src/screens/Diagnose/store/DiagnoseSlice'

const modelJson = require('../assets/tfjs/model.json')

const modelWeights = [
  require('../assets/tfjs/group1-shard1of3.bin'),
  require('../assets/tfjs/group1-shard2of3.bin'),
  require('../assets/tfjs/group1-shard3of3.bin')
]

const ModelInputShape = [1, 224, 224, 3] // Assuming RGB images with a batch size of 1

export async function makePrediction(
  image: ImageResult,
  model: LayersModel
): Promise<DiagnoseLabels> {
  const response = await fetch(image.uri, {}, {isBinary: true})
  const imageData = await response.arrayBuffer()
  const imageArray = new Uint8Array(imageData)
  const imageTensor = decodeJpeg(imageArray)
  const normalizedArray = tf.div(imageTensor, 255.0)
  const reshapedArray = tf.reshape(normalizedArray, ModelInputShape)
  const result = model.predict(reshapedArray, {verbose: true, batchSize: 1})
  const probabilities = await result.array()
  const maxProbabilityIndex = probabilities[0].indexOf(
    Math.max(...probabilities[0])
  )
  const predictedClass = Object.values(DiagnoseLabels)[maxProbabilityIndex]

  tf.dispose([imageTensor, normalizedArray, reshapedArray, result])
  return predictedClass
}

export async function loadModel(): Promise<LayersModel | null> {
  try {
    await tf.ready()
    const model = await tf.loadLayersModel(
      bundleResourceIO(modelJson, [...modelWeights])
    )

    return model
  } catch (error) {
    console.log(error)
    return null
  }
}

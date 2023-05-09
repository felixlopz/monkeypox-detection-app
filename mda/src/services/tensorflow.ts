import * as tf from '@tensorflow/tfjs'
import {LayersModel} from '@tensorflow/tfjs'
import {
  bundleResourceIO,
  decodeJpeg,
  fetch
} from '@tensorflow/tfjs-react-native'
import {
  CapturedImageType,
  DiagnoseLabels
} from 'src/screens/Diagnose/store/DiagnoseSlice'
import {resizeImageForModelPrediction} from 'src/utils/imageUtils'

const modelJson = require('../assets/tfjs/model.json')

const modelWeights = [
  require('../assets/tfjs/group1-shard1of3.bin'),
  require('../assets/tfjs/group1-shard2of3.bin'),
  require('../assets/tfjs/group1-shard3of3.bin')
]

const ModelInputShape = [1, 224, 224, 3]

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

export async function processImage(
  image: CapturedImageType
): Promise<tf.Tensor<tf.Rank>> {
  const resizedImage = await resizeImageForModelPrediction(image)
  const response = await fetch(resizedImage.uri, {}, {isBinary: true})
  const imageData = await response.arrayBuffer()
  const imageArray = new Uint8Array(imageData)
  const imageTensor = decodeJpeg(imageArray)
  const normalizedArray = tf.div(imageTensor, 255.0)
  const reshapedArray = tf.reshape(normalizedArray, ModelInputShape)
  tf.dispose([normalizedArray, imageTensor])
  return reshapedArray
}

export async function makePrediction(
  processedImage: tf.Tensor<tf.Rank>,
  model: LayersModel
): Promise<DiagnoseLabels> {
  if (model == null) {
    return DiagnoseLabels.Undetermined
  }

  const result = (
    model.predict(processedImage, {
      verbose: true,
      batchSize: 1
    }) as tf.Tensor
  ).dataSync()

  const maxProbabilityIndex = result.indexOf(Math.max(...result))
  const predictedClass = Object.values(DiagnoseLabels)[maxProbabilityIndex]

  tf.dispose([processedImage, result])

  return predictedClass
}

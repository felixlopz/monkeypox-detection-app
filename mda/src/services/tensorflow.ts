import * as tf from '@tensorflow/tfjs'
import * as FileSystem from 'expo-file-system'
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

export async function loadModel(): Promise<tf.LayersModel | null> {
  const startTime = performance.now()
  try {
    await tf.ready()
    const model = await tf.loadLayersModel(
      bundleResourceIO(modelJson, [...modelWeights])
    )

    const endTime = performance.now()
    console.log(`Loading model took ${endTime - startTime} milliseconds.`)
    return model
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function processImage(
  image: CapturedImageType
): Promise<tf.Tensor<tf.Rank>> {
  const startTime = performance.now()

  const resizedImage = await resizeImageForModelPrediction(image)
  const response = await fetch(resizedImage.uri, {}, {isBinary: true})
  const imageData = await response.arrayBuffer()
  const imageArray = new Uint8Array(imageData)
  const imageTensor = decodeJpeg(imageArray)
  const normalizedArray = tf.div(imageTensor, 255.0)
  const reshapedArray = tf.reshape(normalizedArray, ModelInputShape)
  tf.dispose([normalizedArray, imageTensor])

  const endTime = performance.now()
  console.log(`Image processing took ${endTime - startTime} milliseconds.`)

  return reshapedArray
}

// Adding this method because Andorid does not support fetch, it is slower because the use of tf.image.resizeBilinear
// https://github.com/tensorflow/tfjs/issues/3186
export async function _debugAndroidprocessImage(
  image: CapturedImageType
): Promise<tf.Tensor<tf.Rank>> {
  const startTime = performance.now()

  if (image == null) {
    throw new Error('No image available')
  }
  const imageUri = image.uri
  const imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64
  })
  const imageBuffer = tf.util.encodeString(imageBase64, 'base64').buffer
  const imageData = new Uint8Array(imageBuffer)
  const imageTensor = decodeJpeg(imageData)

  const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224])
  const normalizedImage = tf.div(resizedImage, 255.0)
  const reshapedImage = tf.reshape(normalizedImage, ModelInputShape)
  tf.dispose([normalizedImage, imageTensor])

  const endTime = performance.now()
  console.log(
    `Android: image processing took ${endTime - startTime} milliseconds.`
  )

  return reshapedImage
}

export async function makePrediction(
  processedImage: tf.Tensor<tf.Rank>,
  model: tf.LayersModel
): Promise<DiagnoseLabels> {
  const startTime = performance.now()

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
  const endTime = performance.now()
  console.log(`Prediction ${endTime - startTime} milliseconds.`)
  return predictedClass
}

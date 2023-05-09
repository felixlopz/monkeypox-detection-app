import * as tf from '@tensorflow/tfjs'
import * as jpeg from 'jpeg-js'
import {LayersModel} from '@tensorflow/tfjs'
import {bundleResourceIO, fetch} from '@tensorflow/tfjs-react-native'
import {Image} from 'react-native'
import {ImageResult} from 'expo-image-manipulator'
import {DiagnoseArrayLabels} from 'src/screens/Diagnose/store/DiagnoseSlice'

const modelJson = require('../assets/tfjs/model.json')

const modelWeights = [
  require('../assets/tfjs/group1-shard1of3.bin'),
  require('../assets/tfjs/group1-shard2of3.bin'),
  require('../assets/tfjs/group1-shard3of3.bin')
]

export async function makePrediction(
  image: ImageResult,
  model: LayersModel
): Promise<string> {
  const tensorImage: tf.Tensor4D = await imageToTensor(image)
  const result = await predict(tensorImage, model)
  const probabilities = await result.array()
  console.log(probabilities)

  // Get the index of the highest probability
  const maxProbabilityIndex = probabilities[0].indexOf(
    Math.max(...probabilities[0])
  )

  // Map the index to the corresponding class label
  const predictedClass = DiagnoseArrayLabels[maxProbabilityIndex]

  return predictedClass
}

async function predict(
  tensorImage: tf.Tensor4D,
  model: LayersModel
): Promise<tf.Tensor<tf.Rank> | Array<tf.Tensor<tf.Rank>>> {
  return new Promise((res, rej) => {
    try {
      const prediction = model.predict(tensorImage, {
        verbose: true
      })
      res(prediction)
    } catch (error) {
      rej(error)
    }
  })
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

// Extracted from https://github.com/btroia/react-native-image-recognition-object-detection/blob/main/screens/ClassifyImageScreen.tsx
export async function imageToTensor(image: ImageResult): Promise<tf.Tensor4D> {
  const imageAssetPath = Image.resolveAssetSource(image)
  const response = await fetch(imageAssetPath.uri, {}, {isBinary: true})
  const rawImageData = await response.arrayBuffer()

  const {width, height, data} = jpeg.decode(rawImageData, {
    useTArray: true
  }) // return as Uint8Array

  // Drop the alpha channel info for mobilenet
  const buffer = new Uint8Array(width * height * 3)
  let offset = 0 // offset into original data
  for (let i = 0; i < buffer.length; i += 3) {
    buffer[i] = data[offset]
    buffer[i + 1] = data[offset + 1]
    buffer[i + 2] = data[offset + 2]

    offset += 4
  }

  return tf.tensor4d(buffer, [1, height, width, 3])
}

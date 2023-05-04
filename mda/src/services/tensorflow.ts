import * as tf from '@tensorflow/tfjs'
import {Rank, Tensor} from '@tensorflow/tfjs'
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native'
import {CameraCapturedPicture} from 'expo-camera'
import {ImagePickerAsset} from 'expo-image-picker'

const modelJson = require('../assets/tfjs/model.json')

const modelWeights = [
  require('../assets/tfjs/group1-shard1of3.bin'),
  require('../assets/tfjs/group1-shard2of3.bin'),
  require('../assets/tfjs/group1-shard3of3.bin')
]

export async function loadModel(): Promise<tf.LayersModel | null> {
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

export async function preProcessImage(
  image: CameraCapturedPicture | ImagePickerAsset
): Promise<Tensor<Rank> | null> {
  setTimeout(() => {}, 5000)

  return null

  // if (image.base64 == null) {
  //   return null
  // }

  // const base64: string = image.base64

  // const buffer = tf.util.encodeString(base64, 'base64').buffer
  // const raw = new Uint8Array(buffer)
  // const imageTensor = decodeJpeg(raw)
  // const resized = tf.image.resizeBilinear(imageTensor, [224, 224])
  // const expanded = resized.expandDims(-1).toFloat()
  // const normalized = expanded.div(255.0)
  // return normalized
}

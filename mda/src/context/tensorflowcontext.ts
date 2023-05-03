import React from 'react'
import * as tf from '@tensorflow/tfjs'

export interface TensorflowContextType {
  isTfReady: boolean
  model: tf.LayersModel | undefined
}

export const TensorflowContext = React.createContext<TensorflowContextType>({
  isTfReady: false,
  model: undefined
})

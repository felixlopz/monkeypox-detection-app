import {useEffect, useMemo, useState} from 'react'
import {Platform} from 'react-native'
import {useFonts} from 'expo-font'
import {Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import {Pacifico_400Regular} from '@expo-google-fonts/pacifico'
import {TensorflowContextType} from 'src/context'
import {loadModel} from 'src/services'

export default function useAppLoading() {
  const [tensorflow, setTensorflow] = useState<TensorflowContextType>({isTfReady: false, model: undefined})

  const [appLoaded, setAppLoaded] = useState(false)
  const [fonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Pacifico_400Regular
  })
  const isWeb = useMemo(() => Platform.OS === 'web', [])

  // Set Web CSS Styles
  useEffect(() => {
    if (isWeb) document.body.style.cssText = `height: ${window.innerHeight * 0.01}px;`
  }, [])

  // Set tensorflor Model
  useEffect(() => {
    const initializeTensorflowModel = async () => {
      const model = await loadModel()
      if (model != null) {
        setTensorflow({
          isTfReady: true,
          model: model
        })
      }
    }

    setTimeout(() => {
      initializeTensorflowModel()
    }, 1000)
  }, [])

  // Set App Loaded
  useEffect(() => {
    if (fonts && !appLoaded && tensorflow.isTfReady) setAppLoaded(true)
  }, [fonts, tensorflow.isTfReady])

  return {appLoaded, tensorflow}
}

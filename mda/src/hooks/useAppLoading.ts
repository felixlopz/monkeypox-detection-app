import {useEffect, useMemo, useState} from 'react'
import {Platform} from 'react-native'
import {useFonts} from 'expo-font'
import {Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import {Pacifico_400Regular} from '@expo-google-fonts/pacifico'

export default function useAppLoading() {
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

  // Set App Loaded
  useEffect(() => {
    if (fonts && !appLoaded) setAppLoaded(true)
  }, [fonts])

  return appLoaded
}

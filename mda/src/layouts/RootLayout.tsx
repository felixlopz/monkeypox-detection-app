import 'expo-dev-client'
import {StatusBar} from 'expo-status-bar'
import {ThemeProvider} from 'styled-components/native'
import {appTheme} from '../styles/theme'
import {Provider} from 'react-redux'
import {store} from '../store'
import {Navigation} from 'src/components'

export const RootLayout = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <StatusBar style="dark" />
        <Navigation />
      </ThemeProvider>
    </Provider>
  )
}

export default RootLayout

import 'expo-dev-client'
import {StatusBar} from 'expo-status-bar'
import {ThemeProvider} from 'styled-components/native'
import {appTheme} from 'src/styles/theme'
import {Provider} from 'react-redux'
import {store} from 'src/store/store'
import Navigation from 'src/components/Navigation'

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

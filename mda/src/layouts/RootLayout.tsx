import 'expo-dev-client'
import {StatusBar} from 'expo-status-bar'
import styled, {ThemeProvider} from 'styled-components/native'
import {appTheme} from '../styles/theme'
import Spinner from 'src/components/Spinner'
import useAppLoading from 'src/hooks/useAppLoading'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {StyleSheet} from 'react-native'
import {Tabs} from 'expo-router'
import {i18n} from '../services/i18n'

export default function RootLayout() {
  const appLoaded = useAppLoading()

  if (!appLoaded) return <Spinner />

  return (
    <ThemeProvider theme={appTheme}>
      <StatusBar style="dark" />
      <S.AppWrapper>
        <Tabs
          screenOptions={{
            headerStatusBarHeight: 30,
            headerStyle: styles.header,
            headerBackgroundContainerStyle: styles.header,
            headerTitle: 'mda',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pacifico_400Regular',
              color: appTheme.secondary,
              fontSize: 32
            },
            tabBarStyle: styles.tabBar,
            tabBarLabelPosition: 'below-icon',
            tabBarLabelStyle: {
              color: appTheme.primary,
              textTransform: 'capitalize',
              fontSize: 12,
              fontFamily: 'Roboto_400Regular'
            },
            tabBarActiveBackgroundColor: appTheme.backgroundLight
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              href: '/',
              tabBarLabel: i18n.t('screens.home'),
              tabBarIcon: () => <FontAwesome name="home" size={32} color={appTheme.primary} />
            }}
          />
          <Tabs.Screen
            name="diagnose"
            options={{
              href: '/diagnose',
              tabBarLabel: i18n.t('screens.diagnose'),
              tabBarIcon: () => <FontAwesome name="stethoscope" size={32} color={appTheme.primary} />
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              href: '/history',
              tabBarLabel: i18n.t('screens.history'),
              tabBarIcon: () => <FontAwesome name="clock-o" size={32} color={appTheme.primary} />
            }}
          />
        </Tabs>
      </S.AppWrapper>
    </ThemeProvider>
  )
}

const S = {
  AppWrapper: styled.View`
    flex: 1;
    flex-direction: column;
    background-color: ${appTheme.background};
  `
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: appTheme.backdround,
    height: 95
  },
  header: {
    backgroundColor: appTheme.backdround,
    height: 80
  }
})

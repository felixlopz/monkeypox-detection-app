import {appTheme} from 'src/styles/theme'
import {StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import {Tabs} from 'expo-router'
import i18n from 'src/services/i18n'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Splash from 'src/screens/Splash'
import {connect, useDispatch, useSelector} from 'react-redux'
import {initApplication} from '../store/rootActions'
import {selectAppLoaded} from '../store/appSlice'
import {dimensions} from 'src/styles/dimensions'

export const Navigation = () => {
  const dispatch = useDispatch()
  const appLoaded: boolean = useSelector(selectAppLoaded)

  if (appLoaded === false) {
    dispatch(initApplication())
  }

  if (appLoaded === false) return <Splash />

  return (
    <S.AppWrapper>
      <Tabs
        screenOptions={{
          headerStatusBarHeight: Number(dimensions(40, '')),
          headerStyle: styles.header,
          headerBackgroundContainerStyle: styles.header,
          headerTitle: 'mda',
          headerTitleAlign: 'center',
          headerTitleContainerStyle: {},
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
        }}>
        <Tabs.Screen
          name="index"
          options={{
            href: '/',
            tabBarLabel: i18n.t('screens.home'),
            tabBarIcon: () => (
              <FontAwesome name="home" size={32} color={appTheme.primary} />
            )
          }}
        />
        <Tabs.Screen
          name="diagnose"
          options={{
            href: '/diagnose',
            tabBarLabel: i18n.t('screens.diagnose'),
            tabBarIcon: () => (
              <FontAwesome
                name="stethoscope"
                size={32}
                color={appTheme.primary}
              />
            )
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            href: '/history',
            tabBarLabel: i18n.t('screens.history'),
            tabBarIcon: () => (
              <FontAwesome name="clock-o" size={32} color={appTheme.primary} />
            )
          }}
        />
      </Tabs>
    </S.AppWrapper>
  )
}

export default connect()(Navigation)

const S = {
  AppWrapper: styled.View`
    flex: 1;
    flex-direction: column;
    background-color: ${appTheme.background};
  `
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: appTheme.background,
    height: Number(dimensions(100, ''))
  },
  tabBar: {
    backgroundColor: appTheme.background,
    height: Number(dimensions(90, ''))
  }
})

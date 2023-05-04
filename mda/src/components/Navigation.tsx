import {appTheme} from 'src/styles/theme'
import {StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import {Tabs} from 'expo-router'
import {i18n} from 'src/services'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {Splash} from '../screens/Splash'
import {connect, useDispatch, useSelector} from 'react-redux'
import {initApplication} from '../store/rootActions'
import {RootState} from 'src/store/rootReducer'
import {Dispatch} from 'redux'
import {selectAppLoaded, selectModelLoaded} from '../store/appSlice'

interface StateFromProps {
  modelLoaded: boolean
}

interface DispatchFromProps {}

type Props = StateFromProps & DispatchFromProps & {}

export const Navigation: React.FC<Props> = () => {
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

function mapStateToProps(state: RootState): StateFromProps {
  return {
    modelLoaded: state.app.modelLoaded
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)

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

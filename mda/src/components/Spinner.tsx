import styled from 'styled-components/native'
import {ActivityIndicator} from 'react-native'
import {appTheme} from '../styles/theme'
import {useAssets} from 'expo-asset'

export default function Spinner() {
  const [assets, error] = useAssets([require('../assets/images/splash.png')])

  if (assets == null) {
    return null
  }

  return (
    <S.Spinner testID="spinner">
      <S.ImageWrapper>
        <S.Image source={{uri: assets[0].uri}} />
      </S.ImageWrapper>
      <ActivityIndicator testID="activity-indicator" color={appTheme.primary} size="large" />
    </S.Spinner>
  )
}

const S = {
  Spinner: styled.View`
    background-color: ${appTheme.background};
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  ImageWrapper: styled.View`
    width: 150px;
    height: 87px;
    margin-bottom: 40px;
  `,
  Image: styled.Image`
    width: 100%;
    height: 100%;
    object-fit: contain;
  `
}

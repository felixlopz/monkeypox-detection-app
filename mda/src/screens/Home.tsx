import styled from 'styled-components/native'
import {Stack} from 'expo-router'
import {i18n} from 'src/services/i18n'
import {useAssets} from 'expo-asset'

export default function HomeScreen() {
  const [assets, error] = useAssets([require('../assets/images/mda_researcher.png')])

  if (assets == null) {
    return null
  }

  return (
    <S.Wrapper testID="home-screen">
      <Stack.Screen
        options={{
          title: i18n.t('screens.home')
        }}
      />
      <S.ImageWrapper>
        <S.Image source={{uri: assets[0].uri}} />
      </S.ImageWrapper>
    </S.Wrapper>
  )
}

const S = {
  Wrapper: styled.View`
    flex: 1;
    align-items: center;
    background-color: ${props => props.theme.background};
  `,
  ImageWrapper: styled.View`
    width: 337px;
    height: 232px;
  `,
  Image: styled.Image`
    width: 100%;
    height: 100%;
  `,
  Title: styled.Text`
    color: ${p => p.theme.primary};
    font-weight: 900;
    font-size: ${p => p.theme.dimensions(20, 'px')};
    margin-bottom: ${p => p.theme.dimensions(10, 'px')};
  `,
  Text: styled.Text`
    color: ${p => p.theme.primary};
    font-weight: 300;
    font-size: ${p => p.theme.dimensions(15, 'px')};
    margin-bottom: ${p => p.theme.dimensions(15, 'px')};
  `
}

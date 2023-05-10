import styled from 'styled-components/native'
import {Stack} from 'expo-router'
import {i18n} from 'src/services/i18n'
import {useAssets} from 'expo-asset'
import {A} from '@expo/html-elements'

export default function HomeScreen() {
  const [assets, error] = useAssets([
    require('../assets/images/mda_researcher.png')
  ])

  if (assets == null) {
    return null
  }

  return (
    <S.Wrapper testID="home-screen">
      <S.Container>
        <Stack.Screen
          options={{
            title: i18n.t('screens.home')
          }}
        />
        <S.ImageWrapper>
          <S.Image source={{uri: assets[0].uri}} />
        </S.ImageWrapper>
        <S.InfoWrapper>
          <S.Title>{i18n.t('home.monkeypoxFactTitle')}</S.Title>
          <S.Text>
            {i18n.t('home.monkeypoxFactText')}{' '}
            <S.LinkWrapper>
              <S.Link
                href={
                  'https://www.who.int/news-room/fact-sheets/detail/monkeypox#:~:text=Mpox%20(monkeypox)%20is%20an%20infectious,Anyone%20can%20get%20mpox.'
                }
                target="_blank">
                {i18n.t('home.link')}
              </S.Link>
            </S.LinkWrapper>
          </S.Text>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.Title>{i18n.t('home.appFactTitle')}</S.Title>
          <S.Text>{i18n.t('home.appFactText1')}</S.Text>
          <S.Text>{i18n.t('home.appFactText2')}</S.Text>
          <S.Text>
            {i18n.t('home.appFactText3')}{' '}
            <S.LinkWrapper>
              <S.Link
                href={'https://github.com/felixlopz/monkeypox-detection-app'}
                target="_blank">
                {i18n.t('home.link')}
              </S.Link>
            </S.LinkWrapper>
          </S.Text>
        </S.InfoWrapper>
      </S.Container>
    </S.Wrapper>
  )
}

const S = {
  Wrapper: styled.ScrollView`
    background-color: ${props => props.theme.background};
  `,
  Container: styled.View`
    flex: 1;
    align-items: center;
    padding-left: 14px;
    padding-right: 14px;
    max-width: ${p => p.theme.dimensions(400, 'px')};
    margin: 0 auto;
  `,
  ImageWrapper: styled.View`
    width: ${p => p.theme.dimensions(337, 'px')};
    height: ${p => p.theme.dimensions(232, 'px')};
    margin-top: ${p => p.theme.dimensions(20, 'px')};
    margin-bottom: ${p => p.theme.dimensions(40, 'px')};
  `,
  Image: styled.Image`
    width: 100%;
    height: 100%;
    object-fit: contain;
  `,
  InfoWrapper: styled.View`
    width: 100%;
    padding: ${p => p.theme.dimensions(26, 'px')};
    background-color: ${props => props.theme.backgroundLight};
    margin-bottom: ${p => p.theme.dimensions(48, 'px')};
    border-top-left-radius: ${p => p.theme.dimensions(8, 'px')};
    border-top-right-radius: ${p => p.theme.dimensions(8, 'px')};
    border-bottom-left-radius: ${p => p.theme.dimensions(8, 'px')};
    border-bottom-right-radius: ${p => p.theme.dimensions(8, 'px')};
  `,
  Title: styled.Text`
    color: ${p => p.theme.title};
    font-weight: 800;
    font-family: ${p => p.theme.robotoBold};
    font-size: ${p => p.theme.dimensions(22, 'px')};
    margin-bottom: ${p => p.theme.dimensions(16, 'px')};
  `,
  Text: styled.Text`
    color: ${p => p.theme.text};
    font-weight: 400;
    font-family: ${p => p.theme.robotoRegular};
    font-size: ${p => p.theme.dimensions(14, 'px')};
    line-height: ${p => p.theme.dimensions(20, 'px')};
    margin-bottom: ${p => p.theme.dimensions(10, 'px')};
  `,
  LinkWrapper: styled.TouchableOpacity`
    cursor: pointer;
  `,
  Link: styled(A)`
    font-weight: 800;
    font-family: ${p => p.theme.robotoBold};
    color: ${p => p.theme.primary};
  `
}

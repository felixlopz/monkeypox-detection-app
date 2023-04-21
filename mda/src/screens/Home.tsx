import styled from 'styled-components/native'
import { Stack } from 'expo-router'
import LinkButton from 'src/components/LinkButton'

export default function HomeScreen() {
  return (
    <S.Wrapper testID="home-screen">
      <Stack.Screen options={{ title: 'Home Screen', headerShown: false }} />

      <S.Title testID="home-screen-title">🏠 Home Screen 🏠</S.Title>
      <S.Text testID="home-screen-text">Go to src/screens/Home.tsx to edit</S.Text>

      <LinkButton href="/history" text="Go To Second Screen" />
    </S.Wrapper>
  )
}

const S = {
  Wrapper: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,
  Title: styled.Text`
    color: ${p => p.theme.primary};
    font-family: helvetica;
    font-weight: 900;
    font-size: ${p => p.theme.dimensions(20, 'px')};
    margin-bottom: ${p => p.theme.dimensions(10, 'px')};
  `,
  Text: styled.Text`
    color: ${p => p.theme.primary};
    font-family: helvetica;
    font-weight: 300;
    font-size: ${p => p.theme.dimensions(15, 'px')};
    margin-bottom: ${p => p.theme.dimensions(15, 'px')};
  `
}

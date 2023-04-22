import styled from 'styled-components/native'
import {Stack} from 'expo-router'
import {i18n} from 'src/services/i18n'
import {CameraComponent} from 'src/components'

export const Diagnostic = () => {
  return (
    <S.Wrapper>
      <Stack.Screen options={{title: i18n.t('screens.diagnose')}} />
      <S.Container>
        <CameraComponent />
      </S.Container>
    </S.Wrapper>
  )
}

export default Diagnostic

const S = {
  Wrapper: styled.View`
    flex: 1;
  `,
  Container: styled.View`
    flex: 1;
  `
}

import Spinner from 'src/components/Spinner'
import styled from 'styled-components/native'

export const Splash = () => {
  return (
    <S.Wrapper>
      <Spinner />
    </S.Wrapper>
  )
}

export default Splash

const S = {
  Wrapper: styled.View`
    flex: 1;
  `
}

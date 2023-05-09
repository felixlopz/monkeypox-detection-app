import styled from 'styled-components/native'

interface Props {
  text: string
  onPress?: () => void
}

export default function Button({text, onPress}: Props) {
  return (
    <S.Button testID="link-button" onPress={onPress}>
      <S.ButtonText testID="link-button-text">{text}</S.ButtonText>
    </S.Button>
  )
}

const S = {
  Button: styled.TouchableOpacity`
    padding-top: ${p => p.theme.dimensions(10, 'px')};
    padding-bottom: ${p => p.theme.dimensions(10, 'px')};
    padding-right: ${p => p.theme.dimensions(20, 'px')};
    padding-left: ${p => p.theme.dimensions(20, 'px')};
    border-color: ${p => p.theme.primary};
    border-width: ${p => p.theme.dimensions(1, 'px')};
    border-radius: ${p => p.theme.dimensions(5, 'px')};
    background-color: transparent;
  `,
  ButtonText: styled.Text`
    color: ${p => p.theme.primary};
    font-weight: 700;
  `
}

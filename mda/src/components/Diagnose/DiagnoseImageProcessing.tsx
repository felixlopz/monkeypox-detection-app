import {useEffect, useState} from 'react'
import {Dimensions, Animated, Easing} from 'react-native'
import {i18n} from 'src/services/i18n'
import styled from 'styled-components/native'

interface DiagnoseImageProcessingProps {}

export const DiagnoseImageProcessing: React.FC<
  DiagnoseImageProcessingProps
> = props => {
  const [spinValue] = useState(new Animated.Value(0))

  // Loop Use Effect
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start()
  }, [spinValue])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <S.Wrapper>
      <S.Loading style={{transform: [{rotate: spin}]}}>
        <S.Circle style={{top: -20}} />
        <S.Circle style={{bottom: -10, right: -20}} />
        <S.Circle style={{bottom: -10, left: -20}} />
      </S.Loading>
      <S.ProcessingText>{i18n.t('diagnose.processing')}</S.ProcessingText>
    </S.Wrapper>
  )
}

export default DiagnoseImageProcessing

const S = {
  Wrapper: styled.View`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${p => p.theme.background};
  `,
  Loading: styled(Animated.View)`
    position: relative;
    width: ${p => p.theme.dimensions(150, 'px')};
    height: ${p => p.theme.dimensions(150, 'px')};
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Circle: styled.View`
    position: absolute;
    background-color: ${p => p.theme.primary};
    width: 80%;
    height: 80%;
    opacity: 0.47;
    border-radius: ${p =>
      p.theme.dimensions(
        Math.round(
          Dimensions.get('window').width + Dimensions.get('window').height
        ) / 2,
        'px'
      )};
  `,
  ProcessingText: styled.Text`
    margin-top: ${p => p.theme.dimensions(40, 'px')};
    text-transform: capitalize;
  `
}

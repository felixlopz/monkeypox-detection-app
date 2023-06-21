import {CameraCapturedPicture} from 'expo-camera'
import {ImagePickerAsset} from 'expo-image-picker'
import {useDispatch, useSelector} from 'react-redux'
import {
  DiagnoseProcessStatus,
  selectPrediction,
  setDiagnosisResults,
  setProcessStatus
} from 'src/screens/Diagnose/store/DiagnoseSlice'
import styled from 'styled-components/native'
import Button from 'src/components/Button'
import {
  getAllDiagnosisResult,
  saveDiagnosisResult
} from 'src/services/asyncStorage'
import {i18n} from 'src/services/i18n'
import {Alert, Platform} from 'react-native'

interface DiagnoseImageProcessingReporting {
  image: CameraCapturedPicture | ImagePickerAsset
}

export const DiagnoseImageReporting: React.FC<
  DiagnoseImageProcessingReporting
> = ({image}) => {
  const prediction = useSelector(selectPrediction)

  const predictionText = i18n.t(`reporting.${prediction}`)

  const dispatch = useDispatch()

  const onAnalyzeOtherPress = () => {
    dispatch(setProcessStatus(DiagnoseProcessStatus.Acquiring))
  }

  const constructImageName = (): string => {
    const prefix = 'mdacapture-'
    const date = new Date().toISOString().split('.')[0].replaceAll(':', '')
    const extension = '.jpeg'
    return prefix + date + extension
  }

  const imageName = constructImageName()

  const saveDiagnosisResultToLocalStorage = async () => {
    await saveDiagnosisResult({
      id: Date.now().toString(),
      prediction: prediction,
      name: imageName,
      imageUri: image.uri
    })

    const results = await getAllDiagnosisResult()

    dispatch(setDiagnosisResults(results))

    if (Platform.OS === 'web') {
      alert(i18n.t('alert.dianosisSaved'))
    } else {
      Alert.alert(i18n.t('alert.dianosisSaved'))
    }
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.ImageWrapper>
          <S.ImageName>{imageName}</S.ImageName>
          <S.ImageContainer>
            <S.Image source={{uri: image.uri}} />
          </S.ImageContainer>
        </S.ImageWrapper>

        <S.ReportWrapper>
          <S.InfoWrapper>
            <S.ReportTitle>{predictionText}</S.ReportTitle>
            <S.ReportMessage>
              {i18n.t('reporting.reportMessage')} {predictionText}
            </S.ReportMessage>
          </S.InfoWrapper>
          <S.ButtonWrapper>
            <S.Button
              text={i18n.t('reporting.analyzeOther')}
              onPress={onAnalyzeOtherPress}
            />
            <S.Button
              text={i18n.t('reporting.saveResult')}
              onPress={saveDiagnosisResultToLocalStorage}
            />
          </S.ButtonWrapper>
        </S.ReportWrapper>
      </S.Container>
    </S.Wrapper>
  )
}

export default DiagnoseImageReporting

const S = {
  Wrapper: styled.ScrollView`
    flex: 1;
    height: 100%;
    display: flex;
    background-color: ${p => p.theme.background};
  `,
  Container: styled.View`
    max-width: ${p => p.theme.dimensions(500, 'px')};
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    padding-left: ${p => p.theme.dimensions(14, 'px')};
    padding-right: ${p => p.theme.dimensions(14, 'px')};
    padding-top: ${p => p.theme.dimensions(4, 'px')};
  `,
  ImageWrapper: styled.View`
    background-color: #eaf4f2;
    padding-left: ${p => p.theme.dimensions(28, 'px')};
    padding-right: ${p => p.theme.dimensions(28, 'px')};
    padding-top: ${p => p.theme.dimensions(22, 'px')};
    padding-bottom: ${p => p.theme.dimensions(22, 'px')};
    border-radius: ${p => p.theme.dimensions(8, 'px')};
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ImageName: styled.Text`
    font-size: ${p => p.theme.dimensions(12, 'px')};
    font-family: ${p => p.theme.robotoRegular};
    margin-bottom: ${p => p.theme.dimensions(20, 'px')};
  `,
  ImageContainer: styled.View`
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: ${p => p.theme.dimensions(8, 'px')};
    overflow: hidden;
  `,
  Image: styled.Image`
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    top: 0;
  `,
  ReportWrapper: styled.View`
    background-color: ${p => p.theme.backgroundLight};
    border-radius: ${p => p.theme.dimensions(8, 'px')};
    display: flex;
    flex-direction: column;
    padding-left: ${p => p.theme.dimensions(28, 'px')};
    padding-right: ${p => p.theme.dimensions(28, 'px')};
    padding-top: ${p => p.theme.dimensions(22, 'px')};
    padding-bottom: ${p => p.theme.dimensions(22, 'px')};
    margin-top: ${p => p.theme.dimensions(4, 'px')};
  `,
  InfoWrapper: styled.View`
    width: 100%;
  `,
  ReportTitle: styled.Text`
    font-size: ${p => p.theme.dimensions(20, 'px')};
    font-family: ${p => p.theme.robotoBold};
    margin-bottom: ${p => p.theme.dimensions(12, 'px')};
    color: ${p => p.theme.title};
  `,
  ReportMessage: styled.Text`
    font-size: ${p => p.theme.dimensions(14, 'px')};
    font-family: ${p => p.theme.robotoRegular};
    margin-bottom: ${p => p.theme.dimensions(19, 'px')};
    color: ${p => p.theme.text};
  `,

  ButtonWrapper: styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-self: center;
    margin-top: ${p => p.theme.dimensions(20, 'px')};
  `,
  Button: styled(Button)`
    margin-right: ${p => p.theme.dimensions(20, 'px')};
  `
}

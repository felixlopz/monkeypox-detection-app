import {CameraCapturedPicture} from 'expo-camera'
import {ImagePickerAsset} from 'expo-image-picker'
import styled from 'styled-components/native'

interface DiagnoseImageProcessingReporting {
  image: CameraCapturedPicture | ImagePickerAsset
}

export const DiagnoseImageReporting: React.FC<DiagnoseImageProcessingReporting> = props => {
  const percentange: number = 87

  return (
    <S.Wrapper>
      <S.Container>
        <S.ImageWrapper>
          <S.ImageName>mda_capture_04_23_2023T4232.jpg</S.ImageName>
          <S.ImageContainer>
            <S.Image source={{uri: props.image.uri}} />
          </S.ImageContainer>
        </S.ImageWrapper>
        <S.ReportWrapper>
          <S.PercentangeBarWrapper>
            <S.PercentangeBar>
              <S.Progress />
            </S.PercentangeBar>
            <S.PercentangeText>{percentange}%</S.PercentangeText>
          </S.PercentangeBarWrapper>
          <S.InfoWrapper>
            <S.ReportTitle>Monkeypox</S.ReportTitle>
            <S.ReportMessage>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed leo nulla, bibendum eu mauris vitae, suscipit congue tellus. Proin
              vestibulum eu nibh
            </S.ReportMessage>
          </S.InfoWrapper>
        </S.ReportWrapper>
      </S.Container>
    </S.Wrapper>
  )
}

export default DiagnoseImageReporting

const S = {
  Wrapper: styled.ScrollView`
    flex: 1;
    background-color: ${p => p.theme.background};
  `,
  Container: styled.View`
    flex: 1;
    display: flex;
    max-width: ${p => p.theme.dimensions(400, 'px')};
    margin: 0 auto;
    width: 100%;
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
    flex-basis: 60%;
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
    width: 60%;
    aspect-ratio: 9 / 16;
    border-radius: ${p => p.theme.dimensions(8, 'px')};
    background-color: pink;
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
    flex-basis: 40%;
    background-color: ${p => p.theme.backgroundLight};
    border-radius: ${p => p.theme.dimensions(8, 'px')};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: ${p => p.theme.dimensions(28, 'px')};
    padding-right: ${p => p.theme.dimensions(28, 'px')};
    padding-top: ${p => p.theme.dimensions(22, 'px')};
    padding-bottom: ${p => p.theme.dimensions(22, 'px')};
    margin-top: ${p => p.theme.dimensions(4, 'px')};
  `,
  PercentangeBarWrapper: styled.View`
    display: flex;
    align-items: center;
  `,
  PercentangeBar: styled.View`
    position: relative;
    height: ${p => p.theme.dimensions(160, 'px')};
    width: ${p => p.theme.dimensions(20, 'px')};
    background-color: ${p => p.theme.backgroundDark};
    border-radius: ${p => p.theme.dimensions(8, 'px')};
    overflow: hidden;
  `,
  Progress: styled.View`
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 80%;
    background-color: ${p => p.theme.primary};
  `,
  PercentangeText: styled.Text`
    font-size: ${p => p.theme.dimensions(16, 'px')};
    font-family: ${p => p.theme.robotoBold};
    color: ${p => p.theme.primary};
    margin-top: ${p => p.theme.dimensions(10, 'px')};
  `,
  InfoWrapper: styled.View`
    max-width: ${p => p.theme.dimensions(220, 'px')};
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
  `
}

import styled from 'styled-components/native'
import {useEffect, useRef, useState} from 'react'
import {Camera, CameraCapturedPicture, CameraType, ImageType} from 'expo-camera'
import {Dimensions, Platform} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {appTheme} from 'src/styles/theme'
import * as ImagePicker from 'expo-image-picker'
import {i18n} from 'src/services'

export interface ImageAcquirerProps {
  onImageAcquired: (
    image: CameraCapturedPicture | ImagePicker.ImagePickerAsset
  ) => void
}

async function pickImage(): Promise<ImagePicker.ImagePickerAsset | null> {
  let result: ImagePicker.ImagePickerResult =
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false
    })

  if (
    result != null &&
    result.canceled != null &&
    result.canceled == false &&
    result.assets != null &&
    result.assets[0] != null
  ) {
    return result.assets[0]
  }

  return null
}

export const ImagePickerComponent: React.FC<ImageAcquirerProps> = props => {
  const onPress = async () => {
    const image = await pickImage()
    if (image != null) {
      props.onImageAcquired(image)
    }
  }

  return (
    <S.ImagePicker onPress={onPress}>
      <FontAwesome name="image" size={32} color={appTheme.background} />
    </S.ImagePicker>
  )
}

export const CameraComponent: React.FC<ImageAcquirerProps> = props => {
  const [cameraType, setCameraType] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const ref = useRef<Camera>(null)

  async function askForCameraPermission() {
    const cameraPermission = await Camera.requestCameraPermissionsAsync()
  }

  async function takeImage() {
    if (ref.current == null) {
      return
    }

    if (permission?.granted == false) {
      askForCameraPermission()
    }

    try {
      const image = await ref.current.takePictureAsync({
        quality: 1,
        imageType: ImageType.jpg
      })

      props.onImageAcquired(image)
    } catch (error) {}
  }

  function toggleCameraType() {
    setCameraType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  if (permission?.granted == false) {
    askForCameraPermission()
  }

  return (
    <S.Camera type={cameraType} ref={ref} ratio="1:1">
      <S.Controls>
        <ImagePickerComponent onImageAcquired={props.onImageAcquired} />
        <S.CameraButtonWrapper onPress={takeImage}>
          <S.CameraButtonOuter />
          <S.CameraButtonInner />
        </S.CameraButtonWrapper>
        <S.ChangeCameraTypeButton onPress={toggleCameraType}>
          <FontAwesome
            name="rotate-left"
            color={appTheme.background}
            size={32}
          />
        </S.ChangeCameraTypeButton>
      </S.Controls>
    </S.Camera>
  )
}

export const DiagnoseImageAcquirer: React.FC<ImageAcquirerProps> = ({
  onImageAcquired
}) => {
  const onPress = async () => {
    const image = await pickImage()
    if (image != null) {
      onImageAcquired(image)
    }
  }

  return (
    <S.Wrapper>
      <S.Container>
        {Platform.OS === 'web' ? (
          <S.WebImagePickerWrapper>
            <S.WebImagePicker onPress={onPress}>
              <S.WebImagePickerText>
                {i18n.t('acquirer.webImagePickerText')}
              </S.WebImagePickerText>
              <FontAwesome name="image" size={64} color={appTheme.primary} />
            </S.WebImagePicker>
          </S.WebImagePickerWrapper>
        ) : (
          <CameraComponent onImageAcquired={onImageAcquired} />
        )}
      </S.Container>
    </S.Wrapper>
  )
}

export default DiagnoseImageAcquirer

const S = {
  Wrapper: styled.View`
    flex: 1;
    background-color: black;
  `,
  Container: styled.View`
    flex: 1;
  `,
  Camera: styled(Camera)`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,
  Controls: styled.View`
    width: 100%;
    padding-left: ${p => p.theme.dimensions(40, 'px')};
    padding-right: ${p => p.theme.dimensions(40, 'px')};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: ${p => p.theme.dimensions(140, 'px')};
    max-width: ${p => p.theme.dimensions(400, 'px')};
    margin: 0 auto;
  `,
  CameraButtonWrapper: styled.TouchableOpacity`
    width: ${p => p.theme.dimensions(80, 'px')};
    height: ${p => p.theme.dimensions(80, 'px')};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  `,
  CameraButtonOuter: styled.View`
    background-color: ${p => p.theme.primary};
    width: 100%;
    height: 100%;
    border-radius: ${p =>
      p.theme.dimensions(
        Math.round(
          Dimensions.get('window').width + Dimensions.get('window').height
        ) / 2,
        'px'
      )};
  `,
  CameraButtonInner: styled.View`
    position: absolute;
    background-color: ${p => p.theme.background};
    width: ${p => p.theme.dimensions(60, 'px')};
    height: ${p => p.theme.dimensions(60, 'px')};
    border-radius: ${p =>
      p.theme.dimensions(
        Math.round(
          Dimensions.get('window').width + Dimensions.get('window').height
        ) / 2,
        'px'
      )};
  `,
  ChangeCameraTypeButton: styled.TouchableOpacity``,
  ImagePicker: styled.TouchableOpacity``,
  WebImagePickerWrapper: styled.View`
    flex: 1;
    background-color: ${appTheme.background};
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  WebImagePicker: styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
  WebImagePickerText: styled.Text`
    font-size: ${p => p.theme.dimensions(24, 'px')};
    font-family: ${p => p.theme.robotoBold};
    margin-bottom: ${p => p.theme.dimensions(19, 'px')};
    color: ${p => p.theme.title};
  `
}

import styled from 'styled-components/native'
import {StyleSheet, Text, View} from 'react-native'
import {useEffect, useState} from 'react'
import {Camera, CameraType} from 'expo-camera'
import {Dimensions} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {appTheme} from 'src/styles/theme'

export const CameraComponent = () => {
  const [cameraType, setCameraType] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions()

  async function askForCameraPermission() {
    const camerPermission = await Camera.requestCameraPermissionsAsync()
  }

  function toggleCameraType() {
    setCameraType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
  }

  if (permission?.granted == false) {
    askForCameraPermission()
  }

  return (
    <S.Wrapper>
      <S.Camera type={cameraType}>
        <S.Controls>
          <S.GallerySelector></S.GallerySelector>
          <S.CameraButtonWrapper>
            <S.CameraButtonOuter />
            <S.CameraButtonInner />
          </S.CameraButtonWrapper>
          <S.ChangeCameraTypeButton onPress={toggleCameraType}>
            <FontAwesome name="rotate-left" color={appTheme.background} size={32} />
          </S.ChangeCameraTypeButton>
        </S.Controls>
      </S.Camera>
    </S.Wrapper>
  )
}

export default CameraComponent

const S = {
  Wrapper: styled.View`
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
    border-radius: ${p => p.theme.dimensions(Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2, 'px')};
  `,
  CameraButtonInner: styled.View`
    position: absolute;
    background-color: ${p => p.theme.background};
    width: ${p => p.theme.dimensions(60, 'px')};
    height: ${p => p.theme.dimensions(60, 'px')};
    border-radius: ${p => p.theme.dimensions(Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2, 'px')};
  `,
  GallerySelector: styled.TouchableOpacity`
    background-color: grey;
    width: ${p => p.theme.dimensions(40, 'px')};
    height: ${p => p.theme.dimensions(40, 'px')};
    border-radius: 8px;
  `,
  ChangeCameraTypeButton: styled.TouchableOpacity``
}

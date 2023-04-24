import styled from 'styled-components/native'
import {Stack} from 'expo-router'
import {i18n} from 'src/services/i18n'
import {DiagnoseImageAcquirer, DiagnoseImageReporting} from 'src/components'
import {useState} from 'react'
import {CameraCapturedPicture} from 'expo-camera'
import {ImagePickerAsset} from 'expo-image-picker'
import DiagnoseImageProcessing from 'src/components/Diagnose/DiagnoseImageProcessing'

enum DiagnoseProcessStatus {
  Acquiring = 'Acquiring',
  Processing = 'Processing',
  Reporting = 'Reporting'
}

export const Diagnostic = () => {
  const [image, setImage] = useState<CameraCapturedPicture | ImagePickerAsset | undefined>(undefined)
  const [diagnoseProcessStatus, setDiagnoseProcessStatus] = useState<DiagnoseProcessStatus>(DiagnoseProcessStatus.Acquiring)

  function onImageAcquired(image: CameraCapturedPicture | ImagePickerAsset) {
    setImage(image)
    setDiagnoseProcessStatus(DiagnoseProcessStatus.Processing)
  }

  function onImageProcessed() {
    setDiagnoseProcessStatus(DiagnoseProcessStatus.Reporting)
  }

  return (
    <S.Wrapper>
      <Stack.Screen options={{title: i18n.t('screens.diagnose')}} />
      <S.Container>
        {diagnoseProcessStatus === DiagnoseProcessStatus.Acquiring && <DiagnoseImageAcquirer onImageAcquired={onImageAcquired} />}
        {diagnoseProcessStatus === DiagnoseProcessStatus.Processing && <DiagnoseImageProcessing onImageProcessed={onImageProcessed} />}
        {diagnoseProcessStatus === DiagnoseProcessStatus.Reporting && image != null && <DiagnoseImageReporting image={image} />}
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

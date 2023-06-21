import styled from 'styled-components/native'
import {Stack} from 'expo-router'
import {i18n} from 'src/services/i18n'
import {CameraCapturedPicture} from 'expo-camera'
import {ImagePickerAsset} from 'expo-image-picker'
import DiagnoseImageAcquirer from 'src/components/Diagnose/DiagnoseImageAcquirer'
import DiagnoseImageProcessing from 'src/components/Diagnose/DiagnoseImageProcessing'
import DiagnoseImageReporting from 'src/components/Diagnose/DiagnoseImageReporting'

import {connect, useDispatch, useSelector} from 'react-redux'
import {
  DiagnoseProcessStatus,
  setProcessStatus,
  setCapturedImage,
  selectDiagnoseProcessStatus,
  selectCapturedImage
} from './store/DiagnoseSlice'

export const Diagnostic = () => {
  const dispatch = useDispatch()
  const processStatus = useSelector(selectDiagnoseProcessStatus)
  const capturedImage = useSelector(selectCapturedImage)

  function onImageAcquired(image: CameraCapturedPicture | ImagePickerAsset) {
    dispatch(setCapturedImage(image))
    dispatch(setProcessStatus(DiagnoseProcessStatus.Processing))
  }

  return (
    <S.Wrapper>
      <Stack.Screen options={{title: i18n.t('screens.diagnose')}} />
      <S.Container>
        {processStatus === DiagnoseProcessStatus.Acquiring && (
          <DiagnoseImageAcquirer onImageAcquired={onImageAcquired} />
        )}
        {processStatus === DiagnoseProcessStatus.Processing &&
          capturedImage != null && <DiagnoseImageProcessing />}
        {processStatus === DiagnoseProcessStatus.Reporting &&
          capturedImage != null && (
            <DiagnoseImageReporting image={capturedImage} />
          )}
      </S.Container>
    </S.Wrapper>
  )
}

export default connect()(Diagnostic)

const S = {
  Wrapper: styled.View`
    flex: 1;
  `,
  Container: styled.View`
    flex: 1;
  `
}

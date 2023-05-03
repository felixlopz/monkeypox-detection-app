import styled from 'styled-components/native'
import {Stack} from 'expo-router'
import {i18n} from 'src/services/i18n'
import {DiagnoseImageAcquirer, DiagnoseImageReporting} from 'src/components'
import {useEffect, useState} from 'react'
import {CameraCapturedPicture} from 'expo-camera'
import {ImagePickerAsset} from 'expo-image-picker'
import DiagnoseImageProcessing from 'src/components/Diagnose/DiagnoseImageProcessing'
import {Tensor, Rank} from '@tensorflow/tfjs'

import {connect} from 'react-redux'
import {
  DiagnoseProcessStatus,
  setProcessStatus,
  CapturedImageType,
  setCapturedImage
} from './store/DiagnoseSlice'
import {RootState} from '../../store'
import {Dispatch} from 'redux'

interface StateFromProps {
  processStatus: DiagnoseProcessStatus
  capturedImage: CapturedImageType
}

interface DispatchFromProps {
  setDiagnoseProcessStatus: (processStatus: DiagnoseProcessStatus) => void
  setCapturedImage: (image: CapturedImageType) => void
}

type Props = StateFromProps & DispatchFromProps & {}

export const Diagnostic: React.FC<Props> = ({
  processStatus,
  capturedImage,
  setDiagnoseProcessStatus,
  setCapturedImage,
  ...props
}) => {
  const [batchedImage, setBatchedImage] = useState<Tensor<Rank> | undefined>(
    undefined
  )

  function onImageAcquired(image: CameraCapturedPicture | ImagePickerAsset) {
    setCapturedImage(image)
    setDiagnoseProcessStatus(DiagnoseProcessStatus.Processing)
  }

  function onImageProcessed(batchedImage: Tensor<Rank>) {
    setDiagnoseProcessStatus(DiagnoseProcessStatus.Reporting)
  }

  return (
    <S.Wrapper>
      <Stack.Screen options={{title: i18n.t('screens.diagnose')}} />
      <S.Container>
        {processStatus === DiagnoseProcessStatus.Acquiring && (
          <DiagnoseImageAcquirer onImageAcquired={onImageAcquired} />
        )}
        {processStatus === DiagnoseProcessStatus.Processing &&
          capturedImage != null && (
            <DiagnoseImageProcessing
              image={capturedImage}
              onImageProcessed={onImageProcessed}
            />
          )}
        {processStatus === DiagnoseProcessStatus.Reporting &&
          capturedImage != null && (
            <DiagnoseImageReporting image={capturedImage} />
          )}
      </S.Container>
    </S.Wrapper>
  )
}

function mapStateToProps(state: RootState): StateFromProps {
  return {
    processStatus: state.diagnoseScreen.processStatus,
    capturedImage: state.diagnoseScreen.capturedImage
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    setDiagnoseProcessStatus: (processStatus: DiagnoseProcessStatus) => {
      return dispatch(setProcessStatus(processStatus))
    },
    setCapturedImage: (image: CapturedImageType) => {
      return dispatch(setCapturedImage(image))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Diagnostic)

const S = {
  Wrapper: styled.View`
    flex: 1;
  `,
  Container: styled.View`
    flex: 1;
  `
}

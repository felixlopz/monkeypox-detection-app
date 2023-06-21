import {ImageResult, manipulateAsync, SaveFormat} from 'expo-image-manipulator'
import {CapturedImageType} from 'src/screens/Diagnose/store/DiagnoseSlice'

export async function resizeImageForModelPrediction(
  image: CapturedImageType
): Promise<ImageResult> {
  const resizedImage = await manipulateAsync(
    image!.uri,
    [{resize: {width: 224, height: 224}}],
    {
      compress: 1,
      format: SaveFormat.JPEG
    }
  )

  return resizedImage
}

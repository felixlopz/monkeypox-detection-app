import {ImageResult, manipulateAsync, SaveFormat} from 'expo-image-manipulator'
import {CapturedImageType} from 'src/screens'

export async function resizeImageForModelPrediction(
  image: CapturedImageType
): Promise<ImageResult | null> {
  if (image == null) {
    return null
  }

  const resizedImage = await manipulateAsync(
    image.uri,
    [{resize: {width: 224, height: 224}}],
    {
      compress: 1,
      format: SaveFormat.JPEG
    }
  )

  return resizedImage
}

import {DiagnosisResult} from 'src/screens'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DiagnosisResultStorageKey: string = '@DiagnosisResultStorageKey'

export async function saveDiagnosisResult(result: DiagnosisResult) {
  try {
    const diagnosisResult = await getAllDiagnosisResult()

    await AsyncStorage.setItem(
      DiagnosisResultStorageKey,
      JSON.stringify([...diagnosisResult, result])
    )
  } catch (error) {}
}

export async function getAllDiagnosisResult(): Promise<Array<DiagnosisResult>> {
  try {
    const dianosisResultJson = await AsyncStorage.getItem(
      DiagnosisResultStorageKey
    )
    return dianosisResultJson != null ? JSON.parse(dianosisResultJson) : []
  } catch (e) {}

  return []
}

export async function removeAllResults() {
  try {
    await AsyncStorage.setItem(DiagnosisResultStorageKey, JSON.stringify([]))
  } catch (e) {}
}

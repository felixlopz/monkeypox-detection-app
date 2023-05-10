import styled from 'styled-components/native'
import {Stack} from 'expo-router'
import {appTheme} from '../styles/theme'
import {useEffect, useState} from 'react'
import {DiagnosisResult, selectDiagnosisResults} from './Diagnose'
import {getAllDiagnosisResult, i18n, removeAllResults} from 'src/services'
import {Image, ListRenderItem} from 'react-native'
import {useSelector} from 'react-redux'

const Item = ({result}: {result: DiagnosisResult}) => {
  return (
    <S.Item>
      <S.PictureWrapper>
        <S.Picture source={{uri: result.imageUri}} />
      </S.PictureWrapper>
      <S.InfoWrapper>
        <S.Result>{i18n.t(`reporting.${result.prediction}`)}</S.Result>
        <S.Date>{result.name}</S.Date>
      </S.InfoWrapper>
    </S.Item>
  )
}

export default function History() {
  const results = useSelector(selectDiagnosisResults)

  if (results.length === 0) {
    return null
  }

  const renderItem: ListRenderItem<DiagnosisResult> = ({item}) => (
    <Item result={item} />
  )

  return (
    <S.Wrapper testID="second-screen">
      <Stack.Screen options={{title: 'History'}} />
      <S.FlatList data={results} renderItem={renderItem} />
    </S.Wrapper>
  )
}

const S = {
  Wrapper: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${appTheme.background};
  `,
  FlatList: styled.FlatList`
    width: 80%;
    margin-top: ${p => p.theme.dimensions(32, 'px')};
  `,
  Item: styled.View`
    width: 100%;
    padding-left: ${p => p.theme.dimensions(24, 'px')};
    padding-right: ${p => p.theme.dimensions(24, 'px')};
    padding-top: ${p => p.theme.dimensions(12, 'px')};
    padding-bottom: ${p => p.theme.dimensions(12, 'px')};
    background-color: ${appTheme.backgroundLight};
    border-radius: ${p => p.theme.dimensions(8, 'px')};
    margin-bottom: ${p => p.theme.dimensions(32, 'px')};
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  PictureWrapper: styled.View`
    width: ${p => p.theme.dimensions(68, 'px')};
    height: ${p => p.theme.dimensions(68, 'px')};
  `,
  Picture: styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  InfoWrapper: styled.View`
    margin-left: ${p => p.theme.dimensions(24, 'px')};
  `,
  Result: styled.Text`
    color: ${p => p.theme.title};
    font-weight: 800;
    font-family: ${p => p.theme.robotoBold};
    font-size: ${p => p.theme.dimensions(24, 'px')};
    margin-bottom: ${p => p.theme.dimensions(4, 'px')};
  `,
  Date: styled.Text`
    color: ${p => p.theme.text};
    font-weight: 400;
    font-family: ${p => p.theme.robotoRegular};
    font-size: ${p => p.theme.dimensions(14, 'px')};
  `
}

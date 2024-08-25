import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Slider from '../../components/Slider'
import PetListByCategory from '../../components/PetListByCategory'

export default function Home() {
  return (
    <View style={{padding:20,marginTop:20}}>
      <Header/>
      <Slider/>
      <PetListByCategory/>
    </View>
  )
}
import { View, Text,  ScrollView,Dimensions } from 'react-native'
import React from 'react'

import ClipPathComponent from '../components/Clippath';
import HeroSwipper from '../components/HeroSwipper';

const HomeScreen = () => {
  const count =[]
  for (let i =0; i< 200; i++){
    count.push(i)
  }
  const { width, height } = Dimensions.get('window');
 
  return (
    <View
      style={{
        flex:1
      }}
    >

    <ScrollView style={{flex:1}}>
      
       
        <ClipPathComponent/>
        
        <View style={{flex:1}}>
        {
        count.map((value, index)=>{
          return(
            <Text className="text-slate-800">{value}</Text>
          )
        })
      }
        </View>

    </ScrollView>
    </View>


  )
}

export default HomeScreen
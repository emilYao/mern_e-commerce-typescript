import React from 'react';
import { View, Text,Dimensions, StyleSheet,Platform } from 'react-native';
import Svg, {
    Polygon,
    Rect,
    Defs,
    ClipPath
  } from 'react-native-svg';
import HeroSwipper from './HeroSwipper';
import HeroBoxSwipper from './HeroBoxSwipper';
import { TextInput } from 'react-native-paper';



export default function ClipPathComponent() {
    const { width, height } = Dimensions.get('window');
    


    
    const h = height * 0.3
    
    // Calculate coordinates based on the dimensions of the SVG element
    const points = [
      [0, 0],
      [width, 0],
      [width, h*0.3 ],
      [0, 0] 
    ].map(point => point.join(' ')).join(',');

  return (
    <View style={{height:h, overflow:"visible" }}>
      <View style={{height:'100%'}}>
      <HeroSwipper/>
      {/* <HeroBoxSwipper/> */}
      </View>
    <View style={{ position:"absolute", top:168}}
    className="rotate-[180deg] bg-tranparent"
    >
      <Svg width={width} height={h*0.3}>
        <Defs>
          <ClipPath id="clip">
            <Polygon points={points} />
          </ClipPath>
        </Defs>
        {/* <Rect x="0" y="0" width={width} height={h } fill="white" /> */}
        <Rect x="0" y="0" width={width} height={h} fill="white" clipPath="url(#clip)" />
      </Svg>
    </View >
    <HeroBoxSwipper/>
       {/* <TextInput className="h-[18%] absolute top-[10] w-[90%] left-[5%] rounded-md z-[90] bg-white" 
        style={{shadowColor:"red",
      shadowOpacity:0,
      shadowOffset:{
      width:0,
      height:
      },
      elevation:70}}/> */}
   

  
      {/* <View className="w-[5rem] bg-green-800">
  
    </View> */}
    
  </View>
  );
}

const styles = StyleSheet.create({
  inputShadow:{
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 20 },
        shadowRadius: 10,
        shadowOpacity: 0.9,
      },
      android: {
        marginTop:10,
        elevation: 80, // Use elevation for shadows on Android
      },
    }),
  }
})
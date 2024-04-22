import React from 'react';
import { View, Text,Dimensions } from 'react-native';
import Svg, {
    Polygon,
    Rect,
    Defs,
    ClipPath
  } from 'react-native-svg';
import HeroSwipper from './HeroSwipper';
import HeroBoxSwipper from './HeroBoxSwipper';



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
    <View style={{height:h }}>
      <View style={{flex:2}}>
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
    </View>
    <View className=" flex-[1] w-[5rem] bg-green-800">
        <HeroBoxSwipper/>

    </View>
  </View>
  );
}

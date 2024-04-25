import { View,Text, Dimensions, Image } from "react-native";
import { productReturnType } from "../../../types/type";

import Carousel from 'react-native-snap-carousel';
import { useState } from "react";
// import SkeletonContent from 'react-native-skeleton-content';

interface props {
  items: productReturnType[];
}

export default function Product({ items }: props) {
  const width = Dimensions.get('window').width;


  const [state, setState] =useState( {
    activeIndex:0,
    carouselItems:items
  })


  const renderItem = ({item, index}:{item:productReturnType, index:number}) => {

    return (
      <View key={index} style={{
        backgroundColor:'white',
        borderRadius: 5,
        height: 140,
       width:100,
        overflow:"hidden"
       }}
        className="my-[1]"
        >

      
        

     <Image  style={{ width:100, height:100}} source={{uri:item.images[0]}}
      className="border-t-md "
     />
      <Text className="top-[4] left-[5] py-1 px-2 rounded-full text-[8px] bg-yellow-300 text-slate-800 absolute">
                  +{item.rating}
      </Text>
      <Text
      numberOfLines={2}
      className="text-slate-800" 
      style={{fontSize:8, paddingHorizontal:5}}>
        {item.name}
      </Text>
      <Text className="mt-[1] ml-[2]">
                  <Text className=" rouned-md bg-yellow-300 text-slate-900 "
                  style={{
                    fontSize:11,
                    padding:10,
                
                  }}
                  >
                    GH {item.price}
                  </Text>
      </Text>
    </View>
    );

}


  return (
    <View 

    className=" flex-row  flex-1   "
    style={{ overflow:"visible"}}
    >
    <Carousel
      layout={"default"}
      // ref={ref => this.carousel = ref}
      data={state.carouselItems}
      sliderWidth={width}
      itemWidth={320}
     loop={true}
    autoplay={true}
    autoplayInterval={5000}
    autoplayDelay={0}
    lockScrollWhileSnapping={true}
    enableSnap={true}
    enableMomentum={false}
    
      renderItem={renderItem}
      onSnapToItem = { index => setState({...state, activeIndex:index}) } 
      
      />
    
      
</View>
  );
}

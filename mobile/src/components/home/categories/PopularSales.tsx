import React from 'react';
import { View, Text,FlatList,Platform,TouchableHighlight,Image } from 'react-native';
import { useGetProductsQuery } from '../../../app/features/api/productSliceApi';
import { productReturnType } from "../../../types/type";


///Experimental reshuffle element in an array 
function shuffleArray(array) {
  
    for (let i = array.length - 1; i > 0; i--) {
 
      const j = Math.floor(Math.random() * (i + 1));
    
      [array[i], array[j]] = [array[j], array[i]];
    }
  
    return array; // Return the shuffled array
  }
export default function PopularSales() {
    const {
        data:posts ,
        isFetching,
        isLoading,
        isSuccess
      } = useGetProductsQuery( )

      if(isSuccess){
        let bags =posts?.filter((value:productReturnType, index)=>{
            let count =0
            if (value.category == "bag" && count < 5 ){
                count++
            return value
            }
          })
        let shoe =posts?.filter((value:productReturnType, index)=>{
          
            let count =0
            if (value.category == "shoe" && count < 5 ){
                count++
            return value
            }
          })
          let dress =posts?.filter((value:productReturnType, index, items)=>{
           let count =0
            if (value.category == "dress" && count < 5 ){
                count++
            return value
            }
          })
       
          const items = shuffleArray([...dress, ...bags, ...shoe])

          return (
            <View className="flex-1">
                <Text className="text-slate-800 ml-[20] mb-4 text-xl font-semibold">Popular Sales</Text>
              <FlatList
                 ItemSeparatorComponent={
                            ()=>{
                                return(
                                    <View className="w-[10] h-1 bg-white"></View>
                                )
                            }
          }
        
        horizontal={true}
          data={[...items]}
          renderItem={({item, index, separators}) => (
            <TouchableHighlight
              key={item._id}
              onPress={() => console.log(item)}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
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
              <Text 
              style={{
                fontSize:11,
                borderRadius:2
              }}
              className="mt-[1] ml-[5]  w-[50] text-center bg-yellow-300 text-slate-900 ">
                          GH {item.price}
              </Text>
            </View>
            </TouchableHighlight>
          )}
        />
             </View>
          );
      }




}

import { View, Text,  ScrollView,Dimensions, TextInput, KeyboardAvoidingView,Platform } from 'react-native'
import React, { useState } from 'react'

import ClipPathComponent from '../components/Clippath';
import HeroSwipper from '../components/HeroSwipper';
import EvilIcons from "react-native-vector-icons/EvilIcons"
import HeroVideo, { HeroVideos } from '../components/HeroVideo';

import vidoe1 from './../../assets/video/clip.mp4'
import video2 from "./../../assets/video/v2.webm"
import video3 from "./../../assets/video/v3.webm"


const HomeScreen = () => {
      const [searchValue, setSearchValue] = useState("");
  return (
    <KeyboardAvoidingView   
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

    // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    style={{
        flex:1,
        backgroundColor:"#fff",
        overflow: 'visible',
      }}
    >

    <ScrollView style={{flex:1}}>
      
       
        <ClipPathComponent/>
        <View 
        className="w-[90%] h-[50] left-[5%]   flex justify-center opacity-[1] absolute top-[10] "
        style={{shadowColor:"black",
        shadowOpacity:1,
        shadowOffset:{
        width:160,
        height:160
        },
        elevation:19,
        }}
        >
       <View className="h-[38] w-[100%] rounded-md border-2 border-slate-300 flex flex-row items-center justify-center bg-slate-100 shadow-2xl shadow-slate-900">
        <Text className=" p-0 text-center ">
       <EvilIcons name="search" size={25} color="black" />;

        </Text>
       <TextInput 
          className="h-[100%] w-[90%] left-[10%] p-0 pl-1 bg-slate-100 text-slate-900 rounded-r-md shadow-2xl shadow-slate-900"
          inputMode='search'
          cursorColor="#18181b"
          defaultValue={searchValue}
          onChangeText={(text)=>setSearchValue(text)}
          />
       </View>
         
          
        </View>

        <HeroVideo/>
     
        

    </ScrollView>
    </KeyboardAvoidingView>


  )
}

export default HomeScreen
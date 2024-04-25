import React,{useRef} from 'react';
import { View, Text,StyleSheet, Image } from 'react-native';
import EvilIcons from "react-native-vector-icons/EvilIcons"

import Video, {VideoRef} from 'react-native-video';
import video1 from "../../../assets/video/clip.mp4"
interface props {
    video:string
}

export default function HeroVideo() {
    const videoRef = useRef<VideoRef>(null);
    const videoRef1 = useRef<VideoRef>(null);
    const videoRef2 = useRef<VideoRef>(null);


  return (
    <View 
    style={{flex:1,position:"absolute", top:70,left:15,zIndex:110, width:60, height:160}}
    className="">

<View style={{flex:1}}
    className="overflow-hidden group rounded-md border-4 border-slate-200  scale-90 flex justify-center items-center"
    >


       <Video 
       automaticallyWaitsToMinimizeStalling={false}
       disableFocus={true}
    source={require("../../../assets/video/v2.webm")}
    muted={true}
    pictureInPicture={true}
    paused={false}
    playWhenInactive={true}
    preventsDisplaySleepDuringVideoPlayback={false}
    repeat={true}
    resizeMode="cover"
    selectedAudioTrack={{type:"disabled"}}  
    ref={videoRef}
             
    style={styles.backgroundVideo}
    className="opacity-100 z-10 "
   />
     </View>

     <View style={{flex:1}}
    className="overflow-hidden group rounded-md border-4 border-slate-200  scale-90 flex justify-center items-center"
    >


       <Video 
        automaticallyWaitsToMinimizeStalling={false}
        disableFocus={true}
    source={require("../../../assets/video/v3.webm")}
    muted={true}
    pictureInPicture={true}
    paused={false}
    controls={true}
    playWhenInactive={true}
    preventsDisplaySleepDuringVideoPlayback={false}
    repeat={true}
    resizeMode="cover"
    selectedAudioTrack={{type:"disabled"}}  
    ref={videoRef1}
             
    style={styles.backgroundVideo}
    className="opacity-100 z-10 "
   />
     </View>

     <View style={{flex:1}}
    className="overflow-hidden group rounded-md border-4 border-slate-200  scale-90 flex justify-center items-center"
    >


       <Video
        automaticallyWaitsToMinimizeStalling={false}
        disableFocus={true} 
    source={require("../../../assets/video/clip.mp4")}
    muted={true}
    paused={false}
    pictureInPicture={true}
    controls={true}
    playWhenInactive={true}
    preventsDisplaySleepDuringVideoPlayback={false}
    repeat={true}
    resizeMode="cover"
    selectedAudioTrack={{type:"disabled"}}  
    ref={videoRef2}
             
    style={styles.backgroundVideo}
    className="opacity-100 z-10 "
   />
     </View>
    </View>

  );
}





var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
     bottom:0,
      right: 0,
    },
  });
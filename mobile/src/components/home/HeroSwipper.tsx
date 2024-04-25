import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import shoeBg from './../../../assets/img15.png';

const HeroSwipper = () => {
  const hero = [
    {
      background:"NotURl",
    },
    {
      background:
        'https://www.ishtari.com.gh/image/cache/data/system_product/10000/5600/5475/1-800x1091.jpg?3',
      boxImage:
        'https://www.ishtari.com.gh/image/cache/data/system_product/10000/5600/5475/5-800x1091.jpg?3',
    },
    {
      background:
        'https://www.ishtari.com.gh/image/cache/data/system_product/10000/9200/9670/631900123B_1000x1000_6-800x1091.jpg?3',
      boxImage:
        'https://www.ishtari.com.gh/image/cache/data/system_product/10000/9200/9670/631900123B_1000x1000_7-800x1091.jpg?3',
    },
    {
      background:
        'https://www.ishtari.com.gh/image/cache/data/system_product/10000/5600/5433/2-800x1091.jpg?3',
      boxImage:
        'https://www.ishtari.com.gh/image/cache/data/system_product/10000/5600/5433/4-800x1091.jpg?3',
    },
    {
      background:
        'https://www.ishtari.com.gh/image/cache/data/system_product/10000/3800/3686/a333-800x1091.jpg?3',
      boxImage:
        'https://www.ishtari.com.gh/image/cache/data/system_product/10000/3800/3686/a4-800x1091.jpg?3',
    },
  ];
  return (
    <Swiper style={[styles.wrapper]}
    loop={true}
    autoplay={true}
    showsButtons={false}
    showsPagination={false}
    autoplayTimeout={5}
    >

      
      {hero.map((value, index) => {
        if (value.background == "NotURl"){
          return(
<       ImageBackground source={shoeBg} resizeMode="cover" style={styles.image}>
        
      </ImageBackground>
          )
        }
        else{
          return (
            <ImageBackground
              source={{
                uri: value.background,
              }}
              resizeMode="cover"
              style={styles.image}>
             
            </ImageBackground>
          );
        }
        
      })}

     
    </Swiper>
  );
};

export default HeroSwipper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

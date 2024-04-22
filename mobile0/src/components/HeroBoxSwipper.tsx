import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { Canvas } from '@react-three/fiber/native'

export default function HeroBoxSwipper() {
  return (
    <Canvas>
    <ambientLight intensity={0.1} />
    <directionalLight color="red" position={[0, 0, 5]} />
    <mesh>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  </Canvas>
  );
}

const styles = StyleSheet.create({
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
  
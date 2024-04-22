import React ,{ Suspense, useEffect, useRef, useState }from 'react';
import { Canvas,useFrame, useLoader } from '@react-three/fiber/native'

import {BoxGeometry, MeshBasicMaterial, Mesh,TextureLoader,OrthographicCamera} from 'three'
import img1 from "./../../assets/img1.png"
import img2 from "./../../assets/img2.jpg"
import img3 from "./../../assets/img3.png"
import img4 from "./../../assets/img4.jpg"
import img5 from "./../../assets/img5.jpg"
import img6 from "./../../assets/img6.jpg"
import img7 from "./../../assets/img7.jpg"
import img8 from "./../../assets/img8.jpg"
import img9 from "./../../assets/img9.jpg"
import img10 from "./../../assets/img10.jpg"
import img11 from "./../../assets/img11.jpg"
import img12 from "./../../assets/img12.jpg"
import img13 from "./../../assets/img13.jpg"
import img14 from "./../../assets/img14.jpg"
import img15 from "./../../assets/img15.png"
import img16 from "./../../assets/img16.png"
import img17 from "./../../assets/img17.jpg"
import img18 from "./../../assets/img18.jpg"
import img19 from "./../../assets/img19.png"
import img20 from "./../../assets/img20.jpg"

function Box (){

  const [materialImage , setMaterialImage] = useState(img1)
  const meshRef = useRef<Mesh>(null!)
  const boxRef = useRef(null!);

  const imgs = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10 ,
    img11, img12, img13, img14, img16, img17, img18, img19, img20
  ]
  useEffect(()=>{

    const interval = setInterval(()=>{
    const randomImage = Math.floor(Math.random() * imgs.length);

      // const s = (materialImage == img1) ? img3 : img1
      setMaterialImage(imgs[randomImage])
    },5000)
    return ()=>{
      clearInterval(interval)
    }
  })

  useFrame((state) => {
    meshRef.current.rotation.y -= 0.005;
    state.setFrameloop("demand") 
  })
  

  return(

    <> 
        <mesh  ref={meshRef}  castShadow ={true}
        position={[0,0,0]} 
        scale={2} >

      <boxGeometry  ref={boxRef} />
      <meshStandardMaterial 
       map={useLoader(TextureLoader, materialImage)} 
       />
   
    </mesh>
    </>

  )
}



export default function HeroBoxSwipper() {

  return (
    <Canvas  shadows  
    camera={{ position: [0, 5,15 ], fov: 10 }}
    
    style={{backgroundColor:'rgba(0, 0, 0, 0)',position:"absolute",top:130, left:'35%',zIndex:100,  width:100,height:100}}  >
      
      <ambientLight intensity={4} />
    <Suspense fallback={null}>
   < Box />
  </Suspense>
 
  </Canvas>
  );
}

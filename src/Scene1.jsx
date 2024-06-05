import { useRef } from "react"
import { DirectionalLightHelper } from "three"
import HexConcentric from "./HexConcentric"
import Water from "./Water"
import { useHelper } from "@react-three/drei"
import { useControls } from "leva"

export default function Scene1({sky}) {

  const settings = useControls({
    maxHexHeight:   { value: 6.9, min: 0, max: 10, step: 0.5 },
    noiseSeed:      { value: 0.5, min: 0.01, max: 0.99, step: 0.01 },
    noiseFrequency: { value: 0.05, min: 0, max: 0.2, step: 0.01 },
    waterLevel:     { value: 1.9, min: 0, max: 10, step: 0.1 },
  })
  
  return (
    <>
      <fog attach="fog" 
        color={sky} 
        near={6} 
        far={100} 
        />
      <ambientLight intensity={0.58}/>
      <directionalLight
        position={[50, 50, -50]} 
        intensity={3.5} 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-top={40}
        shadow-camera-right={40}
        shadow-camera-bottom={-40}
        shadow-camera-left={-40}
        />
      <Water
        height={settings.waterLevel}
        radius={32*2}
        color={"#39b5ff"} 
        />
      <HexConcentric
        radius={32}
        hexRadius={1}
        maxHeight={settings.maxHexHeight} 
        noise={settings.noiseSeed}
        frequency={settings.noiseFrequency}
        waterLevel={settings.waterLevel}
        />
    </>
  )
}
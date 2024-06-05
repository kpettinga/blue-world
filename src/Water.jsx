import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, RepeatWrapping, TextureLoader, Vector2 } from "three";

export default function Water({height, radius, color}) {

  const meshRef = useRef(null)

  const defaults = {
    side: DoubleSide,
  }

  const waterNormals = useLoader(TextureLoader, "/water-normal.jpg")
  waterNormals.wrapS = waterNormals.wrapT = RepeatWrapping
  const waterRoughness = useLoader(TextureLoader, "/water-roughness.jpg")
  
  const transmissive = {
    ...defaults,
    color,
    thickness: 0.3,
    roughness: 0.4,
    transmission: 0.6,
    ior: 1.5,
    chromaticAberration: 0.02,
    distortion: 16,
    distortionScale: 0.34,
    temporalDistortion: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.5,
    clearcoatRoughnessMap: waterRoughness,
    clearcoatNormalScale: new Vector2( 0.1, 0.1 ),
    clearcoatNormalMap: waterNormals
  }

  useFrame(({clock}) => {
    if (meshRef.current) {
      meshRef.current.material.clearcoatNormalMap.offset.x = clock.getElapsedTime() * 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={[0,height,0]} receiveShadow rotation-x={Math.PI/-2} >
      <circleGeometry args={[radius, 64, Math.PI/2]} />
      <MeshTransmissionMaterial {...transmissive} />
    </mesh>
  )
}
import { useMemo } from "react";
import { createNoise2D } from "simplex-noise";
import { BoxGeometry, BufferGeometry, CylinderGeometry } from "three";
import { mergeBufferGeometries } from "three-stdlib";

function getApothem(radius, sides = 6) {
  return radius * Math.cos(Math.PI/sides)
}

function HexTerrain({radius, hexRadius, frequency, maxHeight, noise, waterLevel}) {
  
  const noise2D = createNoise2D(() => noise)
  const hexApothem = getApothem(hexRadius)
  const groupXOffset = 0 //-hexApothem * (radius*2 - 1)
  const groupZOffset = 0 //(radius*2 / 2 * hexRadius * 1.5) - hexRadius/2

  let seaFloorGeo = new BoxGeometry(0,0,0)
  let sandGeo = new BoxGeometry(0,0,0)
  let grassGeo = new BoxGeometry(0,0,0)
  let forestGeo = new BoxGeometry(0,0,0)
  let stoneGeo = new BoxGeometry(0,0,0)
  let snowGeo = new BoxGeometry(0,0,0)
  
  for (let row = 0; row < radius * 2; row++) {
    for (let col = 0; col < radius * 2; col++) {
      const xOffset = (col % 2) * hexApothem
      const noiseVal = noise2D(row * frequency, col * frequency) / 2 + 0.5
      const hexHeight = noiseVal * maxHeight
      const x = row * hexApothem * 2 + xOffset - (hexApothem * radius * 2 - hexApothem)
      const z = col * hexRadius * -1.5 + (hexRadius * radius * 1.5)
      const distanceFromCenter = Math.abs(Math.sqrt(Math.pow(x,2) + Math.pow(z,2)))

      if ( distanceFromCenter < radius ) {
        const hexGeo = new CylinderGeometry(hexRadius, hexRadius, hexHeight, 6);
        hexGeo.translate(x, hexHeight/2, z);
        if ( hexHeight > waterLevel + 5 ) {
          snowGeo = mergeBufferGeometries([hexGeo, snowGeo])
        } else if ( hexHeight > waterLevel + 4 ) {
          stoneGeo = mergeBufferGeometries([hexGeo, stoneGeo])
        } else if ( hexHeight > waterLevel + 3 ) {
          forestGeo = mergeBufferGeometries([hexGeo, forestGeo])
        } else if ( hexHeight > waterLevel + .25 ) {
          grassGeo = mergeBufferGeometries([hexGeo, grassGeo])
        } else if ( hexHeight > waterLevel - 0.5 ) {
          sandGeo = mergeBufferGeometries([hexGeo, sandGeo])
        } else {
          seaFloorGeo = mergeBufferGeometries([hexGeo, seaFloorGeo])
        }
      }

    }
  }
  return (
    <group position={[ groupXOffset, 0, groupZOffset ]}>
      <mesh geometry={snowGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#ffffff" flatShading/>
      </mesh>
      <mesh geometry={stoneGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#dddddd" flatShading/>
      </mesh>
      <mesh geometry={forestGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#8dad8a" flatShading/>
      </mesh>
      <mesh geometry={grassGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#8bd386" flatShading/>
      </mesh>
      <mesh geometry={sandGeo} castShadow receiveShadow>
        <meshStandardMaterial color="wheat" flatShading/>
      </mesh>
      <mesh geometry={seaFloorGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#8b6359" flatShading/>
      </mesh>
    </group>
  );
}

export default HexTerrain;

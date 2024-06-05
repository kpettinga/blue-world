import { useMemo } from "react";
import { createNoise2D } from "simplex-noise";
import { CylinderGeometry } from "three";

function getApothem(radius, sides = 6) {
  return radius * Math.cos(Math.PI/sides)
}

function getStyle(height) {
  let color, outline
  if ( height > 4.5 ) {
    color = "#ffffff"
    outline = "white"
  } else if ( height > 3.75 ) {
    color = "#dddddd"
    outline = "grey"
  } else if ( height > 3.25 ) {
    color = "#b8ccb6"
    outline = "#738071"
  } else if ( height > 1.45 ) {
    color = "#8bd386"
    outline = "#60925d"
  } else if ( height > 1.25 ) {
    color = "wheat"
    outline = "#d2b48c"
  } else {
    color = "#dfb799"
    outline = "#d2b48c"
  }
  return { color, outline }
}

function HexNode({radius, height, position}) {
  
  const geometry = useMemo(() => {
    const geom = new CylinderGeometry(radius, radius, height, 6);
    geom.translate(0, height/2, 0); // Move origin to the bottom
    return geom;
  }, [radius, height]);

  const { color, outline } = getStyle(height)
  
  return (
    <mesh geometry={geometry} position={position} castShadow receiveShadow >
      <meshStandardMaterial color={color} flatShading />
    </mesh>
  )
}

function HexGrid({rows, cols, hexRadius, frequency, maxHeight}) {
  
  const noise2D = createNoise2D() // () => 0.5
  const hexApothem = getApothem(hexRadius)
  const groupXOffset = -hexApothem * (rows - 1)
  const groupZOffset = (cols / 2 * hexRadius * 1.5) - hexRadius/2

  return (
    <group position={[ groupXOffset, 0, groupZOffset ]}>
      { new Array(rows).fill().map((_,w) => {
        return (
          new Array(cols).fill().map((_,h) => { 
            const xOffset = (h % 2) * hexApothem
            const noiseVal = noise2D(w * frequency, h * frequency) / 2 + 0.5
            const hexHeight = noiseVal * maxHeight
            return (
              <HexNode 
                radius={hexRadius}
                height={hexHeight} 
                position={[w*hexApothem*2 + xOffset, 0, h*hexRadius*-1.5]} 
                key={w+h+''} 
                />
            )
          })
        )
      }) }
    </group>
  );
}

export default HexGrid;

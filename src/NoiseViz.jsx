import { createNoise2D } from "simplex-noise";
import * as THREE from "three";

const ColoredPlane = () => {
  const segments = 16; // Number of segments in each direction

  // Calculate segment size
  const segmentSize = 1;

  // Create an array to hold segments
  const segmentsArray = [];

  // Create segment geometry
  const geometry = new THREE.PlaneGeometry(segmentSize, segmentSize);
  let material

  // create noise
  const noise2D = createNoise2D()
  const frequency = 0.1
  let noise
  
  // Iterate over segments
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < segments; j++) {
      // Calculate segment position
      const x = (i - segments / 2) * segmentSize;
      const y = (j - segments / 2) * segmentSize;

      // get noise value
      noise = noise2D(i * frequency, j * frequency) / 2 + 0.5

      // create material
      material = new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(0, 0, noise) })

      // Apply material to segment
      const mesh = (
        <mesh key={`${i}-${j}`} 
          geometry={geometry} 
          material={material} 
          position={[x, y, 0]} 
          />
      )

      segmentsArray.push(mesh);
    }
  }

  return <group>{segmentsArray}</group>;
};

export default function NoiseViz() {

  return (
    <>
      <ambientLight intensity={2} />
      <spotLight
        position={[20, 20, 20]} 
        intensity={2500} 
        penumbra={1}
        />
      <ColoredPlane />
    </>
  );
}
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

const Cube = () => {

    const meshRef = useRef(null)
    
    // useFrame(() => {
	// 	if (!meshRef.current) {
	// 		return 
	// 	}
    //     meshRef.current.rotation.y += 0.025
	// })

    return (
        <mesh ref={meshRef} position={[0,0,0]}>
            <boxGeometry args={[1,1,1]} />
            <meshStandardMaterial metalness={0.3} roughness={0.4} />
        </mesh>
    )

}

export default Cube
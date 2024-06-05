import { OrbitControls } from "@react-three/drei";
import "./App.css";
import { Canvas, useThree } from "@react-three/fiber";
import Scene1 from "./Scene1";
import { useEffect } from "react";

function ConsoleHelpers() {
  const { camera } = useThree();
  
  useEffect(() => {
    
    window.getCameraPosition = () => {
      return camera.position.clone()
    }

    return () => {
      delete window.getCameraPosition
    };
  }, [camera]);

  return null
}

function App() {

  const skyColor = "#92DFFF";

	return (
    <div className="App">
      <Canvas shadows style={{ background: `linear-gradient(${skyColor}, white 50%)` }} camera={{ position: [1, 30, 52], fov: 75 }}>
				<OrbitControls  minDistance={1} maxDistance={100} />
        <ConsoleHelpers />
				<Scene1 sky={skyColor} />
			</Canvas>
    </div>
  );
}

export default App;

import React, { useRef, Suspense, useEffect } from "react";
import {
  Canvas,
  useLoader,
  extend,
  useFrame,
  useThree,
  useWebXRAvailable
} from "@react-three/fiber";
import { TextureLoader, SphereGeometry, MeshBasicMaterial, Mesh } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";

extend({ OrbitControls });

function Controls(props) {
  const { camera, gl } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  return (
    <orbitControls
      ref={ref}
      target={[0, 0, 0]}
      {...props}
      args={[camera, gl.domElement]}
    />
  );
}

function PanoramaViewer({ imageSrc }) {
  const panoramaTexture = useLoader(TextureLoader, imageSrc);
  return (
    <mesh>
      <sphereGeometry args={[1, 60, 40]} />
      <meshBasicMaterial map={panoramaTexture} side={2} />
    </mesh>
  );
}

function App() {
  const panoramaImageSrc =
    "https://gaia.lithodomos.com/c12c1ee0478c63925e6502279c76921c.jpg";

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "black"
      }}
    >
      <VRButton />
      <Canvas camera={{ position: [0, 0, 0.1] }}>
        <XR>
          <Controls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.2}
            autoRotate={false}
            rotateSpeed={-0.5}
          />
          <Suspense fallback={null}>
            <PanoramaViewer imageSrc={panoramaImageSrc} />
          </Suspense>
        </XR>
      </Canvas>
    </div>
  );
}

export default App;

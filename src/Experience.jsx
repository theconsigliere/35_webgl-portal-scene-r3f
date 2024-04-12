import {
  Sparkles,
  Center,
  useGLTF,
  OrbitControls,
  useTexture,
  shaderMaterial,
} from "@react-three/drei"
import portalVertexShader from "./shaders/portal/vertex.glsl"
import portalFragmentShader from "./shaders/portal/fragment.glsl"
import { extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

// drei helper
const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#fff"),
    uColorEnd: new THREE.Color("#000"),
  },
  portalVertexShader,
  portalFragmentShader
)
// make tag available in JSX
extend({ PortalMaterial })

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb")
  const bakedTexture = useTexture("./model/baked.jpg")
  bakedTexture.flipY = false

  const portalMaterialRef = useRef()

  useFrame((state, delta) => {
    portalMaterialRef.current.uTime += delta
  })

  return (
    <>
      <color args={["#201919"]} attach="background" />

      <OrbitControls makeDefault />

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <portalMaterial ref={portalMaterialRef} />
        </mesh>

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position={[0, 1, 0]}
          speed={0.2}
          count={40}
        />
      </Center>
    </>
  )
}

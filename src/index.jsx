import "./style.css"
import ReactDOM from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import Experience from "./Experience.jsx"

const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
  <Canvas
    // setting flat on the canvas element to true will set the toneMapping to THREE.NoToneMapping
    flat
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [1, 2, 6],
    }}
  >
    <Experience />
  </Canvas>
)

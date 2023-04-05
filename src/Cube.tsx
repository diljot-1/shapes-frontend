import "./App.css";
import React from "react";
import {ShapeInterface} from "./interfaces/shape.interface"
import { OrbitControls } from "@react-three/drei";

function Cube(props: ShapeInterface) {
  const dim: number = props.value
  return (
    <>
      <OrbitControls enableZoom={false} autoRotate={props.autoRotate}/>
      <ambientLight intensity={0.8} color="#AA3A6A"/>
      <directionalLight intensity={1} />
      <mesh rotation={[90, 0, 20]}>
        <boxBufferGeometry attach="geometry"  args={[dim, dim, dim, 3, 3, 3]} />
        <meshLambertMaterial attach="material"  color="0xcccccc" wireframe={true}/>
      </mesh>
    </>
  );
}

export default Cube;

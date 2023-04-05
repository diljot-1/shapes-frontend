import "./App.css";
import React from "react";
import { Sphere } from "@react-three/drei";
import { Edges } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { ShapeInterface } from "./interfaces/shape.interface";


function Sphere3D(props: ShapeInterface) {
  return (
    <>
    <OrbitControls enableZoom={false} autoRotate={props.autoRotate}/>
    <ambientLight intensity={0.5} color="blue"/>
    <directionalLight intensity={1} />
      <mesh rotation={[90, 0, 20]}>
        <sphereGeometry attach="geometry" args={[2, 32, 32]} />
        <meshLambertMaterial attach="material"  color="red" flatShading={true}/>
        <Edges
    scale={1.1} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
    color="white"
  />
      </mesh>
    </>
  );
}

export default Sphere3D
    
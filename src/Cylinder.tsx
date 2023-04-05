import "./App.css";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Edges } from "@react-three/drei";
import { ShapeInterface } from "./interfaces/shape.interface";

function Cylinder(props: ShapeInterface) {
  return (
    <>
      <OrbitControls enableZoom={false} autoRotate={props.autoRotate}/>
      <ambientLight intensity={0.5} color="blue"/>
      <directionalLight intensity={1} />
      <mesh rotation={[90, 0, 20]}>
        <cylinderGeometry attach="geometry" args={[1, 1, props.value, 10, 10]} />
        <meshLambertMaterial attach="material"  color="0xcccccc" flatShading={true}/>
        <Edges
    scale={1.1} 
    color="white"
  />
      </mesh>
    </>
  );
}

export default Cylinder;
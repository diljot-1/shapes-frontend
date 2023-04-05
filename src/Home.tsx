import "./App.css";
import React, {useEffect, useState} from "react";
import Cube from "./Cube";
import Cylinder from "./Cylinder";
import axios from "axios";
import goodAiLogo from "./images/good-ai-logo.png";
import { Canvas } from "@react-three/fiber";
import Sphere3D from "./Sphere";

function Home() {
  const [value, setValue] = useState<number>(3);
  const [autoRotate, setAutoRotate] = useState<boolean>(false)

  function generateRandomValue(): void {
    const ws = new WebSocket('ws://localhost:6789');
    ws.onopen = () =>{
      console.log('o[pen')
    }
    ws.onmessage = (event) => {
      console.log(event.data[0])
      setValue(event.data[0])
    }
  }

  function handleAutoRotate(): void {
    setAutoRotate(current => !current)
  }


  return (
    <div className="dashboard site-content">
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <div>
          <img className="good-ai-logo" src={goodAiLogo} />
        </div>
        <button className="generate-button" title="Generates float values between 0 to 5" onClick={generateRandomValue}>
          Generate values via web-socket
        </button>
        <button className="generate-button" onClick={handleAutoRotate}>
          Auto Rotate All
        </button>
      </div>
      <Canvas className="container" style={{ height: "300px" }}>
        <Cube value={value} autoRotate={autoRotate}/>
      </Canvas>
      <Canvas className="container" style={{ height: "300px" }}>
        <Cylinder autoRotate={autoRotate} value={0}/>
      </Canvas>
      <Canvas className="container" style={{ height: "300px" }}>
        <Sphere3D autoRotate={autoRotate} value={0}/>
      </Canvas>
    </div>
  );
}

export default Home;

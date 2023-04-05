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
  const [multiValuesGenerated, setMultiValuesGenerated] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(false)

  function generateRandomValue(): void {
    setMultiValuesGenerated(true)
    const ws = new WebSocket('ws://localhost:6789');
    ws.onopen = () =>{
    }
    ws.onmessage = (event) => {
      setValue(event.data[0])
    }
  }

  function handleAutoRotate(): void {
    setAutoRotate(current => !current)
  }

  function generateSingleRandom(): void {
    let temp = (Math.random() * (4.5-0.1) + 0.1).toFixed(2)
    setValue(parseFloat(temp))
    setMultiValuesGenerated(false)
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
        <div className="single-generator">
        <button className="generate-button" title="Generates float values between 0 to 5" onClick={generateSingleRandom}>
          Generate single random value
        </button>
        {!multiValuesGenerated && <div className="single-generator-text">Current value is {value}</div>}
        </div>
        <button className="generate-button" onClick={handleAutoRotate}>
          Auto Rotate All
        </button>
      </div>
      <Canvas className="container" style={{ height: "320px" }}>
        <Cube value={value} autoRotate={autoRotate}/>
      </Canvas>
      <Canvas className="container" style={{ height: "300px" }}>
        <Cylinder autoRotate={autoRotate} value={value}/>
      </Canvas>
      <Canvas className="container" style={{ height: "320px" }}>
        <Sphere3D autoRotate={autoRotate} value={value}/>
      </Canvas>
    </div>
  );
}

export default Home;

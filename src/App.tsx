import React, { useEffect, useRef } from "react";
import { container } from "tsyringe";
import { AudioContext } from "./audio";
import SamplerService from "./audio/SamplerService";
import { Drum } from "./instrument";

function App() {
  let samplerService: SamplerService = useRef(container.resolve(SamplerService))
    .current;

  useEffect(() => {
    const setUpAudio = async () => {
      const audioContext = container.resolve(AudioContext);
      await audioContext.start();
    };
    setUpAudio();
  }, []);

  const handleClick = async () => {
    const sampler = await samplerService.getSampler(Drum.BASS);
    console.log(sampler?.sampler);
    sampler?.playNote("G0");
  };

  return (
    <div className="App">
      <p>Hello world</p>
      <button onClick={async () => await handleClick()}>Play something!</button>
    </div>
  );
}

export default App;
